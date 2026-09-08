import type { ComponentType, SVGProps } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from '../../hooks/useInView';
import { CodeIcon, Reveal, SectionContainer, SectionHeading, TargetIcon, UsersIcon } from '../controls';

/**
 * Per-card icon + its own accent color, matched by array index to the
 * i18n `services.items` order (frontend / code quality / leadership) —
 * mirrors the reference template's "What I do" cards where each card
 * carries a differently-colored icon (purple / red / blue), not the
 * site-wide teal accent.
 */
const CARD_META: { Icon: ComponentType<SVGProps<SVGSVGElement>>; iconClasses: string }[] = [
  { Icon: CodeIcon, iconClasses: 'text-red-500 dark:text-red-400' },
  { Icon: TargetIcon, iconClasses: 'text-purple-600 dark:text-purple-400' },
  { Icon: UsersIcon, iconClasses: 'text-blue-600 dark:text-blue-400' },
];

export function Services() {
  const { t } = useTranslation();
  const { ref, inView } = useInView<HTMLDivElement>();

  const items = t('services.items', { returnObjects: true }) as { title: string; description: string }[];

  return (
    <section id="services" className="bg-white dark:bg-slate-900">
      <SectionContainer>
        <SectionHeading>{t('services.heading')}</SectionHeading>

        <div ref={ref} className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const { Icon, iconClasses } = CARD_META[index % CARD_META.length];
            return (
              <Reveal key={item.title} inView={inView} index={index}>
                <div className="h-full rounded-lg bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] ring-1 ring-slate-100 transition-all hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.1)] dark:bg-white/5 dark:shadow-none dark:ring-white/10 dark:hover:bg-white/[0.08]">
                  <Icon aria-hidden="true" className={`h-8 w-8 ${iconClasses}`} />
                  <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="mt-3 text-slate-600 dark:text-slate-300">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
}
