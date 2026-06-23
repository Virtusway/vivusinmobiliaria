# Vivus Inmobiliaria Astro Site

Static Astro migration of the former WordPress site in `../public_html`, prepared for Netlify deployment.

## Commands

| Command | Action |
| :-- | :-- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start local development server |
| `pnpm build` | Build the static site to `dist/` |
| `pnpm preview` | Preview the production build locally |

## Deployment

Netlify uses `netlify.toml`:

- Build command: `pnpm build`
- Publish directory: `dist`
- Node version: `22.12.0`

Contact and lead forms use Netlify Forms. Configure notification recipients in the Netlify site dashboard after the first deploy detects the forms.
