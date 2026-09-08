import stylistic from '@stylistic/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

/**
 * ESLint here covers ONE concern Prettier refuses to manage and oxlint
 * does not implement: blank lines between logical blocks. Everything
 * else stays with oxlint (correctness) and Prettier (formatting).
 * `npm run lint:fix` inserts the blank lines automatically.
 */
export default [
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { '@stylistic': stylistic },
    rules: {
      '@stylistic/padding-line-between-statements': [
        'error',
        // A return never sticks to the statement above it.
        { blankLine: 'always', prev: '*', next: 'return' },
        // A const/let group is separated from the different-kind statement after it…
        { blankLine: 'always', prev: ['const', 'let'], next: '*' },
        // …but consecutive declarations may stay together.
        { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let'] },
        // Multi-line if blocks breathe on both sides.
        { blankLine: 'always', prev: '*', next: 'if' },
        { blankLine: 'always', prev: 'if', next: '*' },
      ],
    },
  },
];
