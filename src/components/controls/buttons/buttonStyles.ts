export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'success' | 'danger';

// cursor-pointer is explicit: Tailwind v4's preflight leaves buttons with
// the browser default cursor (`default`), unlike v3.
export const BUTTON_BASE_CLASSES =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-colors';

// Primary uses the site accent (#0bceaf teal); the soft accent-tinted
// shadow + darken-on-hover (instead of brighten — white text washes out
// on an even lighter teal) make it read as clickable.
export const BUTTON_VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-white shadow-md shadow-accent/25 hover:bg-[#0ab094] hover:shadow-lg hover:shadow-accent/30',
  secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700',
  outline:
    'border border-slate-300 text-slate-900 hover:bg-slate-50 dark:border-slate-600 dark:text-white dark:hover:bg-slate-800',
  // Outcome states (e.g. "message sent" / "sending failed"): deliberately no
  // hover styles — a status the button briefly turns into, not an action.
  success: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25',
  danger: 'bg-red-600 text-white shadow-md shadow-red-600/25',
};
