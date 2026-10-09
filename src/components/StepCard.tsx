import type { ReactNode } from 'react';
import Icon, { type IconName } from './Icon';

interface StepCardProps {
  step: number;
  title: string;
  children: ReactNode;
  icon?: IconName;
  /** Use light text, for navy sections. */
  dark?: boolean;
}

export default function StepCard({ step, title, children, icon, dark = false }: StepCardProps) {
  return (
    <div className="relative flex h-full flex-col">
      <div className="flex items-center gap-3">
        <span
          className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-accent-500 font-heading text-lg font-extrabold text-navy-950"
          aria-hidden="true"
        >
          {step}
        </span>
        {icon && <Icon name={icon} className={`size-6 ${dark ? 'text-navy-300' : 'text-navy-400'}`} />}
      </div>
      <h3 className={`mt-4 text-lg font-bold ${dark ? 'text-white' : ''}`}>
        <span className="sr-only">Step {step}: </span>
        {title}
      </h3>
      <div className={`mt-2 leading-relaxed ${dark ? 'text-navy-100' : 'text-slate-600'}`}>{children}</div>
    </div>
  );
}
