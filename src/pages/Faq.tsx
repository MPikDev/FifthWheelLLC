import CtaBanner from '../components/CtaBanner';
import FaqAccordion from '../components/FaqAccordion';
import FadeIn from '../components/FadeIn';
import PageHero from '../components/PageHero';
import PageMeta from '../components/PageMeta';
import Section from '../components/Section';
import { site } from '../config/site';
import { faqs } from '../content/faqs';

export default function Faq() {
  return (
    <>
      <PageMeta
        title="Car Shipping FAQ"
        description="Answers about car shipping costs, timelines, insurance, open vs. door-to-door vs. terminal transport, inoperable vehicles, motorcycles, payment and vehicle prep."
      />

      <PageHero eyebrow="FAQ" title="Questions? We’ve got straight answers.">
        Here’s what people ask us most. Don’t see your question?{' '}
        <a href={site.phoneHref} className="font-semibold text-white underline hover:text-accent-300">
          Give us a call
        </a>
        .
      </PageHero>

      <Section tone="muted">
        <FadeIn className="mx-auto max-w-3xl">
          <FaqAccordion items={faqs} headingLevel="h2" />
        </FadeIn>
      </Section>

      <CtaBanner title="Still have questions?" text="A dispatcher is happy to walk you through it. Request a quote or give us a call." />
    </>
  );
}
