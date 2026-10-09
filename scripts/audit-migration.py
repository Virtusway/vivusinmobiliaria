#!/usr/bin/env python3
"""Check the built migration, optionally against fresh WordPress pages.

Run pnpm build, then python scripts/audit-migration.py [--live].
Live HTML and the machine-readable report are saved to .firecrawl/.
Uses only the Python standard library. Never submits forms.
"""
import argparse
import concurrent.futures
from datetime import datetime, timezone
import json
import re
import tomllib
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://vivusinmobiliaria.com"
CACHE = ROOT / ".firecrawl"


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.references = []
        self.main_text = []
        self.main_media = []
        self.main_links = []
        self.forms = []
        self.in_main = False
        self.skip = []
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "main":
            self.in_main = True
        if tag in ("script", "style", "form"):
            self.skip.append(tag)
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        if tag == "form":
            self.forms.append(attrs)
        for key in ("href", "src", "data-lottie"):
            if attrs.get(key):
                self.references.append((tag, key, attrs[key]))
        if attrs.get("srcset"):
            self.references.extend((tag, "src", item.strip().split()[0]) for item in attrs["srcset"].split(","))
        for path in re.findall(r"url\(['\"]?([^)'\"]+)", attrs.get("style", "")):
            self.references.append((tag, "src", path))
        if self.in_main and not self.skip:
            if tag in ("img", "iframe"):
                self.main_media.append((tag, urlsplit(urljoin(SITE, attrs.get("src", ""))).path, attrs.get("alt", "")))
            if tag == "a" and attrs.get("href"):
                self.main_links.append(urljoin(SITE, attrs["href"]))

    def handle_endtag(self, tag):
        if tag == "main":
            self.in_main = False
        if self.skip and tag == self.skip[-1]:
            self.skip.pop()

    def handle_data(self, data):
        if self.in_main and not self.skip:
            text = " ".join(data.split())
            if text:
                self.main_text.append(text)


def get(url):
    with urlopen(Request(url, headers={"User-Agent": "Vivus-migration-audit/1.0"}), timeout=45) as response:
        return response.read().decode("utf-8")


