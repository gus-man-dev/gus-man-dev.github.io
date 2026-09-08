import { useTranslation } from 'react-i18next';
import { SOCIAL_LINKS } from '../../../constants/contact';
import { SocialIconLink } from '../../controls';

/** The page footer (copyright + social icons), merged into the bottom of the Contact section. */
export function ContactFooter() {
  const { t } = useTranslation();

  return (
    <div className="mt-14 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between">
      <span data-testid="footer-copyright" className="text-sm text-slate-500 dark:text-slate-400">
        {t('footer.rights')} {t('hero.name')} @ {new Date().getFullYear()}
      </span>

      <div className="flex gap-3">
        {SOCIAL_LINKS.map((link) => (
          <SocialIconLink
            key={link.label}
            {...link}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition-colors hover:border-accent hover:bg-accent hover:text-white dark:border-slate-600 dark:text-slate-300"
            iconClassName="h-4 w-4"
          />
        ))}
      </div>
    </div>
  );
}
