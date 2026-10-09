import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { QUOTE_PATH, navLinks, site } from '../config/site';
import Button from './Button';
import Icon from './Icon';
import Logo from './Logo';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
    isActive ? 'text-navy-900 underline decoration-accent-500 decoration-2 underline-offset-8' : 'text-slate-600 hover:text-navy-900'
  }`;

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu whenever the page changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  // Close the mobile menu with Escape and return focus to the toggle button.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="shrink-0 rounded-md" aria-label={`${site.name} home`}>
          <Logo className="h-14 w-auto" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === '/'} className={linkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 rounded-md text-sm font-semibold text-navy-900 hover:text-accent-700 xl:inline-flex"
          >
            <Icon name="phone" className="size-4" />
            {site.phone}
          </a>
          <Button to={QUOTE_PATH} className="hidden sm:inline-flex">
            Get a Quote
          </Button>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md text-navy-900 hover:bg-slate-100 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <Icon name={open ? 'close' : 'menu'} className="size-7" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" hidden={!open} className="border-t border-slate-200 bg-white lg:hidden">
        <nav aria-label="Mobile" className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }: { isActive: boolean }) =>
                    `block rounded-md px-3 py-3 text-base font-semibold ${
                      isActive ? 'bg-navy-50 text-navy-900' : 'text-slate-700 hover:bg-slate-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4">
            <Button to={QUOTE_PATH} size="lg">
              Get a Free Quote
            </Button>
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-md py-2 font-semibold text-navy-900"
            >
              <Icon name="phone" className="size-5" />
              Call {site.phone}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
