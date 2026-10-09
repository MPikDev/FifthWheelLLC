import { Link } from 'react-router';
import type { FaqItem } from '../components/FaqAccordion';
import { QUOTE_PATH } from '../config/site';

/** Frequently asked questions. Answers can include links and formatting. */
export const faqs: readonly FaqItem[] = [
  {
    question: 'How much does it cost to ship a car?',
    answer: (
      <>
        <p>Every quote is based on a few things:</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>
            <strong>Distance and route.</strong> Longer trips cost more overall, but less per mile. Routes along major
            highways are usually cheaper than remote ones.
          </li>
          <li>
            <strong>Vehicle size and weight.</strong> A full-size truck takes more room on the carrier than a compact car.
          </li>
          <li>
            <strong>Condition.</strong> Vehicles that don’t run need extra equipment and carry an additional fee.
          </li>
          <li>
            <strong>Service type.</strong> Door-to-door, terminal-to-terminal and dealership transport are priced differently.
          </li>
          <li>
            <strong>Season and timing.</strong> Snowbird season, summer moves and short notice can all affect price.
          </li>
        </ul>
        <p className="mt-3">
          The quickest way to get an exact number is to{' '}
          <Link to={QUOTE_PATH} className="font-semibold text-navy-700 underline hover:text-accent-700">
            request a free quote
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    question: 'How long does transport take?',
    answer: (
      <p>
        As a rough guide, shorter regional trips often take 1–3 days once your vehicle is picked up, and coast-to-coast
        trips typically take 7–10 days. Your dispatcher will give you a realistic estimate for your route and keep you
        posted along the way. Weather, traffic and other stops on the route can affect timing.
      </p>
    ),
  },
  {
    question: 'Is my vehicle insured during transport?',
    answer: (
      <p>
        Yes. We’re licensed and insured, and every vehicle is covered by cargo insurance while it’s in our care. Your
        vehicle is inspected at pickup and again at delivery, and its condition is recorded on the bill of lading. Ask
        your dispatcher if you’d like a copy of our insurance certificate. Personal items left in the vehicle are not
        covered.
      </p>
    ),
  },
  {
    question: 'What’s the difference between open, door-to-door and terminal-to-terminal?',
    answer: (
      <>
        <p>
          <strong>Open transport</strong> describes the carrier: your vehicle rides on an open, multi-car trailer, the
          most common and affordable way to ship a car.
        </p>
        <p className="mt-3">
          <strong>Door-to-door</strong> and <strong>terminal-to-terminal</strong> describe where we pick up and deliver.
          With door-to-door, we come to your address (or as close as a large truck can safely get). With
          terminal-to-terminal, you drop off and pick up at secure terminals, which offers flexible timing and can lower
          the cost on some routes.
        </p>
      </>
    ),
  },
  {
    question: 'Can you ship a car that doesn’t run?',
    answer: (
      <p>
        Yes. We regularly move non-running, salvage and project vehicles. Let us know when you request a quote so we can
        bring a winch or arrange the right loading equipment. An additional fee applies for inoperable vehicles.
      </p>
    ),
  },
  {
    question: 'Do you ship motorcycles?',
    answer: (
      <p>
        We do. Motorcycles are secured with soft straps and wheel chocks so they stay upright and protected. An
        additional fee applies, and your dispatcher will include it in your quote.
      </p>
    ),
  },
  {
    question: 'How do I pay?',
    answer: (
      <p>
        Your dispatcher will go over payment when you book. {/* PLACEHOLDER: describe your payment terms here, e.g. deposit amount, accepted methods (card, cash, cashier’s check, Zelle), and whether the balance is due at delivery. */}
        There are no hidden fees: the price you approve is the price you pay, unless the details of the shipment change.
      </p>
    ),
  },
  {
    question: 'How should I prepare my car for transport?',
    answer: (
      <>
        <p>A few simple steps make pickup quick and smooth:</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>Wash the car and take dated photos of every side.</li>
          <li>Remove personal belongings and loose accessories.</li>
          <li>Leave about a quarter tank of fuel.</li>
          <li>Disable toll tags and alarms.</li>
          <li>Let us know about any leaks or mechanical issues.</li>
        </ul>
        <p className="mt-3">
          See the full checklist on our{' '}
          <Link to="/how-it-works" className="font-semibold text-navy-700 underline hover:text-accent-700">
            How It Works
          </Link>{' '}
          page.
        </p>
      </>
    ),
  },
  {
    question: 'What if you don’t cover my route?',
    answer: (
      <p>
        We ship nationwide, and if a route is one we can’t handle ourselves, we won’t leave you hanging. We’ll connect you
        with a trusted carrier we know who can, so you still get a straight answer and a dependable ride for your vehicle.
      </p>
    ),
  },
];
