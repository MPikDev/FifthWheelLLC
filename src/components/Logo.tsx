interface LogoProps {
  /**
   * `dark` shows the original black logo (for light backgrounds).
   * `light` turns it white (for navy/dark backgrounds such as the footer).
   */
  tone?: 'dark' | 'light';
  className?: string;
}

/**
 * The Fifth Wheel LLC logo, loaded from /public/logo.png.
 *
 * The white version is made with a CSS filter (brightness-0 + invert), which
 * works for a black logo on a transparent background. If your logo file has a
 * solid white background, export it as a transparent PNG for this to work.
 */
export default function Logo({ tone = 'dark', className = 'h-12 w-auto' }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt="Fifth Wheel LLC"
      className={`${className} ${tone === 'light' ? 'brightness-0 invert' : ''}`}
    />
  );
}
