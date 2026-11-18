/**
 * Customer reviews.
 *
 * Add real customer reviews here (with their permission). While this list is
 * empty, the Reviews page shows a "coming soon" message, the home page hides
 * its reviews section, and the Reviews link is left out of the navigation.
 *
 * Example entry:
 *   {
 *     quote: 'What the customer said…',
 *     name: 'Jane D.',
 *     customerType: 'Relocating family',
 *     route: 'Spokane, WA → Phoenix, AZ',
 *     rating: 5,
 *     sample: false,
 *   },
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

export const reviews: readonly Review[] = [];
