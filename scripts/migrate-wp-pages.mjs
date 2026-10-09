#!/usr/bin/env node
/** Refresh every routed WordPress page. Use --from-cache after the live audit. */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = 'https://vivusinmobiliaria.com';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'src/content/wp-pages');
const fromCache = process.argv.includes('--from-cache');
const routeSource = await readFile(join(ROOT, 'src/data/routes.ts'), 'utf8');
const match = routeSource.match(/export const migratedRoutes = (\[[\s\S]*?\]) as const/);
if (!match) throw new Error('Cannot read the route manifest');
const pages = JSON.parse(match[1]).filter((route) => route.sourceUrl);

function extractMain(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  if (!main) throw new Error('Could not find the main content');
  return main[1].trim();
}

function normalizeHtml(html, locale) {
  const privacy = {
    es: '/politica-de-privacidad/',
    en: '/en/privacy-policy/',
    ca: '/ca/politica-de-privacitat/',
  }[locale];

  return html
    // Normalize URL attributes, keeping visible URLs in legal statements intact.
    .replace(/\b(href|src|srcset|data-lottie|style)="([^"]*)"/g, (_, name, value) =>
      `${name}="${value.replaceAll(SITE, '').replaceAll('http://vivusinmobiliaria.com', '')}"`)
    .replace(/<form\b[^>]*\bid="(contactForm|tabForm|rrhhForm)"[^>]*>[\s\S]*?<\/form>\s*<script>[\s\S]*?<\/script>/gi,
      (_, variant) => `<!--NETLIFY_FORM:${variant}-->`)
    .replaceAll('input[name="tabform[subject]"]', 'input[name="subject"]')
    .replaceAll('href="/data_protection_policy.html"', `href="${privacy}"`)
    .replaceAll('href="/va/privacy-policy"', `href="${privacy}"`)
    .replaceAll('https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js', '/wp-content/themes/vivus/assets/js/libs/isotope.pkgd.min.js')
    .replace(/<iframe\b(?![^>]*\btitle=)/g, `<iframe title="${{ es: 'Mapa de la costa valenciana', en: 'Map of the Valencian coast', ca: 'Mapa de la costa valenciana' }[locale]}" loading="lazy"`);
}

await mkdir(OUT_DIR, { recursive: true });
// Prepare everything before writing so a failed fetch cannot leave a partial refresh.
const updates = [];
for (const page of pages) {
  let html;
  if (fromCache) {
    html = await readFile(join(ROOT, '.firecrawl', page.contentFile), 'utf8');
  } else {
    const response = await fetch(page.sourceUrl);
    if (!response.ok) throw new Error(`Failed to fetch ${page.sourceUrl}: ${response.status}`);
    html = await response.text();
  }
  const body = normalizeHtml(extractMain(html), page.locale);
  if (page.group === 'landing' && !body.includes('<!--NETLIFY_FORM:contactForm-->')) {
    console.warn(`Preserved ${page.contentFile}: the live landing page has lost its contact form/content.`);
    continue;
  }
  if (/<form\b/i.test(body)) throw new Error(`Unconverted WordPress form in ${page.contentFile}`);
  updates.push({ file: page.contentFile, body: `${body}\n` });
}
for (const { file, body } of updates) {
  const target = join(OUT_DIR, file);
  const existing = await readFile(target, 'utf8').catch((error) => {
    if (error.code === 'ENOENT') return '';
    throw error;
  });
  const normalized = body.replace(/\r\n/g, '\n').split('\n')
    .map((line) => line.replace(/[ \t]+$/, '').replace(/^[ \t]+/, (indent) => indent.replaceAll('\t', '    ')))
    .join('\n');
  if (existing === normalized) continue;
  await writeFile(target, normalized, 'utf8');
  console.log(`Updated ${file}`);
}
