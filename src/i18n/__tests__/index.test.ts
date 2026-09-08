import { afterEach, describe, expect, it, vi } from 'vitest';

function setBrowserLanguage(language: string) {
  Object.defineProperty(window.navigator, 'language', { configurable: true, value: language });
}

/** The module picks its language at import time, so every case re-imports it fresh. */
async function loadI18n() {
  vi.resetModules();

  return (await import('../index')).default;
}

describe('i18n', () => {
  afterEach(() => {
    vi.resetModules();
  });

  it('prefers the language stored on a previous visit', async () => {
    window.localStorage.setItem('language', 'ru');
    setBrowserLanguage('en-US');

    expect((await loadI18n()).resolvedLanguage).toBe('ru');
  });

  it('falls back to the browser language', async () => {
    setBrowserLanguage('ru-RU');

    expect((await loadI18n()).resolvedLanguage).toBe('ru');
  });

  it('defaults to English for unsupported locales', async () => {
    setBrowserLanguage('de-DE');

    expect((await loadI18n()).resolvedLanguage).toBe('en');
  });

  it('syncs the document language and title on init', async () => {
    setBrowserLanguage('en-US');
    await loadI18n();

    expect(document.documentElement.lang).toBe('en');
    expect(document.title).toBe('Roman Gusevski — CV');
  });

  it('persists a language change and re-syncs the document', async () => {
    setBrowserLanguage('en-US');
    const i18n = await loadI18n();

    await i18n.changeLanguage('ru');

    expect(window.localStorage.getItem('language')).toBe('ru');
    expect(document.documentElement.lang).toBe('ru');
    expect(document.title).toBe('Роман Гусевский — CV');
  });
});
