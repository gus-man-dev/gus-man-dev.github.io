import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from './ThemeContext';
import { useTheme } from './useTheme';

/**
 * Replaces window.matchMedia with a controllable stub: `setSystemDark`
 * plays the role of the OS switching its color scheme mid-session.
 */
function mockSystemTheme(initialDark: boolean) {
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

function Probe() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button type="button" onClick={toggleTheme}>
      {theme}
    </button>
  );
}

function renderProbe() {
  render(
    <ThemeProvider>
      <Probe />
    </ThemeProvider>,
  );

  return screen.getByRole('button');
}

describe('ThemeProvider', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    document.documentElement.classList.remove('dark');
  });

  it('follows the OS scheme when nothing is stored', () => {
    mockSystemTheme(true);

    const probe = renderProbe();

    expect(probe).toHaveTextContent('dark');
    expect(document.documentElement).toHaveClass('dark');
  });

  it('updates live when the OS scheme changes mid-session', () => {
    const system = mockSystemTheme(false);
    const probe = renderProbe();

    expect(probe).toHaveTextContent('light');

    system.setSystemDark(true);

    expect(probe).toHaveTextContent('dark');
    expect(document.documentElement).toHaveClass('dark');
  });

  it('persists an explicit toggle and stops following the OS', () => {
    const system = mockSystemTheme(false);
    const probe = renderProbe();

    fireEvent.click(probe);

    expect(probe).toHaveTextContent('dark');
    expect(window.localStorage.getItem('theme')).toBe('dark');

    system.setSystemDark(false);

    expect(probe).toHaveTextContent('dark');
  });

  it('honors a choice stored on a previous visit over the OS scheme', () => {
    window.localStorage.setItem('theme', 'dark');
    mockSystemTheme(false);

    expect(renderProbe()).toHaveTextContent('dark');
  });
});
