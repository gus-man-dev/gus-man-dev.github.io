import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import i18n from '../../../i18n';
import { LanguageSwitcher } from '../switchers/LanguageSwitcher';

describe('LanguageSwitcher', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('shows the current language on the toggle', () => {
    render(<LanguageSwitcher />);

    expect(screen.getByTestId('language-switcher-toggle')).toHaveTextContent('en');
  });

  it('switches the language, persists it and closes the dropdown', async () => {
    render(<LanguageSwitcher />);

    screen.getByTestId('language-switcher').setAttribute('open', '');
    fireEvent.click(screen.getByTestId('language-option-ru'));

    await waitFor(() => expect(i18n.resolvedLanguage).toBe('ru'));
    expect(window.localStorage.getItem('language')).toBe('ru');
    expect(screen.getByTestId('language-switcher')).not.toHaveAttribute('open');
    expect(screen.getByTestId('language-switcher-toggle')).toHaveTextContent('ru');
  });
});
