# Migration status

Compared with the live WordPress site on 5 October 2026. All URLs in its page sitemap are covered by an Astro page or one of the three homepage redirects. The site builds 41 routed pages plus the 404 page, across Spanish, English and Valencian. Its sitemap contains 35 indexable pages; landing and thank-you pages remain excluded.

The main pages, navigation, property links, contact forms and theme were already present. The remaining work was content drift, missing assets, broken links and interactive behavior.

## Implemented

- Refreshed all complete source pages, including image descriptions, accessible link labels, heading structure and the Kit Digital funding section on each homepage.
- Kept the complete Spanish buyer-agent landing page. The live `/landing/` currently contains only its hero, without its other sections or contact form. Astro retains eight sections, its map, animations and form. The audit reports this explicitly as a source defect.
- Repaired footer contact navigation in every language and four stale privacy-policy links. Restored the missing close icon and funding image.
- Made the mobile navigation and desktop language switcher keyboard accessible, synchronized expanded state, and added Escape/outside-click closing. Added localized social-link labels and copyright text.
- Corrected footer wrapping and overlapping partner-category labels on narrow phones.
- Loaded analytics only after acceptance. Added localized cookie settings in the footer, saved preferences across pages, and kept advertising consent denied.
- Preserved native validation, Netlify honeypots, locale/source fields and the chosen home-tab subject. Matched the original tab-form button styling.
- Hosted the partner-filter library locally. Landing animations use the existing local Lottie library and JSON files; maps have titles and load lazily.
- Corrected the sitemap's TypeScript error, added corresponding-page `x-default` alternates, and made missing content fail the build.
- Added type checking to the build with TypeScript 6, which the installed Astro checker supports. Preserved the existing Astro 7.3.5 dependency upgrade.
- Expanded the migration and asset scripts to cover the route manifest and theme assets. Repeated content refreshes produce the same files. Generated HTML whitespace is normalized.

## Verification

`pnpm build` passes with zero type errors, warnings or hints. The live comparison reports zero broken local references/configuration and zero unexplained content differences. It checks page coverage, text, images, embedded maps, links, form counts, local assets, CSS references, indexing directives, canonicals, language alternates, sitemap membership and homepage redirect configuration. `git diff --check` passes.

The production preview was exercised in the shared browser at desktop and phone sizes:

- Home tab changes update the submitted subject. An invalid email and unchecked terms fail validation; populated valid fields and accepted terms pass. The form payload contains the expected form name, locale, source page and selected subject.
- The home-gallery next button advances the selected property and retains its corresponding Idealista link.
- The mobile menu opens and closes with matching expanded state. Escape closes the menu and language switcher.
- The partner filter selects the painting company alone, and the all-category filter restores all seven companies. CSS transitions were finished through the browser animation API because the background preview pauses rendering between snapshots.
- The Spanish landing page renders all three Lottie animations, has its contact form, and has no missing loaded images or horizontal overflow.
- English and Valencian pages use the expected language, form names, subject and localized success URL.
- Analytics makes no requests before acceptance. Accepting loads the tag, saved acceptance persists on another page, cookie settings reopen the banner, and rejecting prevents the tag from loading on the next page.

The repeatable audit is `pnpm audit:migration --live`, after building. Evidence is saved to `.firecrawl/migration-audit.json` and the corresponding raw source pages. `--cached` reuses that snapshot without another network fetch.

## Deployment checks still required

The production WordPress deployment was not changed. Before replacing it with the Astro build:

1. Enable Netlify Forms detection and configure email notifications for all nine detected form names. The site contains 27 form instances. WordPress delivered form email to `crm@virtusway.com`; preserve that recipient unless the business requests a change.
2. Submit contact, home-tab and recruitment forms on Netlify. Confirm stored fields, email delivery and the localized thank-you redirects. Local Astro preview validates the forms but does not implement Netlify's submission service.
3. Verify the three 301 homepage aliases and the 404 status on the deployed host. Local checks validate the Netlify configuration, not the host's response.

Content is static. Updating listings or partner companies requires updating the migrated HTML or refreshing it from WordPress and rebuilding. Idealista links and existing translations are preserved. Some English-source sections remain Spanish, including the accessibility statement; the live site provides no Valencian accessibility statement, so its footer uses the Spanish statement without claiming a Valencian hreflang alternate.
