// Optional asset regeneration: run with Sharp available through NODE_PATH.
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
process.chdir(__dirname);
async function main() {
  const logo = fs.readFileSync('assets/brand/digital-bwsla-icon.svg').toString('base64');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f6f8f2"/>
  <rect y="604" width="1200" height="26" fill="#123b40"/>
  <circle cx="970" cy="284" r="252" fill="none" stroke="#dce7dc" stroke-width="2"/>
  <circle cx="970" cy="284" r="205" fill="none" stroke="#dce7dc" stroke-width="2"/>
  <circle cx="970" cy="284" r="164" fill="#ffffff"/>
  <image href="data:image/svg+xml;base64,${logo}" x="870" y="166" width="200" height="235"/>
  <g font-family="Arial, sans-serif">
    <text x="72" y="130" font-size="30" letter-spacing="5" font-weight="700" fill="#167d80">DIGITAL BWSLA</text>
    <text x="68" y="243" font-size="64" font-weight="700" fill="#123b40">Your compass for</text>
    <text x="68" y="324" font-size="64" font-weight="700" fill="#167d80">digital transformation.</text>
    <rect x="72" y="350" width="560" height="8" rx="4" fill="#d5ed9b"/>
    <text x="72" y="420" font-size="25" fill="#45666a">HR · Healthcare · Point of Sale</text>
    <text x="72" y="460" font-size="25" fill="#45666a">IT Services · Websites &amp; Online Stores</text>
    <text x="72" y="557" font-size="24" fill="#123b40">digitalbwsla.com</text>
  </g></svg>`;
  fs.mkdirSync(path.join('assets', 'social'), { recursive: true });
  fs.writeFileSync('assets/social/share.svg', svg);
  await sharp(Buffer.from(svg)).jpeg({ quality: 90, mozjpeg: true }).toFile('assets/social/share.jpg');
  console.log('Built 1200 × 630 social image.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
