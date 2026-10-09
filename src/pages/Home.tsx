import { Link } from 'react-router';
import Button from '../components/Button';
import CtaBanner from '../components/CtaBanner';
import FadeIn from '../components/FadeIn';
import Icon, { type IconName } from '../components/Icon';
import PageMeta from '../components/PageMeta';
import Section from '../components/Section';
import ServiceCard from '../components/ServiceCard';
import StepCard from '../components/StepCard';
import TestimonialCard from '../components/TestimonialCard';
import { images } from '../config/images';
import { QUOTE_PATH, site } from '../config/site';
import { reviews } from '../content/reviews';
import { services } from '../content/services';

const trust: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'map',
    title: 'Nationwide coverage',
    text: 'Coast to coast, and if we can’t run your route, we’ll connect you with a carrier who can.',
  },
  {
    icon: 'shield',
    title: 'Licensed & insured',
    text: `Authorized interstate carrier (${site.usdot}, ${site.mc}) with cargo insurance on every load.`,
  },
  {
    icon: 'headset',
    title: 'Responsive dispatch',
    text: 'Real people who answer the phone and reply to texts, from quote to delivery.',
  },
];

/** Condensed version of the process for the home page. */
const previewSteps: { icon: IconName; title: string; text: string }[] = [
  { icon: 'clipboard', title: 'Request a quote', text: 'Tell us the route, the vehicle and your timing. It takes about two minutes.' },
  { icon: 'headset', title: 'Talk to dispatch', text: 'A real dispatcher reaches out by email or text with your price.' },
  { icon: 'truck', title: 'We pick it up', text: 'We schedule pickup, inspect your vehicle with you and load it up.' },
  { icon: 'handshake', title: 'Delivered & inspected', text: 'We deliver, walk around it with you and hand over the keys.' },
];

export default function Home() {
  return (
    <>
      <PageMeta description={site.description} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(242,138,11,0.18),transparent_55%)]"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <FadeIn>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-[0.18em] text-accent-300">
              <Icon name="map" className="size-4" />
              Nationwide car transport
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Your car, moved right. <span className="text-accent-400">Door to door, coast to coast.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100 sm:text-xl">
              Moving, buying out of state, heading south for the winter or filling a lot? Fifth Wheel gets your vehicle
              where it needs to go, with a dispatcher you can actually reach.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button to={QUOTE_PATH} size="lg">
                Get a Free Quote
                <Icon name="arrowRight" className="size-5" />
              </Button>
              <Button href={site.phoneHref} variant="outline-light" size="lg">
                <Icon name="phone" className="size-5" />
                {site.phone}
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-navy-100">
              {['Free, no-obligation quotes', 'Authorized interstate carrier', 'Cars, trucks, SUVs & motorcycles'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Icon name="check" className="size-4 text-accent-400" />
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={150} className="relative">
            <img
              src={images.hero.src}
              alt={images.hero.alt}
              width={800}
              height={600}
              className="w-full rounded-3xl shadow-2xl ring-1 ring-white/10"
              fetchPriority="high"
            />
          </FadeIn>
        </div>
      </section>

      {/* Trust indicators */}
      <section aria-label="Why customers trust us" className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
          {trust.map((item, i) => (
            <FadeIn key={item.title} delay={i * 100} className="flex gap-4">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent-100 text-accent-700">
                <Icon name={item.icon} />
              </span>
              <div>
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="mt-1 text-slate-600">{item.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Services overview */}
      <Section
        id="services"
        tone="muted"
        eyebrow="What we haul"
        title="Transport for every kind of move"
        intro="Whether it’s one family car or a load of auction units, we’ll match you with the right service."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <FadeIn key={service.id} delay={(i % 3) * 100}>
              <ServiceCard icon={service.icon} title={service.title} badge={service.badge}>
                {service.summary}
              </ServiceCard>
            </FadeIn>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded font-heading font-bold text-navy-800 hover:text-accent-700"
          >
            See all services
            <Icon name="arrowRight" className="size-5" />
          </Link>
        </div>
      </Section>

      {/* How it works preview */}
      <Section
        id="how-it-works"
        tone="navy"
        eyebrow="How it works"
        title="Four simple steps, start to finish"
        intro="No runaround and no guessing. Here’s what to expect when you ship with us."
      >
        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {previewSteps.map((step, i) => (
            <FadeIn as="li" key={step.title} delay={i * 100}>
              <StepCard step={i + 1} title={step.title} icon={step.icon} dark>
                {step.text}
              </StepCard>
            </FadeIn>
          ))}
        </ol>
        <div className="mt-12 text-center">
          <Button to="/how-it-works" variant="outline-light">
            See the full process
          </Button>
        </div>
      </Section>

      {/* Coverage / referral promise */}
      <Section tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <img
              src={images.highway.src}
              alt={images.highway.alt}
              width={800}
              height={600}
              loading="lazy"
              className="w-full rounded-3xl shadow-lg"
            />
          </FadeIn>
          <FadeIn delay={100}>
            <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-accent-700">Our promise</p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">We’ll get you there, one way or another.</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              We ship nationwide. And if your route is one we can’t run ourselves, we won’t just say no. We’ll connect you
              with a trusted carrier who can, so you’re never left starting from scratch.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Individuals, families and military households',
                'Snowbirds heading south and back',
                'Dealerships, auction buyers and online car purchases',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <Icon name="check" className="mt-0.5 size-5 shrink-0 text-accent-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </Section>

      {/* Reviews preview */}
      <Section
        id="reviews"
        tone="muted"
        eyebrow="Reviews"
        title="What our customers say"
        intro="Straight talk from the people we’ve moved."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.slice(0, 3).map((review, i) => (
            <FadeIn key={i} delay={i * 100}>
              <TestimonialCard review={review} />
            </FadeIn>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 rounded font-heading font-bold text-navy-800 hover:text-accent-700"
          >
            Read more reviews
            <Icon name="arrowRight" className="size-5" />
          </Link>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
