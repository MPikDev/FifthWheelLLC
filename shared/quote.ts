/**
 * Quote request schema and validation, shared by the React form (client-side
 * validation) and the Express server (server-side validation), so both always
 * apply exactly the same rules.
 *
 * This file must stay dependency-free and use only plain TypeScript so it can
 * be compiled for both the browser and Node.
 */

export const CONTACT_METHODS = ['email', 'text'] as const;
export type ContactMethod = (typeof CONTACT_METHODS)[number];

export const VEHICLE_TYPES = ['car-suv-truck', 'motorcycle'] as const;
export type VehicleType = (typeof VEHICLE_TYPES)[number];

export const RUNS_OPTIONS = ['yes', 'no'] as const;
export type RunsOption = (typeof RUNS_OPTIONS)[number];

export const SERVICE_TYPES = ['open', 'door-to-door', 'terminal-to-terminal', 'dealership-auction'] as const;
export type ServiceType = (typeof SERVICE_TYPES)[number];

/** Human-readable labels, used for form options and the dispatch email. */
export const LABELS = {
  contactMethod: { email: 'Email', text: 'Text message' },
  vehicleType: { 'car-suv-truck': 'Car, SUV or truck', motorcycle: 'Motorcycle' },
  runs: { yes: 'Yes, it runs', no: 'No, it’s inoperable' },
  serviceType: {
    open: 'Open transport',
    'door-to-door': 'Door-to-door delivery',
    'terminal-to-terminal': 'Terminal-to-terminal delivery',
    'dealership-auction': 'Dealership / auction transport',
  },
} as const;

export interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  contactMethod: ContactMethod | '';
  pickup: string;
  delivery: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleType: VehicleType | '';
  runs: RunsOption | '';
  serviceType: ServiceType | '';
  pickupDate: string;
  notes: string;
  /**
   * Honeypot: hidden from people, so any value here means a bot filled it in.
   * Deliberately not named like a real field (e.g. "company") so browser
   * autofill doesn't trip it for real customers.
   */
  honeypot: string;
}

export type QuoteField = keyof QuoteRequest;
export type QuoteErrors = Partial<Record<QuoteField, string>>;

export const EMPTY_QUOTE: QuoteRequest = {
  name: '',
  email: '',
  phone: '',
  contactMethod: '',
  pickup: '',
  delivery: '',
  vehicleYear: '',
  vehicleMake: '',
  vehicleModel: '',
  vehicleType: '',
  runs: '',
  serviceType: '',
  pickupDate: '',
  notes: '',
  honeypot: '',
};

/** Max lengths keep payloads small and emails readable. */
const MAX = { short: 100, notes: 2000 } as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const includes = <T extends string>(list: readonly T[], value: string): value is T =>
  (list as readonly string[]).includes(value);

/** Today's date (plus an optional offset in days) as YYYY-MM-DD in local time. */
export function todayISO(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** True when the chosen options carry an additional fee. */
export function hasExtraFee(q: Pick<QuoteRequest, 'vehicleType' | 'runs'>): boolean {
  return q.vehicleType === 'motorcycle' || q.runs === 'no';
}

/**
 * Coerce unknown input (e.g. a JSON request body) into a QuoteRequest of
 * trimmed strings. Unknown keys are dropped.
 */
export function normalizeQuote(input: unknown): QuoteRequest {
  const source = (typeof input === 'object' && input !== null ? input : {}) as Record<string, unknown>;
  const out = { ...EMPTY_QUOTE };
  for (const key of Object.keys(EMPTY_QUOTE) as QuoteField[]) {
    const value = source[key];
    (out as Record<QuoteField, string>)[key] = typeof value === 'string' ? value.trim() : '';
  }
  return out;
}

/**
 * Validate a quote request. Returns an object mapping each invalid field to a
 * friendly error message; an empty object means the request is valid.
 *
 * `minDate` is the earliest allowed pickup date (YYYY-MM-DD). The server passes
 * yesterday's date so customers in time zones behind the server aren't rejected.
 */
export function validateQuote(q: QuoteRequest, minDate: string = todayISO()): QuoteErrors {
  const errors: QuoteErrors = {};
  const required = (field: QuoteField, message: string) => {
    if (!q[field].trim()) errors[field] = message;
  };

  required('name', 'Please enter your name.');
  required('email', 'Please enter your email address.');
  required('phone', 'Please enter a phone number.');
  required('pickup', 'Please enter a pickup ZIP code or city.');
  required('delivery', 'Please enter a delivery ZIP code or city.');
  required('vehicleYear', 'Please enter the vehicle year.');
  required('vehicleMake', 'Please enter the vehicle make.');
  required('vehicleModel', 'Please enter the vehicle model.');
  required('pickupDate', 'Please choose a preferred pickup date.');

  if (q.email && !EMAIL_RE.test(q.email)) {
    errors.email = 'Please enter a valid email address, like name@example.com.';
  }

  const phoneDigits = q.phone.replace(/\D/g, '');
  if (q.phone && (phoneDigits.length < 10 || phoneDigits.length > 15)) {
    errors.phone = 'Please enter a valid phone number, including area code.';
  }

  if (!includes(CONTACT_METHODS, q.contactMethod)) {
    errors.contactMethod = 'Please choose how you’d like us to contact you.';
  }
  if (!includes(VEHICLE_TYPES, q.vehicleType)) {
    errors.vehicleType = 'Please choose a vehicle type.';
  }
  if (!includes(RUNS_OPTIONS, q.runs)) {
    errors.runs = 'Please let us know whether the vehicle runs.';
  }
  if (!includes(SERVICE_TYPES, q.serviceType)) {
    errors.serviceType = 'Please choose a service type.';
  }

  if (q.vehicleYear) {
    const year = Number(q.vehicleYear);
    const maxYear = new Date().getFullYear() + 2;
    if (!/^\d{4}$/.test(q.vehicleYear) || year < 1900 || year > maxYear) {
      errors.vehicleYear = `Please enter a 4-digit year between 1900 and ${maxYear}.`;
    }
  }

  if (q.pickupDate) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(q.pickupDate) || Number.isNaN(Date.parse(q.pickupDate))) {
      errors.pickupDate = 'Please choose a valid date.';
    } else if (q.pickupDate < minDate) {
      // ISO date strings compare correctly as plain strings.
      errors.pickupDate = 'Please choose today or a future date.';
    }
  }

  for (const field of Object.keys(EMPTY_QUOTE) as QuoteField[]) {
    const limit = field === 'notes' ? MAX.notes : MAX.short;
    if (q[field].length > limit && !errors[field]) {
      errors[field] = `Please keep this under ${limit} characters.`;
    }
  }

  return errors;
}