def built_path(path):
    path = unquote(path).lstrip("/")
    candidate = ROOT / "dist" / path
    return candidate / "index.html" if candidate.is_dir() or not Path(path).suffix else candidate


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    source = parser.add_mutually_exclusive_group()
    source.add_argument("--live", action="store_true", help="Fetch fresh source pages")
    source.add_argument("--cached", action="store_true", help="Compare with the last fetched source pages")
    args = parser.parse_args()
    route_source = (ROOT / "src/data/routes.ts").read_text()
    routes = json.loads(re.search(r"export const migratedRoutes = (\[[\s\S]*?\]) as const", route_source)[1])
    CACHE.mkdir(exist_ok=True)
    problems = []
    differences = []
    source_defects = []
    pages = {}
    for route in routes:
        path = built_path(route["path"])
        if not path.is_file():
            problems.append(f"Missing built page: {route['path']}")
            continue
        html = path.read_text()
        pages[route["path"]] = Page(html)
        canonical = f'<link rel="canonical" href="{SITE}{route["path"]}"'
        if canonical not in html:
            problems.append(f"Wrong canonical: {route['path']}")
        robots = re.search(r'<meta name="robots" content="([^"]*)"', html)
        if not robots or ('noindex' in robots[1]) != bool(route.get('noindex')):
            problems.append(f"Wrong indexing directive: {route['path']}")
        for locale, alternate in route["alternates"].items():
            target = next((r for r in routes if r["path"] == alternate), None)
            if not target or target["locale"] != locale:
                problems.append(f"Wrong {locale} alternate: {route['path']} -> {alternate}")
            if f'<link rel="alternate" href="{SITE}{alternate}" hreflang="{locale}"' not in html:
                problems.append(f"Missing built {locale} alternate: {route['path']}")
        for form in pages[route["path"]].forms:
            if form.get("method", "").upper() != "POST" or form.get("data-netlify") != "true" or not built_path(form.get("action", "")).is_file():
                problems.append(f"Invalid migrated form: {route['path']} {form.get('id')}")
        if "admin-ajax.php" in html or "contactForm('" in html:
            problems.append(f"WordPress form handler remains: {route['path']}")

    for path, page in pages.items():
        for tag, key, reference in page.references:
            url = urlsplit(urljoin(SITE + path, reference))
            if url.hostname != "vivusinmobiliaria.com" or url.scheme not in ("http", "https"):
                continue
            target = built_path(url.path)
            if not target.is_file():
                problems.append(f"Missing {tag} {key}: {path} -> {reference}")
                continue
            if key == "href" and url.fragment and not url.path.startswith("/wp-content/"):
                target_page = page if url.path == path else pages.get(url.path)
                if target_page and unquote(url.fragment) not in target_page.ids:
                    problems.append(f"Broken anchor: {path} -> {reference}")

    netlify = tomllib.loads((ROOT / "netlify.toml").read_text())
    redirects = {entry["from"]: entry for entry in netlify["redirects"]}
    for old, current in {"/inicio/": "/", "/en/home/": "/en/", "/ca/inici/": "/ca/"}.items():
        if redirects.get(old, {}).get("to") != current or redirects.get(old, {}).get("status") != 301:
            problems.append(f"Missing home redirect: {old} -> {current}")

    sitemap = (ROOT / "dist/page-sitemap.xml").read_text()
    sitemap_urls = set(re.findall(r"<loc>(.*?)</loc>", sitemap))
    expected_urls = {SITE + route["path"] for route in routes if not route.get("noindex")}
    if sitemap_urls != expected_urls:
        problems.append("Built sitemap does not match indexable routes")

    for css in (ROOT / "dist").rglob("*.css"):
        for reference in re.findall(r"url\(['\"]?([^)'\"]+)", css.read_text()):
            if reference.startswith(("data:", "http:", "https:", "#")):
                continue
            target = built_path(reference) if reference.startswith("/") else css.parent / urlsplit(reference).path
            if not target.is_file():
                problems.append(f"Missing CSS asset: {css.relative_to(ROOT / 'dist')} -> {reference}")

    if args.live or args.cached:
        index_path = CACHE / "sitemap_index.xml"
        if args.live:
            index_path.write_text(get(SITE + "/sitemap_index.xml"))
        if index_path.is_file():
            for source_sitemap in re.findall(r"<loc>(.*?)</loc>", index_path.read_text()):
                if source_sitemap != SITE + "/page-sitemap.xml":
                    problems.append(f"Additional source sitemap needs migration: {source_sitemap}")
        sitemap = get(SITE + "/page-sitemap.xml") if args.live else (CACHE / "page-sitemap.xml").read_text()
        if args.live:
            (CACHE / "page-sitemap.xml").write_text(sitemap)
        for url in re.findall(r"<loc>(.*?)</loc>", sitemap):
            path = urlsplit(url).path
            if path not in pages and path not in redirects:
                problems.append(f"Unmigrated live sitemap URL: {url}")
        source_routes = [route for route in routes if route["sourceUrl"]]

        def compare(route):
            html = get(route["sourceUrl"]) if args.live else (CACHE / route["contentFile"]).read_text()
            if args.live:
                (CACHE / route["contentFile"]).write_text(html)
            # Fix these known source defects rather than reproducing dead policy links.
            privacy = {"es": "/politica-de-privacidad/", "en": "/en/privacy-policy/", "ca": "/ca/politica-de-privacitat/"}[route["locale"]]
            html = html.replace('href="/data_protection_policy.html"', f'href="{privacy}"')
            html = html.replace('href="/va/privacy-policy"', f'href="{privacy}"')
            live = Page(html)
            live.main_links = [
                urljoin(SITE, privacy) if urlsplit(link).hostname == 'vivusinmobiliaria.com' and urlsplit(link).path in ('/data_protection_policy.html', '/va/privacy-policy') else link
                for link in live.main_links
            ]
            local = pages[route["path"]]
            if route["group"] == "landing" and not live.forms and local.forms:
                return {"path": route["path"], "source_defect": "Live landing page has no form/content; the complete migrated version is preserved."}
            changed = {}
            for field in ("main_text", "main_media", "main_links"):
                before, after = getattr(local, field), getattr(live, field)
                if before != after:
                    changed[field] = {"local": before, "live": after}
            if len(local.forms) != len(live.forms):
                changed["form_count"] = {"local": len(local.forms), "live": len(live.forms)}
            return {"path": route["path"], "changes": changed} if changed else None

        with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
            for route, result in zip(source_routes, pool.map(compare, source_routes)):
                if result:
                    if "source_defect" in result:
                        source_defects.append(result)
                    else:
                        differences.append(result)
                print(f"Compared {route['path']}", flush=True)

    problems = sorted(set(problems))
    report = {"checked_at": datetime.now(timezone.utc).isoformat(), "pages": len(pages), "problems": problems, "live_differences": differences, "source_defects": source_defects}
    (CACHE / "migration-audit.json").write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n")
    print(f"Checked {len(pages)} built pages; {len(problems)} broken references/configuration; {len(differences)} live content differences.")
    for problem in problems:
        print(problem)
    for difference in differences:
        print(f"Live content changed: {difference['path']} ({', '.join(difference['changes'])})")
    for defect in source_defects:
        print(f"Preserved source fix: {defect['path']} {defect['source_defect']}")
    raise SystemExit(1 if problems or differences else 0)


if __name__ == "__main__":
    main()
