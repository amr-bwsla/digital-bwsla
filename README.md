# Digital Bwsla — local website

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
