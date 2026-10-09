import type { IconName } from '../components/Icon';

export interface Step {
  icon: IconName;
  title: string;
  /** Short version for the home page. */
  short: string;
  /** Full version for the How It Works page. */
  detail: string;
}

/** The transport process, in order. */
export const steps: readonly Step[] = [
  {
    icon: 'clipboard',
    title: 'Request a quote',
    short: 'Tell us the route, the vehicle and when you’d like it picked up.',
    detail:
      'Fill out the quote form or give us a call. We’ll need the pickup and delivery locations, the vehicle’s year, make and model, whether it runs, and your preferred pickup date.',
  },
  {
    icon: 'headset',
    title: 'A dispatcher contacts you',
    short: 'A real person reaches out by email or text with your price.',
    detail:
      'A dispatcher reviews your request and reaches out the way you asked, by email or text, usually within 24 hours. You’ll get a clear price and an honest pickup window, and we’ll answer any questions.',
  },
  {
    icon: 'calendar',
    title: 'Schedule pickup',
    short: 'We lock in a pickup window that works for you.',
    detail:
      'Once you approve the quote, we confirm a pickup window and assign a driver. The driver calls ahead so you know exactly when to expect them.',
  },
  {
    icon: 'truck',
    title: 'Your vehicle is transported',
    short: 'Your vehicle is inspected, loaded and on its way.',
    detail:
      'At pickup, the driver inspects the vehicle with you and notes its condition on the bill of lading. Then it’s loaded, secured and on its way. You can reach dispatch anytime during transit for an update.',
  },
  {
    icon: 'handshake',
    title: 'Delivery & inspection',
    short: 'We deliver, inspect it with you and hand over the keys.',
    detail:
      'At delivery, you and the driver walk around the vehicle together and compare it to the pickup report. Once you’re satisfied, you sign off and take your keys.',
  },
];

/** Tips shown on the How It Works page. */
export const prepTips: readonly string[] = [
  'Wash your vehicle so it’s easy to spot and note any existing scratches or dents during inspection.',
  'Take dated photos of every side, plus the odometer, before pickup.',
  'Remove personal items and loose accessories. They aren’t covered by cargo insurance.',
  'Leave about a quarter tank of fuel. That’s plenty for loading without adding extra weight.',
  'Disable toll tags and car alarms, or leave clear instructions for the driver.',
  'Check tire pressure and battery charge, and let us know about any leaks.',
  'Retract antennas, fold in mirrors and secure or remove anything that could come loose, like spoilers or bike racks.',
  'Hand over one set of keys, including any for the trunk, gas cap or wheel locks.',
];
