import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { mockSystemTheme } from '../../test/mockSystemTheme';
import { ThemeProvider } from '../ThemeContext';
import { useTheme } from '../useTheme';

function CurrentThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button type="button" data-testid="current-theme-button" onClick={toggleTheme}>
      {theme}
    </button>
  );
}

function renderCurrentThemeButton() {
  render(
    <ThemeProvider>
      <CurrentThemeButton />
    </ThemeProvider>,
  );

  return screen.getByTestId('current-theme-button');
}

describe('ThemeProvider', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    document.documentElement.classList.remove('dark');
  });

  it('follows the OS scheme when nothing is stored', () => {
    mockSystemTheme(true);

    const themeButton = renderCurrentThemeButton();

    expect(themeButton).toHaveTextContent('dark');
    expect(document.documentElement).toHaveClass('dark');
  });

  it('updates live when the OS scheme changes mid-session', () => {
    const system = mockSystemTheme(false);
    const themeButton = renderCurrentThemeButton();

    expect(themeButton).toHaveTextContent('light');

    system.setSystemDark(true);

    expect(themeButton).toHaveTextContent('dark');
    expect(document.documentElement).toHaveClass('dark');
  });

  it('persists an explicit toggle and stops following the OS', () => {
    const system = mockSystemTheme(false);
    const themeButton = renderCurrentThemeButton();

    fireEvent.click(themeButton);

    expect(themeButton).toHaveTextContent('dark');
    expect(window.localStorage.getItem('theme')).toBe('dark');

    system.setSystemDark(false);

    expect(themeButton).toHaveTextContent('dark');
  });

  it('honors a choice stored on a previous visit over the OS scheme', () => {
    window.localStorage.setItem('theme', 'dark');
    mockSystemTheme(false);

    expect(renderCurrentThemeButton()).toHaveTextContent('dark');
  });
});
