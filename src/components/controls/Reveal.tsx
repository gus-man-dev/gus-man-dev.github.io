import type { ReactNode } from 'react';

interface RevealProps {
  /** Comes from useInView on the surrounding grid — all items share one observer. */
  inView: boolean;
  /** Position in the grid; drives the stagger (`stepMs` per item). */
  index?: number;
  /** Delay between consecutive items. 100ms suits cards; small items like chips read better around 50ms. */
  stepMs?: number;
  children: ReactNode;
}

/**
 * Staggered fade-up wrapper for cards in a section grid. It is a separate
 * node from the card on purpose: the stagger's transitionDelay lives here,
 * so it can't slow down hover transitions defined on the card itself.
 * The transition targets ONLY opacity/transform — `transition-all` would
 * also animate the inherited text color on theme switches, replaying the
 * stagger as a slow cascading recolor.
 * `motion-reduce` renders the content immediately for users who opt out.
 */
export function Reveal({ inView, index = 0, stepMs = 100, children }: RevealProps) {
  return (
    <div
      style={{ transitionDelay: `${index * stepMs}ms` }}
      className={`transition-[opacity,translate] duration-1000 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      {children}
    </div>
  );
}
