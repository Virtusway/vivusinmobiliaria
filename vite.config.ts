import { defineConfig } from 'vite-plus';

// Astro builds the site; Vite+ only provides formatting (oxfmt), linting (oxlint) and `vp check`.
// Vendored WordPress assets and the generated page HTML are not ours to format or lint.
const vendoredAndGenerated = ['public/wp-content/**', 'src/content/wp-pages/**'];

export default defineConfig({
  fmt: {
    singleQuote: true,
    ignorePatterns: [
      ...vendoredAndGenerated,
      // The migration and audit scripts JSON.parse the `migratedRoutes` literal, so it must stay JSON.
      'src/data/routes.ts',
    ],
  },
  lint: {
    ignorePatterns: vendoredAndGenerated,
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
    options: { typeAware: true, typeCheck: true },
  },
});
