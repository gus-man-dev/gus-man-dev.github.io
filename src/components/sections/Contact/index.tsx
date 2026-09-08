import { useTranslation } from 'react-i18next';
import contactMap from '../../../assets/images/contact-map.png';
import { useInView } from '../../../hooks/useInView';
import { Reveal, SectionHeading } from '../../controls';
import { ContactFooter } from './ContactFooter';
import { ContactForm } from './ContactForm';
import { ContactInfoCards } from './ContactInfoCards';

/**
 * "Contact Me" block from the Maha reference: info cards on the left, the
 * message form on the right, the page footer merged into the bottom of
 * this full-height section. Composition only — each piece lives in its
 * own file next to this one.
 */
export function Contact() {
  const { t } = useTranslation();
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section
      id="contact"
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-slate-50 dark:bg-slate-900"
    >
      <img
        src={contactMap}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40 dark:opacity-15"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-24">
        <SectionHeading>{t('contact.heading')}</SectionHeading>

        <div ref={ref} className="mt-12 grid gap-10 md:grid-cols-2">
          <ContactInfoCards inView={inView} />

          <Reveal inView={inView} index={1}>
            <ContactForm />
          </Reveal>
        </div>

        <ContactFooter />
      </div>
    </section>
  );
}
