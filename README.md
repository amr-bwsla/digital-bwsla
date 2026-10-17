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
