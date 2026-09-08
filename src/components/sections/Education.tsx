import { useTranslation } from 'react-i18next';
import { useInView } from '../../hooks/useInView';
import { Reveal, SectionContainer, SectionHeading } from '../controls';

interface LanguageItem {
  name: string;
  level: string;
}

const CARD_CLASSES = 'rounded-lg bg-slate-50 p-6 ring-1 ring-slate-200 dark:bg-slate-800/60 dark:ring-slate-700';

/**
 * Education (left) and Languages (right) as two matching cards in one
 * section — the real CV has a single education entry and two languages
 * (no fabricated multi-entry padding, unlike the reference template's
 * repeated demo cards).
 */
export function Education() {
  const { t } = useTranslation();
  const { ref, inView } = useInView<HTMLDivElement>();

  const languages = t('languages.items', { returnObjects: true }) as LanguageItem[];

  return (
    <section id="education" className="bg-white dark:bg-slate-900">
      <SectionContainer>
        <div ref={ref} className="grid gap-10 md:grid-cols-2">
          <Reveal inView={inView}>
            <div className="flex h-full flex-col">
              <SectionHeading>{t('education.heading')}</SectionHeading>
              <div className={`mt-6 flex-1 ${CARD_CLASSES}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {t('education.degree')} <span className="text-accent">{t('education.school')}</span>
                  </h3>
                  <span className="text-sm text-accent">{t('education.years')}</span>
                </div>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{t('education.description')}</p>
              </div>
            </div>
          </Reveal>

          <Reveal inView={inView} index={1}>
            <div className="flex h-full flex-col">
              <SectionHeading>{t('languages.heading')}</SectionHeading>
              <div className={`mt-6 flex-1 space-y-4 ${CARD_CLASSES}`}>
                {languages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between gap-x-3">
                    <span className="font-semibold text-slate-900 dark:text-white">{lang.name}</span>
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-sm text-accent">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </SectionContainer>
    </section>
  );
}
