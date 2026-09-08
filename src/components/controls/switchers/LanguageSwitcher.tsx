import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '../../../i18n';
import { GbFlagIcon, RuFlagIcon } from '../icons/flags';

const LANGUAGE_META: Record<SupportedLanguage, { Flag: typeof GbFlagIcon; label: string }> = {
  en: { Flag: GbFlagIcon, label: 'English' },
  ru: { Flag: RuFlagIcon, label: 'Русский' },
};

const FLAG_CLASSES = 'h-3.5 w-5 shrink-0 rounded-[2px]';

/**
 * Base control for switching site language, as a dropdown menu (native
 * <details>/<summary> — accessible and keyboard-operable with no extra JS
 * state for open/close). Ring color follows the site theme — black in
 * light mode, white in dark mode — same as ThemeToggle. Flags are our own
 * SVGs (see flags.tsx), not emoji — emoji flags render with inconsistent
 * vertical metrics across platforms and looked shifted upward in the pill.
 */
export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const current = i18n.resolvedLanguage as SupportedLanguage;
  const CurrentFlag = LANGUAGE_META[current].Flag;

  const selectLanguage = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
    detailsRef.current?.removeAttribute('open');
  };

  return (
    <details ref={detailsRef} data-testid="language-switcher" className="relative">
      <summary
        data-testid="language-switcher-toggle"
        className="flex h-8 cursor-pointer list-none items-center gap-1.5 rounded-full border-2 border-slate-900/60 px-3 text-sm text-slate-700 transition-colors hover:border-slate-900 hover:bg-slate-900/10 dark:border-white/60 dark:text-slate-200 dark:hover:border-white dark:hover:bg-white/10"
        aria-label={t('language.label')}
      >
        <CurrentFlag aria-hidden="true" className={FLAG_CLASSES} />
        <span className="uppercase">{current}</span>
      </summary>

      <div className="absolute right-0 z-10 mt-2 w-36 overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-dark-bg">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const { Flag, label } = LANGUAGE_META[lang];
          return (
            <button
              key={lang}
              type="button"
              data-testid={`language-option-${lang}`}
              onClick={() => selectLanguage(lang)}
              aria-pressed={current === lang}
              className={`flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800 ${
                current === lang ? 'font-medium text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              <Flag aria-hidden="true" className={FLAG_CLASSES} />
              {label}
            </button>
          );
        })}
      </div>
    </details>
  );
}
