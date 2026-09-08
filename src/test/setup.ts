import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  MockIntersectionObserver.instances.length = 0;
});

/**
 * jsdom has no IntersectionObserver. Components construct observers as
 * usual; tests reach the created instances via `instances` and fire
 * visibility by hand with `intersect()`.
 */
export class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  observed: Element[] = [];
  disconnected = false;

  private readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }

  observe(element: Element): void {
    this.observed.push(element);
  }

  unobserve(): void {}

  disconnect(): void {
    this.disconnected = true;
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  intersect(isIntersecting: boolean): void {
    this.fire([{ isIntersecting }]);
  }

  /** Fires the callback with arbitrary partial entries — for observers that compare targets or ratios. */
  fire(entries: Partial<IntersectionObserverEntry>[]): void {
    this.callback(entries as IntersectionObserverEntry[], this as unknown as IntersectionObserver);
  }
}

globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
