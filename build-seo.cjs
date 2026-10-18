const fs = require('node:fs');
const { origin, pages, socialImage } = require('./site-config.cjs');
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const decode = value => value.replaceAll('&quot;', '"').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&');
const url = (page, lang) => origin + (lang === 'en' ? '/en/' + page + '.html' : page === 'index' ? '/' : '/' + page + '.html');
const urls = [];
for (const page of pages) for (const lang of ['ar', 'en']) {
  const file = (lang === 'en' ? 'en/' : '') + page + '.html';
  let html = fs.readFileSync(file, 'utf8').replace(/<!-- SEO START -->[\s\S]*?<!-- SEO END -->/g, '');
  // Replace the relative language tags from the translation step.
  html = html.replace(/<link\b[^>]*rel="alternate"[^>]*hreflang="[^"]*"[^>]*>/g, '');
  const title = decode(html.match(/<title>([^<]+)<\/title>/)[1]);
  const description = decode(html.match(/<meta name="description" content="([^"]*)"/)[1]);
  const canonical = url(page, lang);
  urls.push(canonical);
  const imageAlt = lang === 'ar' ? 'بوصلة رقمية — برامج إدارة الأعمال والخدمات التقنية' : 'Digital Bwsla — business software and technology services';
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': origin + '/#organization', name: 'بوصلة رقمية', alternateName: 'Digital Bwsla', url: origin + '/', logo: origin + '/assets/brand/digital-bwsla-icon.svg', email: 'info@digitalbwsla.com', telephone: '+201280571375', sameAs: ['https://www.facebook.com/digitalbwsla/', 'https://www.instagram.com/digitalbwsla/'] },
      { '@type': 'WebSite', '@id': origin + '/#website', url: origin + '/', name: 'Digital Bwsla', inLanguage: ['ar', 'en'], publisher: { '@id': origin + '/#organization' } },
      { '@type': page === 'about' ? 'AboutPage' : page === 'contact' ? 'ContactPage' : 'WebPage', '@id': canonical + '#webpage', url: canonical, name: title, description, inLanguage: lang, isPartOf: { '@id': origin + '/#website' }, about: { '@id': origin + '/#organization' } }
    ]
  };
  const tags = [
    `<link rel="canonical" href="${canonical}">`,
    ...['ar', 'en', 'x-default'].map(l => `<link rel="alternate" hreflang="${l}" href="${url(page, l === 'en' ? 'en' : 'ar')}">`),
    `<meta property="og:url" content="${canonical}">`,
    '<meta property="og:site_name" content="Digital Bwsla">',
    `<meta property="og:locale" content="${lang === 'ar' ? 'ar_EG' : 'en_US'}">`,
    `<meta property="og:locale:alternate" content="${lang === 'ar' ? 'en_US' : 'ar_EG'}">`,
    `<meta property="og:image" content="${origin + socialImage}">`,
    '<meta property="og:image:type" content="image/jpeg">',
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    `<meta property="og:image:alt" content="${imageAlt}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${escape(title)}">`,
    `<meta name="twitter:description" content="${escape(description)}">`,
    `<meta name="twitter:image" content="${origin + socialImage}">`,
    `<meta name="twitter:image:alt" content="${imageAlt}">`,
    `<script type="application/ld+json">${JSON.stringify(graph).replaceAll('<', '\\u003c')}</script>`
  ].join('\n');
  fs.writeFileSync(file, html.replace('</head>', `<!-- SEO START -->\n${tags}\n<!-- SEO END --></head>`));
}
fs.writeFileSync('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls.map(u => `  <url><loc>${escape(u)}</loc></url>`).join('\n') + '\n</urlset>\n');
fs.writeFileSync('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`Built SEO metadata and sitemap for ${urls.length} pages.`);
