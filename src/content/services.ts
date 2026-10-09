import type { IconName } from '../components/Icon';

export interface Service {
  id: string;
  icon: IconName;
  title: string;
  /** One-liner for the home page overview. */
  summary: string;
  /** Fuller description for the Services page. */
  description: string;
  points: readonly string[];
  /** Shown as a badge, e.g. for services that cost extra. */
  badge?: string;
}

export const services: readonly Service[] = [
  {
    id: 'open-transport',
    icon: 'truck',
    title: 'Open Transport',
    summary: 'The most common and affordable way to ship a car, on the same kind of carrier dealerships use.',
    description:
      'Your vehicle rides on an open, multi-car carrier, the same way new cars get to dealerships every day. It’s the most affordable option and usually the fastest to schedule.',
    points: ['Best value for most vehicles', 'More carriers on the road means quicker pickup', 'Cargo insurance on every load'],
  },
  {
    id: 'door-to-door',
    icon: 'home',
    title: 'Door-to-Door Delivery',
    summary: 'We pick up and drop off as close to your doors as a truck can safely get.',
    description:
      'We pick up at your address and deliver to the destination you choose, or as close as a full-size carrier can legally and safely get. On tight streets, we’ll meet you at a nearby open lot.',
    points: ['No driving to a terminal', 'Ideal for moves and online car purchases', 'We call ahead before pickup and delivery'],
  },
  {
    id: 'terminal-to-terminal',
    icon: 'map',
    title: 'Terminal-to-Terminal',
    summary: 'Drop off and pick up at a secure terminal on your schedule, often for a lower rate.',
    description:
      'Drop your vehicle at a secure terminal and pick it up at one near your destination. It gives you more flexibility on timing and can lower the cost on some routes.',
    points: ['Flexible drop-off and pick-up times', 'Can reduce cost on certain routes', 'Good fit if you’re traveling separately'],
  },
  {
    id: 'dealership-auction',
    icon: 'building',
    title: 'Dealership & Auction Transport',
    summary: 'Reliable, repeat transport for dealers, auction buyers and fleet managers.',
    description:
      'We move inventory between lots, from auctions and to customers. Expect clear communication, gate-pass coordination and paperwork handled right the first time.',
    points: ['Auction pickups and gate passes coordinated', 'Single units or multi-car loads', 'Consistent point of contact for repeat business'],
  },
  {
    id: 'motorcycles',
    icon: 'motorcycle',
    title: 'Motorcycles',
    summary: 'Bikes are secured with proper straps and wheel chocks so they arrive upright and unscratched.',
    description:
      'Motorcycles are strapped down and chocked by drivers who know how to handle them, so your bike arrives the way it left.',
    points: ['Soft straps and wheel chocks', 'Street bikes, cruisers and touring bikes', 'An additional fee applies'],
    badge: 'Additional fee',
  },
  {
    id: 'inoperable',
    icon: 'wrench',
    title: 'Inoperable Vehicles',
    summary: 'Doesn’t run? No problem. We bring the right equipment to load it safely.',
    description:
      'Project cars, auction buys and vehicles that won’t start can still ship. We bring a winch or arrange the right equipment to load it safely. Just let us know up front.',
    points: ['Winch loading available', 'Non-running, salvage and project cars', 'An additional fee applies'],
    badge: 'Additional fee',
  },
];
