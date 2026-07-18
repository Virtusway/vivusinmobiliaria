# Code Review — Suggested Improvements

Review of the Astro migration of vivusinmobiliaria.com (45 pages, 3 locales). The build passes cleanly, all route `contentFile` entries match files on disk, Netlify form markup is correct (names, honeypot, hidden `form-name`), and the tab-subject wiring on the home pages works. The items below are ordered by impact.

---

## High priority

### 1. Catalan accessibility page points to the English URL
- `src/data/routes.ts:590` and `:638` — the `ca` alternate for both accessibility routes is `"/en/accesibilidad/"`. This emits `<link rel="alternate" hreflang="ca">` pointing at an English page, which is wrong hreflang data.
- `src/data/site.ts:73` — the Catalan footer "Accesibilidad" link also goes to `/en/accesibilidad/`, so a Catalan visitor lands on the English site.
- There is no `ca-accesibilidad.html` at all.

**Fix:** create the Catalan accessibility page, or drop the `ca` key from the alternates (it's `Partial<Record<Locale, string>>`, so omitting it is fine) and point the Catalan footer link wherever you actually want it. Also, the English footer label is the Spanish word "Accesibilidad" (`site.ts:52`) — should be "Accessibility".

### 2. Duplicate home pages: `/` vs `/inicio/` (all three locales)
`es-root.html`/`es-inicio.html`, `en-root.html`/`en-home.html`, and `ca-root.html`/`ca-inici.html` are identical apart from whitespace, and both versions are built, indexed (`index, follow`), given **different canonicals**, and listed in the sitemap. WordPress normally redirects the static-front-page slug to `/`; the migration lost that.

**Fix:** add 301 redirects in `netlify.toml` (`/inicio/ → /`, `/en/home/ → /en/`, `/ca/inici/ → /ca/`) and remove those three routes from `routes.ts`, or at minimum set their `canonicalPath` to the root equivalents and drop them from the sitemap.

### 3. Google Analytics loads without consent (GDPR/LSSI)
`src/layouts/SiteLayout.astro:79-85` runs `gtag('config', 'G-4H3Y9HLZJT')` unconditionally on every page. The site targets Spain and even publishes a cookie policy, but sets analytics cookies before any consent. The old WP site presumably had a consent banner; the migration dropped it.

**Fix:** add a consent banner (or Google Consent Mode v2 with default-denied storage) and only enable analytics after acceptance.

### 4. 404 page is indexable
`src/pages/404.astro` renders through `SiteLayout`, which hardcodes `<meta name="robots" content="index, follow, …">` and a canonical of `/404/`. The thank-you pages (`/gracias/`, `/en/thanks/`, `/ca/gracies/`) are also indexable *and* listed in the sitemap, so Google can index empty "message sent" pages.

**Fix:** add an optional `noindex` flag to `MigratedRoute` / the layout props, set it for the 404 and thanks pages, and exclude thanks (and probably the ad `landing` pages) from `page-sitemap.xml.ts`.

### 5. Lottie script is silently bundled into an Astro module
`SiteLayout.astro:110` — the CDN lottie `<script src="https://cdnjs...">` lacks `is:inline`, so Astro compiles it into `/_astro/SiteLayout...js` whose entire content is `import "https://cdnjs.cloudflare.com/...lottie.min.js"`. It still works (module scripts run before `DOMContentLoaded`), but this is almost certainly unintended: it adds an extra request hop on **every** page while only the three landing pages actually use lottie.

**Fix:** self-host lottie under `/wp-content/themes/vivus/assets/js/libs/` (everything else is already self-hosted) and load it with `is:inline` — ideally only when `route.group === 'landing'`.

---

## Medium priority

### 6. SEO metadata is placeholder-quality
- Nearly every route in `routes.ts` has `description: "Inmobiliaria"` — duplicate one-word meta descriptions across ~40 pages.
- The `en` and `ca` front pages use the Spanish title "Vivus - Inmobiliaria".
- No `og:description`, no `og:image`, and `twitter:card` is `summary_large_image` with no image (`SiteLayout.astro:53-57`).
- No `x-default` hreflang alternate; Google recommends one for multilingual sites (point it at `/`).

### 7. No security headers on Netlify
`netlify.toml` sets cache headers only. Add a headers block for `/*` with at least `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` (or a CSP with `frame-ancestors`), `Referrer-Policy: strict-origin-when-cross-origin`, and a `Permissions-Policy`. Also note the `for = "/*.html"` cache rule never matches in practice — Astro serves pretty URLs (`/conocenos/`), not `.html` paths.

### 8. Render-blocking head
`SiteLayout.astro` loads jQuery synchronously in `<head>` plus 7 render-blocking stylesheets. Quick wins:
- Move the jQuery `<script>` to the end of `<body>` with the rest (nothing in `<head>` needs it), or add `defer` to all the classic scripts (they're all `is:inline` `src` scripts, so ordering with `defer` is preserved).
- Replace `dns-prefetch` for `fonts.googleapis.com` with `preconnect`, and add `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` — that's where the font files actually come from.
- Consider self-hosting the Figtree font entirely.

### 9. Dead code shipped to production
- `SiteLayout.astro:98-108` — the `starter_vars` inline script is a WP leftover; `scripts.js` never reads it. Delete.
- `public/.../js/scripts.js` — roughly half the file (`valForm`, `contactForm`, the captcha/AJAX machinery, lines ~1-300) is never invoked; no page calls `contactForm(...)` anymore since forms are native Netlify POSTs. Trim it, or keep only the UI code (menu, sliders, wow).
- `public/.../js/scripts_bkup.js` (15 KB backup file) and the empty `admin.js` are deployed publicly. Delete.
- Fancybox and Isotope CSS/JS live in `public` but are never referenced by the layout.

---

## Low priority / cleanups

### 10. `routes.ts` redundancy
- `routedPages` (`routes.ts:726`) is a bare alias of `migratedRoutes` — keep one name.
- `canonicalPath` equals `path` on all 44 routes. Either drop the field and use `path`, or keep it only when you introduce the `/inicio/` canonicalization from item 2.
- The file reads like generated output (JSON blobs, `description: "Inmobiliaria"` everywhere). Since `scripts/migrate-wp-pages.mjs` already exists, consider having it emit this data (or a `routes.json`) so hand-edits and regeneration don't fight.

### 11. `NetlifyForm.astro` nits
- `NetlifyForm.astro:67` — `variant.replace(/[A-Z]/g, (l) => l.toLowerCase())` is just `variant.toLowerCase()`.
- The tab form submits two subject fields: the shared hidden `subject` (line 114, always "Nuevo contacto web desde Vivus") and `tabform[subject]` (set by the tab picker). If the Netlify notification subject is meant to reflect the chosen tab, the tab value should go into the `subject` field instead; if it's intentional, a short comment would save the next reader the archaeology.
- The terms/privacy links point to Spanish PDFs (`Condiciones-de-uso.pdf`) for all three locales — fine if no translations exist, but worth confirming.

### 12. Sitemap polish
`page-sitemap.xml.ts` works, but the single-entry `sitemap_index.xml` wrapper only exists to mimic Yoast URLs. Consider adding `<lastmod>`, excluding thanks/landing pages (item 4), and adding hreflang `xhtml:link` entries — or simply pointing `robots.txt` straight at `page-sitemap.xml`.

### 13. Accessibility of migrated markup
The home page content has 10 `<img>` tags, all with `alt=""` — acceptable only if they're truly decorative; the property/location photos likely aren't. The footer contact icons correctly use `alt=""` with adjacent text. Also `htmlLang` for Catalan is `ca` while the language switcher labels it "Valencià" — if you want the Valencian variant specifically, the tag is `ca-valencia`.

---

## What's in good shape

- Clean separation of migrated HTML (`src/content/wp-pages/`) from routing data and layout; `import.meta.glob` + the `NETLIFY_FORM` marker splitting in `WpHtmlPage.astro` is a tidy pattern.
- Netlify form setup is correct: static pre-rendered forms with `data-netlify`, honeypot, per-locale form names, and locale/source-page hidden fields.
- WP attack-surface redirects (`/wp-admin`, `xmlrpc.php`, …) and immutable caching for assets in `netlify.toml`.
- Migration scripts are checked in and re-runnable, and `output/` is gitignored.
- Route data is strictly typed (`satisfies readonly MigratedRoute[]`) and fully consistent with the files on disk (verified: no missing or orphaned content files).
