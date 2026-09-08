import { useTranslation } from 'react-i18next';
import experienceBg from '../../assets/images/experience-bg.jpg';
import { useInView } from '../../hooks/useInView';
import { BulletItem, Reveal, SectionContainer, SectionHeading } from '../controls';

interface ExperienceItem {
  company: string;
  role: string;
  start: string;
  end: string;
  meta: string;
  bullets: string[];
  stack: string[];
}

/**
 * Two-column grid of compact cards — trimmed to 2 bullets and ~5 stack tags
 * per role so cards stay balanced side by side instead of one long single
 * column of increasingly detailed entries. Photo background is a dark
 * close-up of code on screen (distinct from Hero's hands-on-keyboard
 * photo), tonally matching this section's technical content. Overlay
 * follows the site theme (white wash in light mode, dark wash in dark
 * mode), same as Hero.
 */
export function Experience() {
  const { t } = useTranslation();
  const { ref, inView } = useInView<HTMLDivElement>();

  const items = t('experience.items', { returnObjects: true }) as ExperienceItem[];

  return (
    <section id="experience" className="relative isolate overflow-hidden bg-white dark:bg-slate-900">
      <img
        src={experienceBg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover grayscale-[35%] saturate-75"
      />
      <div className="absolute inset-0 bg-slate-100/70 dark:bg-slate-900/90" />

      <SectionContainer className="relative">
        <SectionHeading>{t('experience.heading')}</SectionHeading>

        {/* Cards are near-opaque so the photo reads between them, not through
            the text; staggered fade-up on first scroll into view. */}
        <div ref={ref} className="mt-8 grid gap-6 md:grid-cols-2">
          {items.map((item, index) => (
            <Reveal key={item.company + item.start} inView={inView} index={index}>
              <div className="h-full rounded-lg bg-white/85 p-6 backdrop-blur-sm ring-1 ring-slate-200/60 dark:bg-slate-900/70 dark:ring-white/10">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {item.role} <span className="text-accent">{item.company}</span>
                  </h3>
                  <span className="text-sm text-accent">
                    {item.start} – {item.end === 'present' ? t('experience.present') : item.end}
                  </span>
                </div>
                <p className="mt-1 text-xs italic text-slate-500 dark:text-slate-400">{item.meta}</p>

                <ul className="mt-4 space-y-1.5">
                  {item.bullets.map((bullet) => (
                    <BulletItem key={bullet} className="text-slate-700 dark:text-slate-300">
                      {bullet}
                    </BulletItem>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 dark:bg-white/10 dark:text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
