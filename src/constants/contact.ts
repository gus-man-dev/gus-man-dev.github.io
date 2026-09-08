import type { ComponentType, SVGProps } from 'react';
import {
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  TelegramIcon,
} from '../components/controls/icons';

export const EMAIL = 'romka9876@gmail.com';
export const PHONE_TEL = '+375298590206';
export const PHONE_DISPLAY = '+375 29 859 02 06';

/**
 * Web3Forms access key (web3forms.com), from .env — see .env.example.
 * Public by design (it only says where to deliver; spam is filtered by
 * the honeypot), but kept out of git so it can change without a commit.
 * While unset, the contact form falls back to a mailto: link.
 */
export const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '';

// Only referenced from SOCIAL_LINKS below — not part of the module's API.
const TELEGRAM_HANDLE = 'gus_man';
const LINKEDIN_URL = 'https://linkedin.com/in/roman-gusevski-26b954159';

interface SocialLink {
  href: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { href: `mailto:${EMAIL}`, label: 'Email', Icon: MailIcon },
  { href: `https://t.me/${TELEGRAM_HANDLE}`, label: 'Telegram', Icon: TelegramIcon },
  { href: LINKEDIN_URL, label: 'LinkedIn', Icon: LinkedInIcon },
  { href: 'https://github.com/gus-man-dev', label: 'GitHub', Icon: GitHubIcon },
  { href: 'https://www.instagram.com/gus__man', label: 'Instagram', Icon: InstagramIcon },
  { href: 'https://www.facebook.com/roma.gusevsky', label: 'Facebook', Icon: FacebookIcon },
];
