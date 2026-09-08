import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type UserConfig } from 'vitest/config';

// Vite 8 (rolldown) plugin types don't match the Vite 7 types bundled with
// Vitest yet; the cast bridges the type-level gap only — runtime behavior
// of both the build and the test runner is unaffected.
const plugins = [react(), tailwindcss()] as UserConfig['plugins'];

// https://vite.dev/config/
export default defineConfig({
  plugins,
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false,
    // A fake Web3Forms key so tests exercise the fetch path; the real key
    // lives in .env and never reaches the test environment.
    env: { VITE_WEB3FORMS_ACCESS_KEY: 'test-access-key' },
  },
});
