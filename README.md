# Vivus Inmobiliaria Astro Site

Static Astro migration of [vivusinmobiliaria.com](https://vivusinmobiliaria.com/), prepared for Netlify deployment. See [MIGRATION.md](MIGRATION.md) for the comparison, verified behavior, and deployment checks.

## Commands

| Command                       | Action                                                              |
| :---------------------------- | :------------------------------------------------------------------ |
| `pnpm install`                | Install dependencies                                                |
| `pnpm dev`                    | Start local development server                                      |
| `pnpm check`                  | Check formatting, lint, and Astro and TypeScript types              |
| `pnpm lint`                   | Lint with Oxlint through Vite+ (`vp lint`)                          |
| `pnpm fmt`                    | Format with Oxfmt through Vite+ (`vp fmt`)                          |
| `pnpm build`                  | Check types and build the static site to `dist/`                    |
| `pnpm preview`                | Preview the production build locally                                |
| `pnpm audit:migration`        | Check built pages, assets, internal links, forms, SEO and redirects |
| `pnpm audit:migration --live` | Also compare all source pages with the live WordPress site          |

Formatting and linting use [Vite+](https://viteplus.dev/) (`vp fmt` with Oxfmt and `vp lint` with Oxlint), configured in `vite.config.ts`. Astro still runs the dev server and build. The formatter skips `src/data/routes.ts`, because the migration and audit scripts parse its route list as JSON.

Python 3.11 or newer is required for the audit. Live HTML and the JSON comparison report are stored under `.firecrawl/`, which is ignored by Git.

To refresh content, run the live audit first, then `node scripts/migrate-wp-pages.mjs --from-cache`, `node scripts/download-uploads.mjs`, and `pnpm build`. The refresh uses `src/data/routes.ts` as its manifest, preserves Netlify form markers and tab subjects, repairs known policy links, and leaves complete landing pages intact if their live counterparts have lost their forms. Generated HTML uses consistent whitespace. Use `pnpm audit:migration --cached` to check the result against the same source snapshot.

## Deployment

Netlify uses `netlify.toml`:

- Build command: `pnpm build`
- Publish directory: `dist`
- Node version: `24`. Vite+ (`vp`) requires Node `^22.18.0`, `^24.11.0` or `>=26.0.0`.

Contact and lead forms use Netlify Forms. Enable form detection for the Netlify site and configure notification recipients after the first deploy detects the forms. The WordPress forms used `crm@virtusway.com`; configure that address to preserve existing delivery. Set up notifications for all detected form names, including the three languages and recruitment forms. Test an actual submission after deployment; the local Astro preview cannot deliver email.
