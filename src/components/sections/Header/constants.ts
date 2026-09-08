import { sectionFlags } from '../../../config/sections';

const NAV_ITEMS = [
  { key: 'home', href: '#home', flag: 'hero' as const },
  { key: 'about', href: '#about', flag: 'about' as const },
  { key: 'skills', href: '#skills', flag: 'skills' as const },
  { key: 'experience', href: '#experience', flag: 'experience' as const },
  { key: 'pricing', href: '#pricing', flag: 'pricing' as const },
  { key: 'contact', href: '#contact', flag: 'contact' as const },
];

export const VISIBLE_NAV_ITEMS = NAV_ITEMS.filter((item) => sectionFlags[item.flag]);

// Stable reference — useActiveSection re-creates its observer when the ids array changes.
export const NAV_IDS = VISIBLE_NAV_ITEMS.map((item) => item.href.slice(1));
