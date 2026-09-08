import type { MouseEvent } from 'react';

const HEADER_OFFSET = 96;

/**
 * Programmatic scroll to a section, offset for the fixed header (native
 * `href="#id"` jumps would land the section right under the header and
 * hide it). Native `scrollTo({behavior: 'smooth'})` — no custom animation
 * or artificial duration/delay on top of it.
 */
export function scrollToSection(id: string) {
  return (event: MouseEvent) => {
    event.preventDefault();

    const target = document.getElementById(id);

    if (!target) return;

    const targetY = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };
}
