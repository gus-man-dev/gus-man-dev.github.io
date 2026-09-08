import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import '../../../i18n';
import { ThemeProvider } from '../../../theme/ThemeContext';
import { mockSystemTheme } from '../../../test/mockSystemTheme';
import { ThemeToggle } from '../switchers/ThemeToggle';

function renderToggle() {
  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );

  return screen.getByTestId('theme-toggle');
}

describe('ThemeToggle', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    document.documentElement.classList.remove('dark');
  });

  it('shows the sun while the light theme is active', () => {
    mockSystemTheme(false);
    renderToggle();

    expect(screen.getByTestId('theme-icon-sun')).toBeInTheDocument();
    expect(screen.queryByTestId('theme-icon-moon')).not.toBeInTheDocument();
  });

  it('shows the moon after switching to dark', () => {
    mockSystemTheme(false);
    const toggle = renderToggle();

    fireEvent.click(toggle);

    expect(screen.getByTestId('theme-icon-moon')).toBeInTheDocument();
    expect(screen.queryByTestId('theme-icon-sun')).not.toBeInTheDocument();
  });
});
