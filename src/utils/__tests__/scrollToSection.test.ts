import type { MouseEvent } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { scrollToSection } from '../scrollToSection';

function mockClickEvent() {
  return { preventDefault: vi.fn() } as unknown as MouseEvent;
}

describe('scrollToSection', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('scrolls to the section top minus the fixed header offset', () => {
    const target = document.createElement('div');

    target.id = 'about';
    document.body.appendChild(target);
    vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({ top: 500 } as DOMRect);
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 200 });

    const scrollTo = vi.fn();

    vi.stubGlobal('scrollTo', scrollTo);
    const event = mockClickEvent();

    scrollToSection('about')(event);

    expect(event.preventDefault).toHaveBeenCalled();
    // 500 (viewport top) + 200 (scrollY) − 96 (header offset)
    expect(scrollTo).toHaveBeenCalledWith({ top: 604, behavior: 'smooth' });
  });

  it('prevents the default jump but does not scroll when the section is missing', () => {
    const scrollTo = vi.fn();

    vi.stubGlobal('scrollTo', scrollTo);
    const event = mockClickEvent();

    scrollToSection('missing')(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(scrollTo).not.toHaveBeenCalled();
  });
});
