import CtaBanner from '../components/CtaBanner';
import FadeIn from '../components/FadeIn';
import Icon, { type IconName } from '../components/Icon';
import PageHero from '../components/PageHero';
import PageMeta from '../components/PageMeta';
import Section from '../components/Section';
import { images } from '../config/images';

/* PLACEHOLDER: replace the story and values below with your own. */

const values: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'headset',
    title: 'Be reachable',
    text: 'Call or text and you’ll get a real person who knows where your vehicle is. No ticket numbers, no phone trees.',
  },
  {
    icon: 'clipboard',
    title: 'Be straight with people',
    text: 'Clear prices, honest timelines and no surprise fees. If something changes, you hear it from us first.',
  },
  {
    icon: 'shield',
    title: 'Treat every vehicle like our own',
    text: 'Careful loading, proper tie-downs and a documented inspection at both ends, every single time.',
  },
  {
    icon: 'handshake',
    title: 'Always find a way',
    text: 'If a route isn’t ours, we’ll point you to a carrier we trust instead of leaving you to start over.',
  },
];

const reasons = [
  'A Spokane-based carrier with our own trucks and drivers, not a faceless broker',
  'Dispatchers who reply by email or text, whichever you prefer',
  'Active USDOT and MC authority you can verify on FMCSA SAFER',
  'Experience with everyday drivers, dealers, auctions and military moves',
  'Motorcycles and non-running vehicles handled with the right equipment',
  'Nationwide reach, plus referrals to trusted carriers when we can’t run a route',
];

export default function About() {
  return (
    <>
      <PageMeta
        title="About Us"
        description="Meet Fifth Wheel LLC, a dependable car transport team that answers the phone, gives straight prices and treats every vehicle like its own."
      />

      <PageHero eyebrow="About us" title="A team you can actually call">
        Fifth Wheel LLC is built on a simple idea: shipping a car should feel like working with neighbors you trust, not
        a call center.
      </PageHero>

      <Section tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-accent-700">Our story</p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">How Fifth Wheel got rolling</h2>
            {/* PLACEHOLDER: replace these paragraphs with the real company story. */}
            <div className="mt-4 space-y-4 text-lg leading-relaxed text-slate-600">
              <p>
                [Placeholder] Fifth Wheel LLC started with one truck, one trailer and a frustration with how hard it was
                to get a straight answer from a car shipping company. Tell your story here: who founded the company, when,
                and why.
              </p>
              <p>
                [Placeholder] Describe how the business has grown, the kinds of customers you serve most, and what a
                typical week on the road looks like for your team.
              </p>
              <p>
                [Placeholder] Close with what hasn’t changed: the commitment to answering the phone, keeping customers
                informed and treating every vehicle with care.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <img
              src={images.loading.src}
              alt={images.loading.alt}
              width={800}
              height={600}
              loading="lazy"
              className="w-full rounded-3xl shadow-lg"
            />
          </FadeIn>
        </div>
      </Section>

      <Section tone="muted" id="values" eyebrow="What we stand for" title="Our values">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <FadeIn key={v.title} delay={i * 100} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-navy-900 text-accent-400">
                <Icon name={v.icon} />
              </span>
              <h3 className="mt-4 text-lg font-bold">{v.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{v.text}</p>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section tone="navy" id="why-us" eyebrow="Why Fifth Wheel" title="Why customers choose us">
        <ul className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {reasons.map((reason, i) => (
            <FadeIn as="li" key={reason} delay={(i % 2) * 100} className="flex gap-3 rounded-xl bg-white/5 p-5 ring-1 ring-white/10">
              <Icon name="check" className="mt-0.5 size-5 shrink-0 text-accent-400" />
              <span className="text-white">{reason}</span>
            </FadeIn>
          ))}
        </ul>
      </Section>

      <CtaBanner />
    </>
  );
}
