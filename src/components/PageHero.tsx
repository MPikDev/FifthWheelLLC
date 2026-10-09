import type { ReactNode } from 'react';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}

/** Compact navy banner at the top of inner pages. */
export default function PageHero({ eyebrow, title, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      {/* Decorative road stripe */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1.5 bg-[repeating-linear-gradient(90deg,var(--color-accent-500)_0_48px,transparent_48px_80px)]"
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-accent-400">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold text-white sm:text-5xl">{title}</h1>
        {children && <div className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-100">{children}</div>}
      </div>
    </section>
  );
}
