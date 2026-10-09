import type { ReactNode } from 'react';
import { Link } from 'react-router';

type Variant = 'primary' | 'secondary' | 'outline-light';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-heading font-bold tracking-wide transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  // Amber button with dark navy text (high contrast).
  primary: 'bg-accent-500 text-navy-950 shadow-sm hover:bg-accent-400 active:bg-accent-600',
  // Solid navy, for use on light backgrounds.
  secondary: 'bg-navy-900 text-white hover:bg-navy-700 active:bg-navy-950',
  // White outline, for use on navy/dark backgrounds.
  'outline-light': 'border-2 border-white/80 text-white hover:bg-white hover:text-navy-900',
};

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

/** Renders a router <Link> when `to` is given, an <a> for `href`, otherwise a <button>. */
type ButtonProps = CommonProps &
  (
    | { to: string; href?: never; type?: never; disabled?: never; onClick?: never }
    | { href: string; to?: never; type?: never; disabled?: never; onClick?: never }
    | {
        to?: never;
        href?: never;
        type?: 'button' | 'submit';
        disabled?: boolean;
        onClick?: () => void;
      }
  );

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (rest.to !== undefined) {
    return (
      <Link to={rest.to} className={classes}>
        {children}
      </Link>
    );
  }
  if (rest.href !== undefined) {
    return (
      <a href={rest.href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button type={rest.type ?? 'button'} disabled={rest.disabled} onClick={rest.onClick} className={classes}>
      {children}
    </button>
  );
}
