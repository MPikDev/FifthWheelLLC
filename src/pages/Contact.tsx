import FadeIn from '../components/FadeIn';
import Icon from '../components/Icon';
import PageHero from '../components/PageHero';
import PageMeta from '../components/PageMeta';
import QuoteForm from '../components/QuoteForm';
import { site } from '../config/site';

export default function Contact() {
  const { address } = site;

  return (
    <>
      <PageMeta
        title="Get a Free Quote"
        description="Request a free, no-obligation car shipping quote from Fifth Wheel LLC, or call, text or email our dispatch team."
      />

      <PageHero eyebrow="Contact" title="Get your free quote">
        Tell us about your vehicle and route. A dispatcher will reach out by email or text, whichever you prefer, within
        24 hours or by the next business day.
      </PageHero>

      <section className="bg-surface-muted py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {/* Quote form */}
          <FadeIn className="lg:col-span-2">
            <div
              id="quote"
              tabIndex={-1}
              aria-labelledby="quote-heading"
              role="region"
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 focus:outline-none sm:p-10"
            >
              <h2 id="quote-heading" className="text-2xl font-extrabold sm:text-3xl">
                Request a quote
              </h2>
              <p className="mt-2 text-slate-600">It takes about two minutes. No obligation.</p>
              <div className="mt-8">
                <QuoteForm />
              </div>
            </div>
          </FadeIn>

          {/* Contact details */}
          <FadeIn delay={100} as="aside" className="space-y-6">
            <div className="rounded-3xl bg-navy-900 p-6 text-navy-100 sm:p-8">
              <h2 className="text-xl font-bold text-white">Prefer to talk?</h2>
              <p className="mt-2">Call or email and a dispatcher will help you right away.</p>
              <ul className="mt-6 space-y-4">
                <li>
                  <a href={site.phoneHref} className="flex items-center gap-3 rounded font-semibold text-white hover:text-accent-300">
                    <span className="inline-flex size-10 items-center justify-center rounded-lg bg-white/10">
                      <Icon name="phone" className="size-5 text-accent-400" />
                    </span>
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-center gap-3 break-all rounded font-semibold text-white hover:text-accent-300"
                  >
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                      <Icon name="mail" className="size-5 text-accent-400" />
                    </span>
                    {site.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <Icon name="pin" className="size-5 text-accent-400" />
                  </span>
                  <address className="not-italic text-white">
                    {address.street}
                    <br />
                    {address.city}, {address.state} {address.zip}
                    <span className="mt-2 block text-sm text-navy-200">Mail: {site.mailingAddress}</span>
                  </address>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <Icon name="clock" className="size-5 text-accent-600" />
                Business hours
              </h2>
              <dl className="mt-4 space-y-2">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4 border-b border-slate-100 pb-2 last:border-0">
                    <dt className="text-slate-600">{h.days}</dt>
                    <dd className="font-semibold text-navy-900">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-sm text-slate-500">{site.timeZone}</p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <Icon name="map" className="size-5 text-accent-600" />
                Service area
              </h2>
              <p className="mt-3 leading-relaxed text-slate-600">{site.serviceArea}</p>
              <p className="mt-4 text-sm text-slate-500">
                {site.usdot} <span aria-hidden="true">·</span> {site.mc}
              </p>
              <a
                href={site.saferUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block rounded text-sm font-semibold text-navy-700 underline hover:text-accent-700"
              >
                Verify our authority on FMCSA SAFER<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
