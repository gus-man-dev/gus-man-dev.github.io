import type { ComponentType, SVGProps } from 'react';
import {
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  TelegramIcon,
  TwitterIcon,
} from '../components/controls/icons';

export const EMAIL = 'romka9876@gmail.com';
export const PHONE_TEL = '+375298590206';
export const PHONE_DISPLAY = '+375 29 859 02 06';

// Only referenced from SOCIAL_LINKS below — not part of the module's API.
const TELEGRAM_HANDLE = 'gus_man';
const LINKEDIN_URL = 'https://linkedin.com/in/roman-gusevski-26b954159';

interface SocialLink {
  href: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** True until a real profile URL is supplied — link is inert (`href="#"`, no navigation). */
  pending?: boolean;
}

const SOCIAL_LINKS: SocialLink[] = [
  { href: `mailto:${EMAIL}`, label: 'Email', Icon: MailIcon },
  { href: `https://t.me/${TELEGRAM_HANDLE}`, label: 'Telegram', Icon: TelegramIcon },
  { href: LINKEDIN_URL, label: 'LinkedIn', Icon: LinkedInIcon },
  { href: 'https://github.com/gus-man-dev', label: 'GitHub', Icon: GitHubIcon },
  { href: 'https://www.instagram.com/gus__man', label: 'Instagram', Icon: InstagramIcon },
  { href: 'https://www.facebook.com/roma.gusevsky', label: 'Facebook', Icon: FacebookIcon },
  { href: '#', label: 'Twitter / X', Icon: TwitterIcon, pending: true },
];

/**
 * What the UI actually renders (Hero, Contact footer): placeholder networks
 * are hidden until real URLs exist — dead-looking grey icons read as broken
 * links. The full list above stays as the single place to paste a URL and
 * flip `pending` off.
 */
export const VISIBLE_SOCIAL_LINKS = SOCIAL_LINKS.filter(({ pending }) => !pending);
