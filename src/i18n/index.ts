import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { readStorage, writeStorage } from '../lib/storage';
import en from './locales/en.json';
import ru from './locales/ru.json';

export const SUPPORTED_LANGUAGES = ['en', 'ru'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

function isSupportedLanguage(value: string | null): value is SupportedLanguage {
  return value !== null && (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}

function getInitialLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'en';

  const stored = readStorage('language');

  if (isSupportedLanguage(stored)) return stored;

  return window.navigator.language.startsWith('ru') ? 'ru' : 'en';
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

/**
 * The static index.html is English (`lang="en"`, English <title>) — for a
 * Russian-locale visitor both must follow the resolved language, or screen
 * readers and search engines see Russian content declared as English.
 */
function syncDocumentLanguage(lng: string) {
  document.documentElement.lang = lng;
  document.title = i18n.t('meta.title');
}

i18n.on('languageChanged', (lng) => {
  writeStorage('language', lng);
  syncDocumentLanguage(lng);
});

syncDocumentLanguage(i18n.resolvedLanguage ?? 'en');

export default i18n;
