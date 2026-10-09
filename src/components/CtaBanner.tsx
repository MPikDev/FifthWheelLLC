import { QUOTE_PATH, site } from '../config/site';
import Button from './Button';
import FadeIn from './FadeIn';
import Icon from './Icon';

interface CtaBannerProps {
  title?: string;
  text?: string;
}

/** Closing call-to-action band used at the bottom of most pages. */
export default function CtaBanner({
  title = 'Ready to get your vehicle moving?',
  text = 'Tell us where it’s going and we’ll get back to you with a straight answer and a fair price, fast.',
}: CtaBannerProps) {
  return (
    <section aria-labelledby="cta-heading" className="bg-surface-muted py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="relative overflow-hidden rounded-3xl bg-navy-900 px-6 py-12 text-center sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 size-72 rounded-full bg-accent-500/15 blur-2xl"
          />
          <h2 id="cta-heading" className="relative text-3xl font-extrabold text-white sm:text-4xl">
            {title}
          </h2>
          <p className="relative mx-auto mt-4 max-w-2xl text-lg text-navy-100">{text}</p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button to={QUOTE_PATH} size="lg">
              Get a Free Quote
              <Icon name="arrowRight" className="size-5" />
            </Button>
            <Button href={site.phoneHref} variant="outline-light" size="lg">
              <Icon name="phone" className="size-5" />
              Call {site.phone}
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
