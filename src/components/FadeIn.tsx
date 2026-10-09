import { useEffect, useRef, type ElementType, type ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  className?: string;
  /** Delay in ms, for staggering items in a grid. */
  delay?: number;
  as?: ElementType;
}

/**
 * Gently fades content in as it scrolls into view. The hidden starting state
 * only applies when the visitor hasn't asked for reduced motion (see the
 * `.fade-in` rules in index.css).
 */
export default function FadeIn({ children, className = '', delay = 0, as: Tag = 'div' }: FadeInProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Older browsers without IntersectionObserver: just show the content.
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`fade-in ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  );
}
