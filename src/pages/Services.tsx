import CtaBanner from '../components/CtaBanner';
import FadeIn from '../components/FadeIn';
import Icon from '../components/Icon';
import PageHero from '../components/PageHero';
import PageMeta from '../components/PageMeta';
import Section from '../components/Section';
import ServiceCard from '../components/ServiceCard';
import { images } from '../config/images';
import { services } from '../content/services';

export default function Services() {
  return (
    <>
      <PageMeta
        title="Car Shipping Services"
        description="Open transport, door-to-door and terminal-to-terminal delivery, dealership and auction transport, motorcycles and inoperable vehicles. Nationwide coverage from Fifth Wheel LLC."
      />

      <PageHero eyebrow="Services" title="The right way to move every vehicle">
        From a single family car to a load of auction units, we’ll match you with the service that fits your vehicle,
        your schedule and your budget.
      </PageHero>

      <Section tone="muted">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <FadeIn key={service.id} delay={(i % 3) * 100}>
              <div id={service.id} className="h-full scroll-mt-28">
                <ServiceCard icon={service.icon} title={service.title} badge={service.badge} points={service.points}>
                  {service.description}
                </ServiceCard>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Additional fee note */}
        <FadeIn className="mt-10 flex gap-4 rounded-2xl border border-accent-200 bg-accent-50 p-6">
          <Icon name="info" className="size-6 shrink-0 text-accent-700" />
          <div>
            <h2 className="text-lg font-bold">About additional fees</h2>
            <p className="mt-1 text-slate-700">
              <strong>Motorcycles</strong> and <strong>inoperable vehicles</strong> need extra handling and equipment, so
              an additional fee applies. We’ll always include it in your quote up front, never as a surprise at delivery.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* Nationwide + referral promise */}
      <Section tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-accent-700">Nationwide coverage</p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Don’t see your route? Ask us anyway.</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              We ship vehicles across the country. If your route is one we can’t handle ourselves, we’ll connect you with a
              trusted carrier who can. You get the same straight answers either way, and you’re never left starting your
              search over.
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <img
              src={images.dealership.src}
              alt={images.dealership.alt}
              width={800}
              height={600}
              loading="lazy"
              className="w-full rounded-3xl shadow-lg"
            />
          </FadeIn>
        </div>
      </Section>

      <CtaBanner title="Not sure which service you need?" text="Tell us about your vehicle and your timeline. A dispatcher will recommend the best option and give you a clear price." />
    </>
  );
}
