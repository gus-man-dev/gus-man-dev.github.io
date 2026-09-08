export type ButtonVariant = 'primary' | 'secondary' | 'outline';

// cursor-pointer is explicit: Tailwind v4's preflight leaves buttons with
// the browser default cursor (`default`), unlike v3.
export const BUTTON_BASE_CLASSES =
  'inline-flex cursor-pointer items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-colors';

// Primary uses the site accent (#0bceaf teal); the soft accent-tinted
// shadow + darken-on-hover (instead of brighten — white text washes out
// on an even lighter teal) make it read as clickable.
export const BUTTON_VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-white shadow-md shadow-accent/25 hover:bg-[#0ab094] hover:shadow-lg hover:shadow-accent/30',
  secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700',
  outline:
    'border border-slate-300 text-slate-900 hover:bg-slate-50 dark:border-slate-600 dark:text-white dark:hover:bg-slate-800',
};
