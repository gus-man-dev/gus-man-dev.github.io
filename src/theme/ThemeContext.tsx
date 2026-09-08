import { useEffect, useState, type ReactNode } from 'react';
import { readStorage, writeStorage } from '../lib/storage';
import { ThemeContext, type Theme } from './context';

const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)';

function getStoredTheme(): Theme | null {
  const stored = readStorage('theme');

  return stored === 'light' || stored === 'dark' ? stored : null;
}

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';

  return window.matchMedia(DARK_SCHEME_QUERY).matches ? 'dark' : 'light';
}

/**
 * Owns the theme state: toggles the `.dark` class on <html> (which drives
 * Tailwind's repointed dark variant, see index.css).
 *
 * Until the visitor clicks the toggle themselves, the theme follows the
 * browser/OS setting live (including mid-session OS switches). Only an
 * explicit toggle is persisted to localStorage — persisting the derived
 * system value would freeze the first visit's theme forever.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [storedTheme, setStoredTheme] = useState<Theme | null>(getStoredTheme);
  const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme);

  const theme = storedTheme ?? systemTheme;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    if (storedTheme) return;

    const query = window.matchMedia(DARK_SCHEME_QUERY);
    const followSystem = (event: MediaQueryListEvent) => setSystemTheme(event.matches ? 'dark' : 'light');
    query.addEventListener('change', followSystem);
    return () => query.removeEventListener('change', followSystem);
  }, [storedTheme]);

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';

    writeStorage('theme', next);
    setStoredTheme(next);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
