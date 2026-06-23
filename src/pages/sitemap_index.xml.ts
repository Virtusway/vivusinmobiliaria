import { SITE_URL } from '../data/routes';

export function GET() {
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>${new URL('/page-sitemap.xml', SITE_URL).toString()}</loc>\n  </sitemap>\n</sitemapindex>\n`, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
