import type { ComponentType, FormEvent, SVGProps } from 'react';
import { useTranslation } from 'react-i18next';
import contactMap from '../../assets/images/contact-map.png';
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, VISIBLE_SOCIAL_LINKS } from '../../constants/contact';
import { useInView } from '../../hooks/useInView';
import { Button, MailIcon, PhoneIcon, PinIcon, Reveal, SectionHeading, SocialIconLink } from '../controls';

interface ContactInfoItem {
  key: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  href?: string;
}

const INPUT_CLASSES =
  'w-full rounded-md border border-slate-300 bg-transparent px-4 py-2.5 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent dark:border-slate-600 dark:text-white dark:placeholder:text-slate-400';

const INFO_CARD_CLASSES =
  'flex items-center gap-6 rounded-lg bg-white px-8 py-8 shadow-md ring-1 ring-slate-200 transition-colors dark:bg-slate-800/60 dark:ring-slate-700';

/**
 * There is no backend to receive the form — submitting hands the message
 * off to the visitor's mail client via a prefilled mailto: link, an honest
 * pattern for a static site with no server.
 */
function buildMailtoHref(form: HTMLFormElement): string {
  const fields = new FormData(form);
  const name = `${fields.get('firstName')} ${fields.get('lastName')}`.trim();

  const subject = encodeURIComponent(`Message from ${name}`);
  const body = encodeURIComponent(`${fields.get('message')}\n\n— ${name} (${fields.get('email')})`);

  return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
}

/**
 * "Contact Me" block from the Maha reference: Address/Email/Phone as three
 * separate cards (not one shared block) with large ring-outline icons, and
 * a message form with First/Last name split. The page footer (copyright +
 * social icons) is merged into the bottom of this full-height section.
 */
export function Contact() {
  const { t } = useTranslation();
  const { ref, inView } = useInView<HTMLDivElement>();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.location.href = buildMailtoHref(event.currentTarget);
  }

  const infoItems: ContactInfoItem[] = [
    { key: 'address', Icon: PinIcon, label: t('contact.address.label'), value: t('contact.address.value') },
    { key: 'email', Icon: MailIcon, label: t('contact.email.label'), value: EMAIL, href: `mailto:${EMAIL}` },
    { key: 'phone', Icon: PhoneIcon, label: t('contact.phone.label'), value: PHONE_DISPLAY, href: `tel:${PHONE_TEL}` },
  ];

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
          <div className="space-y-6">
            {infoItems.map(({ key, Icon, label, value, href }, index) => {
              const content = (
                <>
                  <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-[3px] border-accent text-accent">
                    <Icon className="h-7 w-7" />
                  </span>
                  <div>
                    <p className="text-xl font-semibold text-slate-900 dark:text-white">{label}</p>
                    <p className="text-slate-600 dark:text-slate-300">{value}</p>
                  </div>
                </>
              );

              // Address has no href — plain card. Email/Phone: the whole card
              // is a real link (not just the value text) so clicking anywhere
              // on it opens mailto:/tel:.
              return (
                <Reveal key={key} inView={inView} index={index}>
                  {href ? (
                    <a href={href} className={`${INFO_CARD_CLASSES} hover:ring-accent`}>
                      {content}
                    </a>
                  ) : (
                    <div className={INFO_CARD_CLASSES}>{content}</div>
                  )}
                </Reveal>
              );
            })}
          </div>

          <Reveal inView={inView} index={1}>
            <form onSubmit={handleSubmit} className="flex h-full flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-first-name" className="sr-only">
                    {t('contact.form.firstName')}
                  </label>
                  <input
                    id="contact-first-name"
                    name="firstName"
                    type="text"
                    required
                    placeholder={t('contact.form.firstName')}
                    className={INPUT_CLASSES}
                  />
                </div>
                <div>
                  <label htmlFor="contact-last-name" className="sr-only">
                    {t('contact.form.lastName')}
                  </label>
                  <input
                    id="contact-last-name"
                    name="lastName"
                    type="text"
                    required
                    placeholder={t('contact.form.lastName')}
                    className={INPUT_CLASSES}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-email" className="sr-only">
                  {t('contact.form.email')}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder={t('contact.form.emailPlaceholder')}
                  className={INPUT_CLASSES}
                />
              </div>

              <div className="flex flex-1 flex-col">
                <label htmlFor="contact-message" className="sr-only">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  placeholder={t('contact.form.messagePlaceholder')}
                  className={`${INPUT_CLASSES} flex-1 resize-none`}
                />
              </div>

              <Button type="submit" className="mt-2 w-full">
                {t('contact.form.submit')}
              </Button>
            </form>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {t('footer.rights')} {t('hero.name')} @ {new Date().getFullYear()}
          </span>

          <div className="flex gap-3">
            {VISIBLE_SOCIAL_LINKS.map((link) => (
              <SocialIconLink
                key={link.label}
                {...link}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition-colors hover:border-accent hover:bg-accent hover:text-white dark:border-slate-600 dark:text-slate-300"
                iconClassName="h-4 w-4"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
