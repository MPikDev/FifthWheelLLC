import { useId, useState, type ReactNode } from 'react';
import Icon from './Icon';

export interface FaqItem {
  question: string;
  answer: ReactNode;
}

interface FaqAccordionProps {
  items: readonly FaqItem[];
  /** Heading level for each question, to fit the page outline. */
  headingLevel?: 'h2' | 'h3';
}

/**
 * Accessible accordion following the WAI-ARIA pattern: each question is a
 * button inside a heading, with aria-expanded and aria-controls linking it to
 * its answer panel. Works with Tab, Enter and Space.
 */
export default function FaqAccordion({ items, headingLevel: Heading = 'h3' }: FaqAccordionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-q${index}`;
        const panelId = `${baseId}-a${index}`;
        return (
          <div key={item.question}>
            <Heading className="m-0 text-base sm:text-lg">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-5 text-left font-heading font-bold text-navy-900 hover:text-accent-700 sm:px-6"
              >
                <span>{item.question}</span>
                <Icon
                  name="chevronDown"
                  className={`size-5 shrink-0 text-accent-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-6 leading-relaxed text-slate-600 sm:px-6"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
