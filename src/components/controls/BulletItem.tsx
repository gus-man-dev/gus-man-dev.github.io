import type { ReactNode } from 'react';

/**
 * List item with the site's accent-dot marker (Experience bullets, Pricing
 * features). Text color is the caller's — the two sections use slightly
 * different slate shades on their backgrounds.
 */
export function BulletItem({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <li className={`flex gap-2 text-sm ${className}`}>
      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
      {children}
    </li>
  );
}
