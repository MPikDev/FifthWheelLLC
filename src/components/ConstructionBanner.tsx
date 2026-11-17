import { site } from '../config/site';
import Icon from './Icon';

/**
 * Site-wide notice that the website is still being finished. It can't be
 * dismissed; turn it off with `underConstruction: false` in src/config/site.ts.
 */
export default function ConstructionBanner() {
  if (!site.underConstruction) return null;

  return (
    <div role="region" aria-label="Site notice" className="bg-accent-500 text-navy-950">
      <div className="mx-auto flex max-w-7xl items-start gap-3 px-4 py-2.5 text-sm sm:items-center sm:px-6 lg:px-8">
        <Icon name="info" className="mt-0.5 size-5 shrink-0 sm:mt-0" />
        <p>
          <strong className="font-bold">This website is still under construction.</strong> Some details may change.
          Have feedback on what we should add or take away?{' '}
          <a href={site.phoneHref} className="whitespace-nowrap font-bold underline underline-offset-2 hover:text-navy-800">
            Call us at {site.phone}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
