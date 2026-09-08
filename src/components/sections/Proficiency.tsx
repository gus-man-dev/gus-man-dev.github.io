import { useTranslation } from 'react-i18next';
import { useInView } from '../../hooks/useInView';
import { SectionContainer } from '../controls';

interface Bar {
  name: string;
  percent: number;
}

/**
 * SVG ring: stroke-dasharray trick, accent-colored arc over a muted track.
 * The arc animates from empty to `percent` when the section scrolls into
 * view (`animate` flag), via a CSS transition on stroke-dashoffset.
 */
function SkillRing({ name, percent, animate }: Bar & { animate: boolean }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);

  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth="8"
          className="stroke-slate-200 dark:stroke-slate-700"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animate ? offset : circumference}
          className="stroke-accent transition-[stroke-dashoffset] duration-1000 ease-out motion-reduce:transition-none"
        />
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="central"
          className="rotate-90 fill-slate-900 text-[22px] font-semibold dark:fill-white"
          style={{ transformOrigin: '50px 50px' }}
        >
          {percent}%
        </text>
      </svg>
      <span className="text-sm text-slate-600 dark:text-slate-300">{name}</span>
    </div>
  );
}

/** Horizontal bar variant of the same fill-on-scroll animation. */
function SkillBar({ name, percent, animate }: Bar & { animate: boolean }) {
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span className="text-slate-700 dark:text-slate-200">{name}</span>
        <span className="text-slate-500 dark:text-slate-400">{percent}%</span>
      </div>
      <div className="mt-1.5 h-2 rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className="h-2 rounded-full bg-accent transition-[width] duration-1000 ease-out motion-reduce:transition-none"
          style={{ width: animate ? `${percent}%` : '0%' }}
        />
      </div>
    </div>
  );
}

/**
 * "Technical Skills" (bars) + "Professional Skills" (rings). The
 * percentages are the author's own rough self-estimate, grounded in
 * years/depth of use from the real CV — not exact science, and flagged
 * as such in the on-page disclaimer.
 */
export function Proficiency() {
  const { t } = useTranslation();
  const { ref, inView } = useInView<HTMLDivElement>();

  const technical = t('proficiency.technical', { returnObjects: true }) as Bar[];
  const professional = t('proficiency.professional', { returnObjects: true }) as Bar[];

  return (
    <section id="proficiency" className="bg-white dark:bg-dark-bg">
      <SectionContainer>
        <div ref={ref} className="grid gap-16 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('proficiency.technicalHeading')}</h2>
            <div className="mt-8 space-y-5">
              {technical.map((skill) => (
                <SkillBar key={skill.name} {...skill} animate={inView} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {t('proficiency.professionalHeading')}
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-6">
              {professional.map((skill) => (
                <SkillRing key={skill.name} {...skill} animate={inView} />
              ))}
            </div>
          </div>
        </div>

        <p className="mt-10 text-xs text-slate-400 dark:text-slate-500">{t('proficiency.disclaimer')}</p>
      </SectionContainer>
    </section>
  );
}
