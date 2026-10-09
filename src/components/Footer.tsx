import { Link } from 'react-router';
import { navLinks, site } from '../config/site';
import Icon from './Icon';
import Logo from './Logo';

export default function Footer() {
  const year = new Date().getFullYear();
  const { address } = site;

  return (
    <footer className="bg-navy-950 text-navy-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          {/* White logo treatment for the dark footer */}
          <Logo tone="light" className="h-16 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">{site.tagline} Open, door-to-door and terminal transport, nationwide.</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-white">Explore</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="rounded hover:text-white hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-white">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={site.phoneHref} className="inline-flex items-center gap-2 rounded hover:text-white">
                <Icon name="phone" className="size-4 shrink-0 text-accent-400" />
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 break-all rounded hover:text-white">
                <Icon name="mail" className="size-4 shrink-0 text-accent-400" />
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="pin" className="mt-0.5 size-4 shrink-0 text-accent-400" />
              <address className="not-italic">
                {address.street}
                <br />
                {address.city}, {address.state} {address.zip}
              </address>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-white">Hours</h2>
          <dl className="mt-4 space-y-2 text-sm">
            {site.hours.map((h) => (
              <div key={h.days} className="flex justify-between gap-4">
                <dt>{h.days}</dt>
                <dd className="text-white">{h.time}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-xs text-navy-300">{site.timeZone}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-navy-300 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p>
            {site.usdot} <span aria-hidden="true">·</span> {site.mc} <span aria-hidden="true">·</span>{' '}
            <a href={site.saferUrl} target="_blank" rel="noopener noreferrer" className="rounded underline hover:text-white">
              Verify on FMCSA SAFER<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
