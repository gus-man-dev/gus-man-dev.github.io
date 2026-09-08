import type { ComponentType, SVGProps } from 'react';
import { useTranslation } from 'react-i18next';
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from '../../../constants/contact';
import { MailIcon, PhoneIcon, PinIcon, Reveal } from '../../controls';

interface ContactInfoItem {
  key: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  href?: string;
}

const INFO_CARD_CLASSES =
  'flex items-center gap-6 rounded-lg bg-white px-8 py-8 shadow-md ring-1 ring-slate-200 transition-colors dark:bg-slate-800/60 dark:ring-slate-700';

/**
 * Address/Email/Phone as three separate cards with large ring-outline
 * icons. Address has no href — plain card; for Email/Phone the WHOLE card
 * is a real link, so clicking anywhere on it opens mailto:/tel:.
 */
export function ContactInfoCards({ inView }: { inView: boolean }) {
  const { t } = useTranslation();

  const infoItems: ContactInfoItem[] = [
    { key: 'address', Icon: PinIcon, label: t('contact.address.label'), value: t('contact.address.value') },
    { key: 'email', Icon: MailIcon, label: t('contact.email.label'), value: EMAIL, href: `mailto:${EMAIL}` },
    { key: 'phone', Icon: PhoneIcon, label: t('contact.phone.label'), value: PHONE_DISPLAY, href: `tel:${PHONE_TEL}` },
  ];

  return (
    <div className="space-y-6">
      {infoItems.map(({ key, Icon, label, value, href }, index) => {
        const content = (
          <>
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-[3px] border-accent text-accent">
              <Icon className="h-7 w-7" />
            </span>
            <div>
              <p
                data-testid={`contact-info-${key}-label`}
                className="text-xl font-semibold text-slate-900 dark:text-white"
              >
                {label}
              </p>
              <p data-testid={`contact-info-${key}-value`} className="text-slate-600 dark:text-slate-300">
                {value}
              </p>
            </div>
          </>
        );

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
  );
}
