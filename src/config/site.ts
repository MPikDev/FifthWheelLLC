import { SMS_MESSAGE_TYPES } from '../../shared/quote';
import { reviews } from '../content/reviews';

/**
 * Business details used across the whole site (header, footer, contact page,
 * quote form fallback, SEO). Update the placeholders here and every page picks
 * up the change.
 *
 * TODO before launch: replace every value still marked PLACEHOLDER (hours).
 */
export const site = {
  name: 'Fifth Wheel LLC',
  shortName: 'Fifth Wheel',
  tagline: 'Car shipping you can count on.',

  /** Shown as text; `phoneHref` is used for tap-to-call links. (From FMCSA SAFER record.) */
  phone: '(509) 381-0090',
  phoneHref: 'tel:+15093810090',

  email: 'fifth-wheel@hotmail.com',

  /** Office address. (From FMCSA SAFER record.) */
  address: {
    street: '3001 S Mt Vernon St, Ste 201',
    city: 'Spokane',
    state: 'WA',
    zip: '99223',
  },
  /** Mailing address. (From FMCSA SAFER record.) */
  mailingAddress: 'PO Box 30361, Spokane, WA 99223',

  /** PLACEHOLDER — business hours. */
  hours: [
    { days: 'Monday – Friday', time: '8:00 AM – 6:00 PM' },
    { days: 'Saturday', time: '9:00 AM – 2:00 PM' },
    { days: 'Sunday', time: 'Closed' },
  ],
  /** The time zone your hours are listed in. */
  timeZone: 'Pacific Time',

  /** Short description of where you're based and operate. */
  serviceArea:
    'Based in Spokane, Washington, and shipping vehicles across the country as an authorized interstate carrier. If a route isn’t one we run ourselves, we’ll connect you with a trusted carrier who does.',

  /** FMCSA registration numbers, and the public SAFER record where anyone can verify them. */
  usdot: 'USDOT #1862043',
  mc: 'MC-673472',
  saferUrl:
    'https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=USDOT&query_string=1862043',

  /**
   * Online quote requests. While false, submitting the quote form shows a
   * "not available yet" popup (with call / email options) instead of sending.
   * Set to true once SMTP is configured and tested on the server.
   */
  quoteFormEnabled: false,

  /** Effective date shown on the Privacy Policy and Terms of Service. */
  legalEffectiveDate: 'November 16, 2026',

  /**
   * Text-message program details, used by the quote form consent checkbox,
   * the Privacy Policy and the Terms of Service. Keep `messageTypes` in sync
   * with the use case registered with RingCentral.
   */
  sms: {
    programName: 'Fifth Wheel LLC Customer Updates',
    messageTypes: SMS_MESSAGE_TYPES,
  },

  /** Default SEO description, used when a page doesn't set its own. */
  description:
    'Spokane, WA-based Fifth Wheel LLC moves cars, trucks, SUVs and motorcycles nationwide with open, door-to-door and terminal-to-terminal transport. Get a free quote today.',
} as const;

/** Main navigation, used by the header and footer. The Reviews link is hidden until there are reviews. */
export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/about', label: 'About' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
].filter((link) => link.to !== '/reviews' || reviews.length > 0);

/** Where every "Get a Quote" button points. */
export const QUOTE_PATH = '/contact#quote';
