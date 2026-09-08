import { useTranslation } from 'react-i18next';
import { useActiveSection } from '../../../hooks/useActiveSection';
import { useScrolled } from '../../../hooks/useScrolled';
import { useTheme } from '../../../theme/useTheme';
import { scrollToSection } from '../../../utils/scrollToSection';
import { LanguageSwitcher, Logo, ThemeToggle } from '../../controls';
import { NAV_IDS, VISIBLE_NAV_ITEMS } from './constants';

/**
 * Fixed. Transparent over the Hero photo — once scrolled past Hero it
 * switches to a solid bar. Styling follows the site theme via `dark:`
 * classes like every other component; the JS theme value is only needed
 * for Logo, which swaps between two image assets.
 */
export function Header() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const scrolled = useScrolled();
  const activeId = useActiveSection(NAV_IDS);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-20 transition-colors ${
        scrolled ? 'bg-white shadow-md dark:bg-dark-bg' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-7">
        <a href="#home" onClick={scrollToSection('home')} aria-label={t('hero.name')}>
          <Logo onDark={theme === 'dark'} className="h-10 w-10" />
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {VISIBLE_NAV_ITEMS.map((item) => {
            const isActive = activeId === item.href.slice(1);
            return (
              <a
                key={item.key}
                href={item.href}
                onClick={scrollToSection(item.href.slice(1))}
                className={`border-b-2 pb-1 text-lg font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-200 dark:hover:text-white ${
                  isActive ? 'border-accent' : 'border-transparent'
                }`}
              >
                {t(`nav.${item.key}`)}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
