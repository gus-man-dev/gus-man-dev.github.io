import { useTranslation } from 'react-i18next';
import { useInView } from '../../hooks/useInView';
import { Reveal, SectionContainer, SectionHeading } from '../controls';

/**
 * Chips are deliberately neutral (slate) with only the category headings
 * in accent — ~40 teal chips in a row diluted the accent color to noise;
 * this way the eye lands on the category names first.
 *
 * On scroll the chips rise into place one after another, each category
 * running its own stagger in parallel (delay is per-chip within a category,
 * not global — a global sequence over ~40 chips would take seconds).
 */
export function Skills() {
  const { t } = useTranslation();
  const { ref, inView } = useInView<HTMLDivElement>();

  const categories = t('skills.categories', { returnObjects: true }) as { name: string; items: string[] }[];

  return (
    <section id="skills" className="bg-slate-50 dark:bg-dark-bg">
      <SectionContainer>
        <SectionHeading>{t('skills.heading')}</SectionHeading>

        <div ref={ref} className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div key={category.name}>
              <h3 className="font-semibold text-accent">{category.name}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {category.items.map((item, itemIndex) => (
                  <Reveal key={item} inView={inView} index={itemIndex} stepMs={50}>
                    <span className="inline-block rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
                      {item}
                    </span>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
