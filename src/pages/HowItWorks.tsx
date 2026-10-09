import CtaBanner from '../components/CtaBanner';
import FadeIn from '../components/FadeIn';
import Icon from '../components/Icon';
import PageHero from '../components/PageHero';
import PageMeta from '../components/PageMeta';
import Section from '../components/Section';
import StepCard from '../components/StepCard';
import { images } from '../config/images';
import { prepTips, steps } from '../content/steps';

export default function HowItWorks() {
  return (
    <>
      <PageMeta
        title="How Car Shipping Works"
        description="See how Fifth Wheel LLC ships your vehicle, from quote to pickup to delivery and inspection, plus tips for preparing your car for transport."
      />

      <PageHero eyebrow="How it works" title="From quote to keys in hand">
        Shipping a car shouldn’t be confusing. Here’s exactly what happens, step by step, and who you’ll be talking to
        along the way.
      </PageHero>

      <Section tone="white" id="process" title="The process" eyebrow="Step by step">
        <ol className="relative mx-auto max-w-3xl space-y-12 border-l-2 border-dashed border-navy-100 pl-8 sm:pl-12">
          {steps.map((step, i) => (
            <FadeIn as="li" key={step.title} className="relative">
              {/* Dot on the timeline */}
              <span
                aria-hidden="true"
                className="absolute -left-[41px] top-4 size-4 rounded-full border-4 border-white bg-accent-500 sm:-left-[57px]"
              />
              <StepCard step={i + 1} title={step.title} icon={step.icon}>
                {step.detail}
              </StepCard>
            </FadeIn>
          ))}
        </ol>
      </Section>

      <Section tone="muted" id="prepare">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <FadeIn>
            <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-accent-700">Before pickup</p>
            <h2 id="prepare-heading" className="mt-2 text-3xl font-extrabold sm:text-4xl">
              How to prepare your vehicle
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              A few minutes of prep makes pickup faster and inspection easier for everyone.
            </p>
            <img
              src={images.loading.src}
              alt={images.loading.alt}
              width={800}
              height={600}
              loading="lazy"
              className="mt-8 w-full rounded-3xl shadow-lg"
            />
          </FadeIn>
          <FadeIn delay={100}>
            <ul className="space-y-4">
              {prepTips.map((tip) => (
                <li key={tip} className="flex gap-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                  <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-100 text-accent-700">
                    <Icon name="check" className="size-4" />
                  </span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
