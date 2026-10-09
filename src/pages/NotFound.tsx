import Button from '../components/Button';
import PageMeta from '../components/PageMeta';
import { QUOTE_PATH } from '../config/site';

export default function NotFound() {
  return (
    <>
      <PageMeta title="Page Not Found" description="The page you’re looking for doesn’t exist." />
      <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:py-32">
        <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-accent-700">404</p>
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Wrong exit.</h1>
        <p className="mt-4 text-lg text-slate-600">
          We couldn’t find that page. Let’s get you back on the road.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button to="/" variant="secondary">
            Back to home
          </Button>
          <Button to={QUOTE_PATH}>Get a Free Quote</Button>
        </div>
      </section>
    </>
  );
}
