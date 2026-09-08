import type { ReactNode } from 'react';

/**
 * Unified section heading: a short accent bar above the title, always
 * left-aligned — one consistent pattern across sections instead of the
 * earlier mix of centered and left-aligned headings.
 */
export function SectionHeading({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <div className="mb-4 h-1 w-10 rounded-full bg-accent" aria-hidden="true" />
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{children}</h2>
    </div>
  );
}
