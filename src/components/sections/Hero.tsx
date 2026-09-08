import { useTranslation } from 'react-i18next';
import heroBg from '../../assets/images/hero-bg-2.jpg';
import profilePhoto from '../../assets/images/profile.jpg';
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, SOCIAL_LINKS } from '../../constants/contact';
import { CV_PDF_PATH } from '../../constants/personal';
import { useInView } from '../../hooks/useInView';
import { ButtonLink, DownloadIcon, MailIcon, PhoneIcon, PinIcon, Reveal, SocialIconLink } from '../controls';

/**
 * Background photo stays, but the overlay/text/border colors follow the
 * site theme — a white wash in light mode, a dark wash in dark mode —
 * rather than being permanently dark regardless of theme.
 */
export function Hero() {
  const { t } = useTranslation();
  // Hero is on screen at load, so the observer fires right after mount —
  // the same Reveal machinery doubles as the page's entrance animation.
  // Each line carries its own index, so the copy builds up line by line;
  // the photo animates in parallel with the first lines rather than after
  // all of them (on mobile it sits above the text).
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-white dark:bg-slate-900"
    >
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover grayscale-[35%] saturate-75"
      />
      {/* Gradient wash: denser on the left where the text sits, thinning to
          the right so the photo stays visible without fighting the copy. */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-100/95 via-slate-100/75 to-slate-100/45 dark:from-slate-900/95 dark:via-slate-900/80 dark:to-slate-900/60" />

      <div
        ref={ref}
        className="relative mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-10 px-6 pt-24 pb-16 md:flex-row md:justify-between"
      >
        <div className="max-w-xl text-center md:text-left">
          <Reveal inView={inView}>
            <span className="inline-block rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px] rounded-bl-none bg-accent px-7 py-2.5 text-sm font-medium text-white">
              {t('hero.greeting')}
            </span>
          </Reveal>

          <Reveal inView={inView} index={1}>
            <h1 data-testid="hero-name" className="mt-4 text-4xl font-bold text-slate-900 md:text-5xl dark:text-white">
              {t('hero.name')}
            </h1>
          </Reveal>
          <Reveal inView={inView} index={2}>
            <p data-testid="hero-title" className="mt-2 text-xl text-slate-700 dark:text-slate-200">
              {t('hero.title')}
            </p>
          </Reveal>

          <div className="mt-4 flex flex-col gap-1.5 text-sm text-slate-600 dark:text-slate-300">
            <Reveal inView={inView} index={3}>
              <p data-testid="hero-location" className="flex items-center justify-center gap-2 md:justify-start">
                <PinIcon className="h-4 w-4 shrink-0" />
                {t('hero.location')}
              </p>
            </Reveal>
            <Reveal inView={inView} index={4}>
              <a
                href={`mailto:${EMAIL}`}
                data-testid="hero-email"
                className="flex items-center justify-center gap-2 hover:text-slate-900 md:justify-start dark:hover:text-white"
              >
                <MailIcon className="h-4 w-4 shrink-0" />
                {EMAIL}
              </a>
            </Reveal>
            <Reveal inView={inView} index={5}>
              <a
                href={`tel:${PHONE_TEL}`}
                data-testid="hero-phone"
                className="flex items-center justify-center gap-2 hover:text-slate-900 md:justify-start dark:hover:text-white"
              >
                <PhoneIcon className="h-4 w-4 shrink-0" />
                {PHONE_DISPLAY}
              </a>
            </Reveal>
          </div>

          <Reveal inView={inView} index={6}>
            <div className="mt-5 flex flex-wrap justify-center gap-4 md:justify-start">
              {SOCIAL_LINKS.map((link) => (
                <SocialIconLink
                  key={link.label}
                  {...link}
                  className="flex h-9 w-9 items-center justify-center rounded-[3px] text-slate-700 transition-colors hover:bg-slate-900 hover:text-accent dark:text-white dark:hover:bg-white"
                  iconClassName="h-5 w-5"
                />
              ))}
            </div>
          </Reveal>

          <Reveal inView={inView} index={7}>
            <ButtonLink href={CV_PDF_PATH} download data-testid="hero-download-cv" className="mt-8 gap-2">
              {t('hero.downloadCv')}
              <DownloadIcon className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal inView={inView} index={2}>
          <div className="rounded-full border-[20px] border-slate-400/15 dark:border-black/90">
            <div className="h-64 w-64 overflow-hidden rounded-full border-[20px] border-slate-400/30 shadow-lg md:h-80 md:w-80 dark:border-black/40">
              <img src={profilePhoto} alt={t('hero.name')} className="h-full w-full object-cover" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
