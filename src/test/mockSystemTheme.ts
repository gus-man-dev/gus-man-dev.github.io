import { act } from 'react';
import { vi } from 'vitest';

/**
 * Replaces window.matchMedia with a controllable stub: `setSystemDark`
 * plays the role of the OS switching its color scheme mid-session.
 */
export function mockSystemTheme(initialDark: boolean) {
  let matches = initialDark;
  const listeners = new Set<(event: MediaQueryListEvent) => void>();

  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      get matches() {
        return matches;
      },
      addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => listeners.add(listener),
      removeEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) =>
        listeners.delete(listener),
    })),
  );

  return {
    setSystemDark(dark: boolean) {
      matches = dark;
      act(() => {
        listeners.forEach((listener) => listener({ matches: dark } as MediaQueryListEvent));
      });
    },
  };
}
