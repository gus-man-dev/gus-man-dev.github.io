/**
 * The only place that touches window.localStorage. Consumers (theme, i18n)
 * refer to keys by name from the registry below — no raw key strings at
 * call sites, no collisions.
 *
 * Every access is wrapped in try/catch because localStorage can throw on
 * access itself, not just on write: Chrome with cookies blocked raises a
 * SecurityError, old Safari private mode throws on setItem. Persistence is
 * a nice-to-have — the site must still render for those visitors.
 */
const STORAGE_KEYS = {
  theme: 'theme',
  language: 'language',
} as const;

type StorageKey = keyof typeof STORAGE_KEYS;

export function readStorage(key: StorageKey): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEYS[key]);
  } catch {
    return null;
  }
}

export function writeStorage(key: StorageKey, value: string): void {
  try {
    window.localStorage.setItem(STORAGE_KEYS[key], value);
  } catch {
    // Storage unavailable — the choice just won't survive a reload.
  }
}
