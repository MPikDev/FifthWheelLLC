/**
 * Customer reviews.
 *
 * !! PLACEHOLDER CONTENT !!
 * Every review below is a SAMPLE written for layout purposes only. They are
 * marked `sample: true`, which shows a visible "Sample review" tag on the site.
 * Replace them with real customer reviews (with permission) and set
 * `sample: false` before launch. Never publish made-up reviews as real ones.
 */
export interface Review {
  quote: string;
  name: string;
  /** e.g. "Relocating family", "Dealership". */
  customerType: string;
  route: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** True for placeholder reviews; shows a "Sample review" tag. */
  sample: boolean;
}

export const reviews: readonly Review[] = [
  {
    quote:
      'The dispatcher texted me back the same afternoon, the driver called the day before pickup, and the car showed up exactly as it left.',
    name: 'Customer Name',
    customerType: 'Relocating family',
    route: 'City, ST → City, ST',
    rating: 5,
    sample: true,
  },
  {
    quote:
      'We move auction units with them every month. Gate passes are handled, paperwork is right, and they actually answer the phone.',
    name: 'Customer Name',
    customerType: 'Dealership',
    route: 'Auction → Dealer lot',
    rating: 5,
    sample: true,
  },
  {
    quote:
      'Shipped my car south for the winter and back again in spring. Easy both ways and priced fairly.',
    name: 'Customer Name',
    customerType: 'Snowbird',
    route: 'City, ST → City, ST',
    rating: 5,
    sample: true,
  },
  {
    quote:
      'With PCS orders and a tight timeline, they worked around our schedule and kept us updated the whole way.',
    name: 'Customer Name',
    customerType: 'Military family',
    route: 'Base, ST → Base, ST',
    rating: 5,
    sample: true,
  },
  {
    quote:
      'My project car hasn’t run in years. They showed up with a winch, loaded it carefully and delivered it right to my garage.',
    name: 'Customer Name',
    customerType: 'Inoperable vehicle',
    route: 'City, ST → City, ST',
    rating: 5,
    sample: true,
  },
  {
    quote:
      'Bought a truck online from out of state. They picked it up from the seller and had it in my driveway within the week.',
    name: 'Customer Name',
    customerType: 'Online car buyer',
    route: 'City, ST → City, ST',
    rating: 5,
    sample: true,
  },
];
