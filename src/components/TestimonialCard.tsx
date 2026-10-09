import type { Review } from '../content/reviews';
import Icon from './Icon';

/**
 * A customer review. When `review.sample` is true, a visible "Sample review"
 * tag is shown so placeholder content can't be mistaken for a real review.
 */
export default function TestimonialCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <div className="flex text-accent-500" role="img" aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Icon key={i} name="star" className={`size-5 ${i < review.rating ? '' : 'text-slate-200'}`} />
          ))}
        </div>
        {review.sample && (
          <span className="rounded-full border border-dashed border-slate-400 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Sample review
          </span>
        )}
      </div>
      <blockquote className="mt-4 flex-1 leading-relaxed text-slate-700">
        <p>&ldquo;{review.quote}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-6 border-t border-slate-100 pt-4">
        <p className="font-heading font-bold text-navy-900">{review.name}</p>
        <p className="text-sm text-slate-500">
          {review.customerType} <span aria-hidden="true">·</span> {review.route}
        </p>
      </figcaption>
    </figure>
  );
}
