import { migratedRoutes, SITE_URL } from '../data/routes';

export function GET() {
  const lastmod = new Date().toISOString().slice(0, 10);

  const urls = migratedRoutes
    .filter((route) => !route.noindex)
    .map((route) => {
      const alternates = Object.entries(route.alternates)
        .map(
          ([locale, href]) =>
            `\n    <xhtml:link rel="alternate" hreflang="${locale}" href="${new URL(href, SITE_URL).toString()}" />`
        )
        .join('');

      return `  <url>\n    <loc>${new URL(route.path, SITE_URL).toString()}</loc>\n    <lastmod>${lastmod}</lastmod>${alternates}\n  </url>`;
    })
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    }
  );
}
