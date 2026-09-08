import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../theme/useTheme';
import { MoonIcon, SunIcon } from '../icons';

/**
 * Base control for the light/dark theme toggle. The icon shows the
 * CURRENT theme (sun while light, moon while dark) — the adjacent
 * LanguageSwitcher displays the current language, and the two controls
 * must share one metaphor; the aria-label still describes the action.
 * Ring color follows the site theme. Uses solid SVG icons (not emoji) so
 * they inherit currentColor reliably — background stays transparent like
 * LanguageSwitcher, just a subtle tint on hover.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      data-testid="theme-toggle"
      aria-label={t(isDark ? 'theme.toggleToLight' : 'theme.toggleToDark')}
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-slate-900/60 text-sm transition-colors hover:border-slate-900 hover:bg-slate-900/10 dark:border-white/60 dark:hover:border-white dark:hover:bg-white/10"
    >
      {isDark ? (
        <MoonIcon data-testid="theme-icon-moon" className="h-4 w-4 text-indigo-400" />
      ) : (
        <SunIcon data-testid="theme-icon-sun" className="h-4 w-4 text-amber-500" />
      )}
    </button>
  );
}
