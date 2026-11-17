import type { ReactNode } from 'react';
import { site } from '../config/site';
import PageHero from './PageHero';
import PageMeta from './PageMeta';

interface LegalPageProps {
  title: string;
  description: string;
  intro: ReactNode;
  children: ReactNode;
}

/** Shared layout for the Privacy Policy and Terms of Service pages. */
export default function LegalPage({ title, description, intro, children }: LegalPageProps) {
  return (
    <>
      <PageMeta title={title} description={description} />
      <PageHero eyebrow="Legal" title={title}>
        <p>Effective {site.legalEffectiveDate}</p>
      </PageHero>
      <section className="bg-surface py-14 sm:py-20">
        <article className="mx-auto max-w-3xl space-y-10 px-4 leading-relaxed text-slate-700 sm:px-6 lg:px-8">
          <div className="space-y-4 text-lg">{intro}</div>
          {children}
        </article>
      </section>
    </>
  );
}

/** One numbered section of a legal page. `id` makes it linkable, e.g. /terms#sms. */
export function LegalSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} tabIndex={-1} className="scroll-mt-28 space-y-4 focus:outline-none">
      <h2 id={`${id}-heading`} className="text-2xl font-extrabold text-navy-900">
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Bulleted list styled for legal pages. */
export function LegalList({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-2 pl-6 marker:text-accent-600">{children}</ul>;
}

/** Contact block used at the end of both legal pages. */
export function LegalContact() {
  const { address } = site;
  return (
    <address className="rounded-2xl bg-surface-muted p-6 not-italic">
      <strong className="text-navy-900">{site.name}</strong>
      <br />
      {address.street}
      <br />
      {address.city}, {address.state} {address.zip}
      <br />
      Phone:{' '}
      <a href={site.phoneHref} className="font-semibold text-navy-700 underline hover:text-accent-700">
        {site.phone}
      </a>
      <br />
      Email:{' '}
      <a href={`mailto:${site.email}`} className="break-all font-semibold text-navy-700 underline hover:text-accent-700">
        {site.email}
      </a>
    </address>
  );
}
