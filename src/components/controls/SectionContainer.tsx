import type { ReactNode } from 'react';

/**
 * The standard section content wrapper: centered, max-w-6xl, px-6 py-16.
 * Sections with different geometry (Contact's py-24, CtaBanner's max-w-3xl)
 * keep their own wrapper — overriding these classes via className would be
 * an order-dependent Tailwind conflict, not an extension.
 */
export function SectionContainer({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto max-w-6xl px-6 py-16 ${className}`}>{children}</div>;
}
