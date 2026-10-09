import type { ReactNode } from 'react';
import Icon, { type IconName } from './Icon';

interface ServiceCardProps {
  icon: IconName;
  title: string;
  children: ReactNode;
  /** Short highlighted note, e.g. "Additional fee". */
  badge?: string;
  /** Optional list of bullet points. */
  points?: readonly string[];
}

export default function ServiceCard({ icon, title, children, badge, points }: ServiceCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex size-12 items-center justify-center rounded-xl bg-navy-900 text-accent-400">
          <Icon name={icon} className="size-6" />
        </span>
        {badge && (
          <span className="rounded-full bg-accent-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-800">
            {badge}
          </span>
        )}
      </div>
      <h3 className="mt-5 text-xl font-bold">{title}</h3>
      <div className="mt-2 leading-relaxed text-slate-600">{children}</div>
      {points && points.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          {points.map((point) => (
            <li key={point} className="flex gap-2">
              <Icon name="check" className="mt-0.5 size-4 shrink-0 text-accent-600" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
