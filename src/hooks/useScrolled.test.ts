import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { useScrolled } from './useScrolled';

function setScrollY(value: number) {
  Object.defineProperty(window, 'scrollY', { configurable: true, value });
}

function scrollTo(value: number) {
  setScrollY(value);
  act(() => {
    window.dispatchEvent(new Event('scroll'));
  });
}

describe('useScrolled', () => {
  afterEach(() => {
    setScrollY(0);
  });

  it('is false at the top of the page', () => {
    const { result } = renderHook(() => useScrolled());

    expect(result.current).toBe(false);
  });

  it('flips once the page scrolls past the threshold and back', () => {
    const { result } = renderHook(() => useScrolled());

    scrollTo(100);
    expect(result.current).toBe(true);

    scrollTo(10);
    expect(result.current).toBe(false);
  });

  it('honors a custom threshold', () => {
    const { result } = renderHook(() => useScrolled(200));

    scrollTo(150);
    expect(result.current).toBe(false);

    scrollTo(250);
    expect(result.current).toBe(true);
  });
});
