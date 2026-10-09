import CtaBanner from '../components/CtaBanner';
import FadeIn from '../components/FadeIn';
import PageHero from '../components/PageHero';
import PageMeta from '../components/PageMeta';
import Section from '../components/Section';
import TestimonialCard from '../components/TestimonialCard';
import { reviews } from '../content/reviews';

export default function Reviews() {
  // While any placeholder reviews remain, show a notice so nobody mistakes them for real ones.
  const hasSamples = reviews.some((r) => r.sample);

  return (
    <>
      <PageMeta
        title="Customer Reviews"
        description="Read what families, snowbirds, military households, dealerships and auction buyers say about shipping with Fifth Wheel LLC."
      />

      <PageHero eyebrow="Reviews" title="Don’t just take our word for it">
        Families, snowbirds, military households and dealers trust us with their vehicles. Here’s what they have to say.
      </PageHero>

      <Section tone="muted">
        {hasSamples && (
          <p className="mx-auto mb-10 max-w-3xl rounded-lg border border-dashed border-slate-400 bg-white p-4 text-center text-sm text-slate-600">
            The reviews below are samples that show how this page will look. They’ll be replaced with real customer
            reviews.
          </p>
        )}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <FadeIn key={i} delay={(i % 3) * 100}>
              <TestimonialCard review={review} />
            </FadeIn>
          ))}
        </div>
      </Section>

      <CtaBanner title="Join our happy customers" />
    </>
  );
}
