import { useTranslation } from 'react-i18next';
import ctaBg from '../../assets/images/cta-bg.jpg';
import { useInView } from '../../hooks/useInView';
import { scrollToSection } from '../../utils/scrollToSection';
import { ButtonLink, Reveal } from '../controls';

/**
 * Photo background — a bright, collaborative team shot (distinct from
 * Hero/Experience's code-on-keyboard photo, so this doesn't read as the
 * same section repeated) matching the "let's work together" tone of this
 * CTA. Overlay/text follow the site theme, same as Hero/Experience.
 */
export function CtaBanner() {
  const { t } = useTranslation();
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="cta" className="relative isolate overflow-hidden bg-white dark:bg-slate-900">
      <img
        src={ctaBg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover grayscale-[35%] saturate-75"
      />
      <div className="absolute inset-0 bg-slate-100/70 dark:bg-slate-900/90" />

      <div ref={ref} className="relative mx-auto max-w-3xl px-6 py-16 text-center md:py-20">
        <Reveal inView={inView}>
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">{t('ctaBanner.heading')}</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">{t('ctaBanner.body')}</p>
          <ButtonLink href="#contact" onClick={scrollToSection('contact')} className="mt-8">
            {t('ctaBanner.cta')}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
