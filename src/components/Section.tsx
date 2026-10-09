import type { ReactNode } from 'react';
import FadeIn from './FadeIn';

type Tone = 'white' | 'muted' | 'navy';

const tones: Record<Tone, string> = {
  white: 'bg-surface',
  muted: 'bg-surface-muted',
  navy: 'bg-navy-900 text-navy-100',
};

interface SectionProps {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  /** Small label above the heading, e.g. "Our services". */
  eyebrow?: string;
  title?: string;
  intro?: ReactNode;
  /** Center the heading block (default) or align it left. */
  align?: 'center' | 'left';
  className?: string;
}

/**
 * A full-width page band with consistent padding and an optional heading
 * block. The heading is linked to the section with aria-labelledby.
 */
export default function Section({
  children,
  tone = 'white',
  id,
  eyebrow,
  title,
  intro,
  align = 'center',
  className = '',
}: SectionProps) {
  const headingId = title && id ? `${id}-heading` : undefined;
  const dark = tone === 'navy';
  const centered = align === 'center';

  return (
    <section id={id} aria-labelledby={headingId} className={`py-16 sm:py-20 lg:py-24 ${tones[tone]} ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(eyebrow || title || intro) && (
          <FadeIn className={`mb-12 max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}>
            {eyebrow && (
              <p
                className={`font-heading text-sm font-bold uppercase tracking-[0.18em] ${dark ? 'text-accent-400' : 'text-accent-700'}`}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                id={headingId}
                className={`mt-2 text-3xl font-extrabold sm:text-4xl ${dark ? 'text-white' : 'text-navy-900'}`}
              >
                {title}
              </h2>
            )}
            {intro && (
              <div className={`mt-4 text-lg leading-relaxed ${dark ? 'text-navy-100' : 'text-slate-600'}`}>{intro}</div>
            )}
          </FadeIn>
        )}
        {children}
      </div>
    </section>
  );
}
