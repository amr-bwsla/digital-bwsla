# Digital Bwsla — local website

## Search and social metadata

`site-config.cjs` defines the production origin (`https://digitalbwsla.com`) and page list. `npm run build` generates localized canonical URLs, reciprocal absolute ar/en/x-default links, Open Graph and large-image Twitter cards, Organization/WebSite/WebPage JSON-LD, `sitemap.xml`, and `robots.txt` after translation. Arabic home canonical is `/`; English home is `/en/index.html`. Other pages retain their `.html` URLs. The checked-in 1200×630 social JPEG is generated from the existing brand vector by `build-social-image.cjs` (optional regeneration requires Sharp).

Before production, confirm this origin, serve HTTPS, redirect HTTP/www to it, and redirect `/index.html` to `/` while preserving query strings. Deploy only the 18 public HTML pages, browser JS/CSS, referenced public assets, sitemap and robots files; keep source scripts, original media, `review`, preview pages, `.git`, and `.preview-publish` out of the public deployment. The local server is for preview only. After deployment, verify public image/metadata URLs, connect the domain to Search Console and submit `/sitemap.xml`, then inspect social previews. Local checks do not verify public crawling, rankings, or third-party preview caches. No verification token, tracking code, or deployment is configured by these changes.

## Client logo optimization

The ribbon uses 40 resized WebP files in `assets/clients/optimized` (about 386 KB combined, down from 11.94 MB). Original uploads remain unchanged. `optimize-client-images.cjs` regenerates these files with Sharp available via Node module resolution (`NODE_PATH` may point to the bundled Node packages); rerun it after changing the source logos, then run `npm run build`. The images use native lazy loading and asynchronous decoding. An IntersectionObserver warms the whole moving ribbon within 800px of the viewport to avoid waiting for horizontally offscreen images as they enter the ribbon.

Arabic-first static front end, prepared for later conversion to a custom WordPress theme.

## Preview

Run `node server.cjs`, then open http://127.0.0.1:4173. Mobile-width preview: `/mobile-preview.html`.

## Editing

- `build.cjs` generates the nine website HTML pages. Run `node build.cjs` after content changes.
- `style.css` contains locally hosted Cairo fonts and responsive design.
- `app.js` contains navigation, illustrative HR tabs, and WhatsApp draft preparation.
- `assets/brand` contains SVG brand assets; untouched variants are in `originals`.
- `brand-preview.html` is the separate brand board, now using Cairo.

The site does not process payments, save leads, or integrate live HR data. The dashboard demonstration uses explicitly labeled sample data. Contact opens a WhatsApp draft for the visitor to review and send. No prices are published. ERP is retained as an asset but is not marketed as an available product.

Before production: confirm policy wording and final service scope, replace illustrative product visuals with approved screenshots when available, review which organizations may be described as customers, then configure WordPress, hosting, canonical URLs, and deployment. This checkout has not been deployed to digitalbwsla.com.

## Repeatable workflow

Use `npm run build` to regenerate the nine HTML pages from `build.cjs`; edit the generator rather than generated HTML. Use `npm start` for local preview and `npm run check` for JavaScript syntax checks. No dependency installation is required.

`revise-home.cjs`, `update-review.cjs`, and `extend-showcase.cjs` are historical one-off migration scripts, not build steps. Do not rerun them for normal edits. CSS still contains historical overrides; consolidate them separately with visual regression review.

## Review — 17 October 2026

The original site is preserved in the initial Git commit. The homepage now leads with attendance and payroll, links to the interactive payslip, and explicitly selects HR for demo requests. Contact scope questions adapt to HR, Care, Go, IT, and website projects. WhatsApp requests include a retry link, and the client ribbon has a pause control.

Verified: reproducible generation, local file references across nine pages, JavaScript syntax, homepage at desktop / 768 / 390 / 320 pixel widths, mobile navigation and Escape, payroll calculations and detail interaction, and project-specific contact fields. No live WhatsApp request was sent.

Pending before launch: approved customer classifications and case-study content, additional real product screenshots, decision on lead storage and content management, production SEO URLs/social image, and hosting/deployment setup. The site remains a local static marketing frontend.

## Company-wide positioning and attendance review

The hero has been restored to the original company-wide message at the owner’s request. `company-purpose.cjs` contains proposed vision, mission, and values copy, shared by Home and About. `attendance-demo.cjs` generates all 30 days of the fictional September 2026 employee record; its events reconcile with the existing payslip. The overtime slider and ribbon pause button have been removed. Ribbon images load eagerly, with larger cards and a full static gallery available under the ribbon. All 40 ribbon assets were confirmed loaded in-browser. The monthly record and payslip highlight related entries in both directions.

Verified: 30 calendar days = 19 attended + 2 absent + 1 unpaid leave + 8 rest days; 120 late minutes, 60 early-leave minutes, 10 overtime hours; net salary 10,812.50 EGP. These are fictional presentation policies, not legal/payroll guidance.

## Layout refinement

A light three-step process section separates the HR phone from the payroll example. Attendance is now a compact monthly summary with five interactive effects, with no daily table or scrolling panel. The summary and payslip use equal desktop columns and matching mobile widths. Vision, mission, and values share a revised editorial layout on Home and About. `site-illustrations.cjs` supplies brand-colored inline SVG illustrations for IT and website/store services. Verified at desktop, 630px, and 320px widths, with matching card widths, working payroll links, no horizontal overflow, and no browser console errors observed.
