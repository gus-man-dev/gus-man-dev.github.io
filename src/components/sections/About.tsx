import { useTranslation } from 'react-i18next';
import aboutIllustration from '../../assets/images/about-img.png';
import { useInView } from '../../hooks/useInView';
import { Reveal, SectionContainer, SectionHeading } from '../controls';

export function About() {
  const { t } = useTranslation();
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="about" className="bg-slate-50 dark:bg-dark-bg">
      <SectionContainer className="flex flex-col items-center gap-10 md:flex-row">
        <div ref={ref} className="max-w-xl">
          <Reveal inView={inView}>
            <SectionHeading>{t('about.heading')}</SectionHeading>
            <p className="mt-4 text-slate-600 dark:text-slate-300">{t('about.summary')}</p>
          </Reveal>
        </div>

        <Reveal inView={inView} index={1}>
          <img
            src={aboutIllustration}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="w-full max-w-sm md:max-w-md"
          />
        </Reveal>
      </SectionContainer>
    </section>
  );
}
