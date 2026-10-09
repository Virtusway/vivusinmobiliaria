#!/usr/bin/env node
/**
 * Downloads missing upload and theme assets referenced by migrated content/layouts.
 * Usage: node scripts/download-uploads.mjs [glob-path]
 */
import { mkdir, writeFile, access, readFile, glob } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = 'https://vivusinmobiliaria.com';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = join(ROOT, 'src/content/wp-pages');
const PUBLIC_DIR = join(ROOT, 'public');

const pattern = process.argv[2] ?? [join(CONTENT_DIR, '*.html'), join(ROOT, 'src/**/*.astro'), join(ROOT, 'src/data/*.ts')];
const files = await glob(pattern);

const paths = new Set();
const uploadPattern = /\/wp-content\/(?:uploads|themes\/vivus\/assets)\/[^"'\s)>]+/g;

for await (const file of files) {
  const html = await readFile(file, 'utf8');
  for (const match of html.matchAll(uploadPattern)) {
    paths.add(match[0]);
  }
}

let downloaded = 0;
let skipped = 0;
let failed = 0;

for (const assetPath of [...paths].sort()) {
  const localPath = join(PUBLIC_DIR, assetPath);
  try {
    await access(localPath);
    skipped += 1;
    continue;
  } catch {
    // missing
  }

  await mkdir(dirname(localPath), { recursive: true });
  const source = assetPath.endsWith('/isotope.pkgd.min.js')
    ? 'https://unpkg.com/isotope-layout@3.0.6/dist/isotope.pkgd.min.js'
    : `${SITE}${assetPath}`;
  const response = await fetch(source);
  if (!response.ok) {
    console.error(`FAILED ${assetPath} (${response.status})`);
    failed += 1;
    continue;
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(localPath, buffer);
  downloaded += 1;
  console.log(`Downloaded ${assetPath}`);
}

console.log(`Done: ${downloaded} downloaded, ${skipped} already present, ${failed} failed`);
if (failed) process.exitCode = 1;
