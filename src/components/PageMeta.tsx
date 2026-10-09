import { site } from '../config/site';

interface PageMetaProps {
  /** Page title, e.g. "Services". The company name is appended automatically. */
  title?: string;
  description?: string;
}

/**
 * Per-page <title> and meta description. React 19 hoists these tags into
 * <head> automatically, so no extra library is needed.
 */
export default function PageMeta({ title, description = site.description }: PageMetaProps) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | Nationwide Car Transport`;
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
    </>
  );
}
