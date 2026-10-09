/**
 * Every photo on the site, in one place.
 *
 * The files in /public/images are simple placeholder illustrations. To use real
 * photos, drop them into /public/images and update `src` (and `alt`) below.
 * Keep alt text descriptive: it's read aloud by screen readers and helps SEO.
 */
export const images = {
  hero: {
    src: '/images/car-carrier-highway.svg',
    alt: 'A car carrier truck loaded with vehicles driving down an open highway at sunrise',
  },
  highway: {
    src: '/images/open-highway.svg',
    alt: 'An open two-lane highway winding through hills toward the mountains',
  },
  loading: {
    src: '/images/carrier-loading.svg',
    alt: 'A driver guiding a car up the loading ramp of a car carrier trailer',
  },
  dealership: {
    src: '/images/dealership-lot.svg',
    alt: 'A row of vehicles parked at a dealership lot, ready for transport',
  },
} as const;

export type ImageKey = keyof typeof images;
