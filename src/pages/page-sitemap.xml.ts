import { routedPages, SITE_URL } from '../data/routes';

export function GET() {
  const urls = routedPages
    .map((route) => `  <url>\n    <loc>${new URL(route.path, SITE_URL).toString()}</loc>\n  </url>`)
    .join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
