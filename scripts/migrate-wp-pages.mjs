#!/usr/bin/env node
/**
 * Extracts page body HTML from the live WordPress site and writes wp-pages content files.
 * Usage: node scripts/migrate-wp-pages.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = 'https://vivusinmobiliaria.com';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'src/content/wp-pages');

const pages = [
  { url: `${SITE}/`, file: 'es-root.html' },
  { url: `${SITE}/inicio/`, file: 'es-inicio.html' },
  { url: `${SITE}/en/`, file: 'en-root.html' },
  { url: `${SITE}/en/home/`, file: 'en-home.html' },
  { url: `${SITE}/ca/`, file: 'ca-root.html' },
  { url: `${SITE}/ca/inici/`, file: 'ca-inici.html' },
  {
    url: `${SITE}/guia-de-inversion-y-estilo-de-vida/`,
    file: 'es-guia-de-inversion-y-estilo-de-vida.html',
  },
  {
    url: `${SITE}/servicios-inmobiliarios-360/`,
    file: 'es-servicios-inmobiliarios-360.html',
  },
  {
    url: `${SITE}/accesibilidad/`,
    file: 'es-accesibilidad.html',
  },
  {
    url: `${SITE}/en/investment-and-lifestyle-guide/`,
    file: 'en-investment-and-lifestyle-guide.html',
  },
  {
    url: `${SITE}/en/360o-real-estate-services/`,
    file: 'en-360o-real-estate-services.html',
  },
  {
    url: `${SITE}/en/accesibilidad/`,
    file: 'en-accesibilidad.html',
  },
  {
    url: `${SITE}/ca/guia-dinversio-i-estil-de-vida/`,
    file: 'ca-guia-dinversio-i-estil-de-vida.html',
  },
  {
    url: `${SITE}/ca/serveis-immobiliaris-360/`,
    file: 'ca-serveis-immobiliaris-360.html',
  },
];

function extractMain(html) {
  const start = html.indexOf('<main class="main clearfix">');
  const end = html.indexOf('</main>', start);
  if (start === -1 || end === -1) {
    throw new Error('Could not find <main> block');
  }

  let content = html.slice(start, end + '</main>'.length);
  content = content.replace(/^<main class="main clearfix">/, '').replace(/<\/main>$/, '');
  return content.trim();
}

function normalizeHtml(html) {
  return html
    .replaceAll(SITE, '')
    .replaceAll('http://vivusinmobiliaria.com', '')
    .replace(
      /<form\b[^>]*\bid="contactForm"[^>]*>[\s\S]*?<\/form>\s*<script>[\s\S]*?contactForm[\s\S]*?<\/script>/gi,
      '<!--NETLIFY_FORM:contactForm-->',
    )
    .replace(
      /<form\b[^>]*\bid="tabForm"[^>]*>[\s\S]*?<\/form>\s*<script>[\s\S]*?tabForm[\s\S]*?<\/script>/gi,
      '<!--NETLIFY_FORM:tabForm-->',
    )
    .replace(
      /<form\b[^>]*\bid="rrhhForm"[^>]*>[\s\S]*?<\/form>\s*<script>[\s\S]*?rrhhForm[\s\S]*?<\/script>/gi,
      '<!--NETLIFY_FORM:rrhhForm-->',
    );
}

await mkdir(OUT_DIR, { recursive: true });

for (const page of pages) {
  const response = await fetch(page.url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${page.url}: ${response.status}`);
  }

  const html = await response.text();
  const body = normalizeHtml(extractMain(html));
  const target = join(OUT_DIR, page.file);
  await writeFile(target, `${body}\n`, 'utf8');
  console.log(`Wrote ${page.file} (${body.length} chars)`);
}
