import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import {
  CONTACT_METHODS,
  EMPTY_QUOTE,
  LABELS,
  RUNS_OPTIONS,
  SERVICE_TYPES,
  VEHICLE_TYPES,
  hasExtraFee,
  todayISO,
  validateQuote,
  type QuoteErrors,
  type QuoteField,
  type QuoteRequest,
} from '../../shared/quote';
import { site } from '../config/site';
import Button from './Button';
import Icon from './Icon';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/** Order fields appear on screen, so we can focus the first one with an error. */
const FIELD_ORDER: QuoteField[] = [
  'name',
  'email',
  'phone',
  'contactMethod',
  'pickup',
  'delivery',
  'vehicleYear',
  'vehicleMake',
  'vehicleModel',
  'vehicleType',
  'runs',
  'serviceType',
  'pickupDate',
  'notes',
];

const inputClass = (invalid: boolean) =>
  `mt-1.5 block w-full rounded-lg border bg-white px-3.5 py-2.5 text-navy-950 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
    invalid ? 'border-red-600 focus:ring-red-600' : 'border-slate-300 focus:border-navy-500 focus:ring-navy-500'
  }`;

export default function QuoteForm() {
  const [values, setValues] = useState<QuoteRequest>(EMPTY_QUOTE);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [serverMessage, setServerMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const extraFee = hasExtraFee(values);

  const update = (field: QuoteField, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    // After the first submit attempt, re-check as the visitor fixes things.
    if (submitted) setErrors(validateQuote(next));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    update(e.target.name as QuoteField, e.target.value);

  const focusFirstError = (errs: QuoteErrors) => {
    const first = FIELD_ORDER.find((f) => errs[f]);
    if (!first) return;
    const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
    el?.focus();
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    const errs = validateQuote(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      focusFirstError(errs);
      return;
    }

    setStatus('submitting');
    setServerMessage('');
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: QuoteErrors };

      if (res.ok && data.ok) {
        setStatus('success');
        setValues(EMPTY_QUOTE);
        setSubmitted(false);
        requestAnimationFrame(() => resultRef.current?.focus());
        return;
      }

      // Server-side validation caught something the browser didn't.
      if (res.status === 400 && data.fields) {
        setErrors(data.fields);
        setStatus('idle');
        focusFirstError(data.fields);
        return;
      }

      setServerMessage(data.error ?? '');
      setStatus('error');
      requestAnimationFrame(() => resultRef.current?.focus());
    } catch {
      setStatus('error');
      requestAnimationFrame(() => resultRef.current?.focus());
    }
  };

  if (status === 'success') {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center focus:outline-none"
      >
        <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-emerald-600 text-white">
          <Icon name="check" className="size-8" />
        </span>
        <h3 className="mt-4 text-2xl font-extrabold">Request received</h3>
        <p className="mt-3 text-lg text-slate-700">
          Thanks! A dispatcher will contact you within 24 hours, or by the next business day.
        </p>
        <div className="mt-6">
          <Button variant="secondary" onClick={() => setStatus('idle')}>
            Request another quote
          </Button>
        </div>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;
  const fieldProps = (field: QuoteField) => ({
    id: `quote-${field}`,
    name: field,
    value: values[field],
    onChange,
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `quote-${field}-error` : undefined,
    className: inputClass(Boolean(errors[field])),
  });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative space-y-8" aria-describedby="quote-required-note">
      <p id="quote-required-note" className="text-sm text-slate-500">
        Fields marked <span className="font-bold text-red-700">*</span> are required.
      </p>

      {submitted && errorCount > 0 && (
        <div role="alert" className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <Icon name="alert" className="size-5 shrink-0" />
          <p>
            Please fix {errorCount === 1 ? 'the highlighted field' : `the ${errorCount} highlighted fields`} below.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div
          ref={resultRef}
          tabIndex={-1}
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-900 focus:outline-none"
        >
          <p className="font-bold">Sorry, we couldn’t send your request.</p>
          <p className="mt-1">
            {serverMessage && `${serverMessage} `}
            Please try again in a moment, or call us at{' '}
            <a href={site.phoneHref} className="font-bold underline">
              {site.phone}
            </a>{' '}
            and we’ll get your quote started over the phone.
          </p>
        </div>
      )}

      {/* About you */}
      <FormGroup legend="About you">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full name" field="name" error={errors.name} required className="sm:col-span-2">
            <input type="text" autoComplete="name" {...fieldProps('name')} />
          </Field>
          <Field label="Email" field="email" error={errors.email} required>
            <input type="email" autoComplete="email" inputMode="email" {...fieldProps('email')} />
          </Field>
          <Field label="Phone" field="phone" error={errors.phone} required>
            <input type="tel" autoComplete="tel" inputMode="tel" placeholder="(555) 555-5555" {...fieldProps('phone')} />
          </Field>
        </div>
        <RadioGroup
          field="contactMethod"
          legend="How should we contact you?"
          options={CONTACT_METHODS.map((v) => ({ value: v, label: LABELS.contactMethod[v] }))}
          value={values.contactMethod}
          error={errors.contactMethod}
          onChange={update}
        />
      </FormGroup>

      {/* Route */}
      <FormGroup legend="Route">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Pickup ZIP or city" field="pickup" error={errors.pickup} required>
            <input type="text" placeholder="e.g. 75201 or Dallas, TX" {...fieldProps('pickup')} />
          </Field>
          <Field label="Delivery ZIP or city" field="delivery" error={errors.delivery} required>
            <input type="text" placeholder="e.g. 85001 or Phoenix, AZ" {...fieldProps('delivery')} />
          </Field>
          <Field label="Preferred pickup date" field="pickupDate" error={errors.pickupDate} required>
            <input type="date" min={todayISO()} {...fieldProps('pickupDate')} />
          </Field>
          <Field label="Service type" field="serviceType" error={errors.serviceType} required>
            <select {...fieldProps('serviceType')}>
              <option value="">Choose a service…</option>
              {SERVICE_TYPES.map((v) => (
                <option key={v} value={v}>
                  {LABELS.serviceType[v]}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </FormGroup>

      {/* Vehicle */}
      <FormGroup legend="Vehicle">
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Year" field="vehicleYear" error={errors.vehicleYear} required>
            <input type="text" inputMode="numeric" maxLength={4} placeholder="2020" {...fieldProps('vehicleYear')} />
          </Field>
          <Field label="Make" field="vehicleMake" error={errors.vehicleMake} required>
            <input type="text" placeholder="Toyota" {...fieldProps('vehicleMake')} />
          </Field>
          <Field label="Model" field="vehicleModel" error={errors.vehicleModel} required>
            <input type="text" placeholder="Camry" {...fieldProps('vehicleModel')} />
          </Field>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <RadioGroup
            field="vehicleType"
            legend="Vehicle type"
            options={VEHICLE_TYPES.map((v) => ({ value: v, label: LABELS.vehicleType[v] }))}
            value={values.vehicleType}
            error={errors.vehicleType}
            onChange={update}
          />
          <RadioGroup
            field="runs"
            legend="Does the vehicle run?"
            options={RUNS_OPTIONS.map((v) => ({ value: v, label: v === 'yes' ? 'Yes' : 'No' }))}
            value={values.runs}
            error={errors.runs}
            onChange={update}
          />
        </div>

        {/* Live region so screen readers hear the note when it appears. */}
        <div aria-live="polite">
          {extraFee && (
            <p className="flex gap-3 rounded-lg border border-accent-200 bg-accent-50 p-4 text-sm text-accent-900">
              <Icon name="info" className="size-5 shrink-0 text-accent-700" />
              <span>
                <strong>Heads up:</strong> an additional fee applies to{' '}
                {values.vehicleType === 'motorcycle' && values.runs === 'no'
                  ? 'motorcycles and inoperable vehicles'
                  : values.vehicleType === 'motorcycle'
                    ? 'motorcycles'
                    : 'inoperable vehicles'}
                . Your dispatcher will include it in your quote.
              </span>
            </p>
          )}
        </div>
      </FormGroup>

      <Field label="Additional notes" field="notes" error={errors.notes} hint="Gate codes, modifications, timing, anything we should know.">
        <textarea rows={4} {...fieldProps('notes')} />
      </Field>

      {/* Honeypot: hidden from people and screen readers; bots tend to fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="quote-honeypot">Leave this field blank</label>
        <input
          id="quote-honeypot"
          type="text"
          name="honeypot"
          tabIndex={-1}
          autoComplete="off"
          value={values.honeypot}
          onChange={onChange}
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Get My Free Quote'}
        </Button>
        <p className="text-sm text-slate-500">No obligation. We never share your information.</p>
      </div>
    </form>
  );
}

/* ---------- Small form building blocks ---------- */

function FormGroup({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset className="space-y-5">
      <legend className="font-heading text-lg font-bold text-navy-900">{legend}</legend>
      {children}
    </fieldset>
  );
}

function RequiredMark() {
  return (
    <span className="text-red-700" aria-hidden="true">
      {' '}
      *
    </span>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-red-700">
      <Icon name="alert" className="size-4 shrink-0" />
      {children}
    </p>
  );
}

interface FieldProps {
  label: string;
  field: QuoteField;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: ReactNode;
}

function Field({ label, field, error, required, hint, className = '', children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={`quote-${field}`} className="block text-sm font-semibold text-navy-900">
        {label}
        {required && <RequiredMark />}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {hint && <p className="mt-0.5 text-sm text-slate-500">{hint}</p>}
      {children}
      {error && <ErrorText id={`quote-${field}-error`}>{error}</ErrorText>}
    </div>
  );
}

interface RadioGroupProps {
  field: QuoteField;
  legend: string;
  options: { value: string; label: string }[];
  value: string;
  error?: string;
  onChange: (field: QuoteField, value: string) => void;
}

function RadioGroup({ field, legend, options, value, error, onChange }: RadioGroupProps) {
  const errorId = `quote-${field}-error`;
  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="text-sm font-semibold text-navy-900">
        {legend}
        <RequiredMark />
        <span className="sr-only"> (required)</span>
      </legend>
      <div className="mt-2 flex flex-wrap gap-3">
        {options.map((opt) => {
          const checked = value === opt.value;
          return (
            <label
              key={opt.value}
              className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent-500 ${
                checked
                  ? 'border-navy-900 bg-navy-50 text-navy-900'
                  : error
                    ? 'border-red-600 bg-white text-slate-700'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-navy-400'
              }`}
            >
              <input
                type="radio"
                name={field}
                value={opt.value}
                checked={checked}
                onChange={() => onChange(field, opt.value)}
                aria-invalid={error ? true : undefined}
                className="size-4 accent-navy-900"
              />
              {opt.label}
            </label>
          );
        })}
      </div>
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </fieldset>
  );
}
