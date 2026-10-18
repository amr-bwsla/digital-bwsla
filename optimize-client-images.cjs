// Run with Sharp available on NODE_PATH. Originals are kept unchanged.
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const root = path.join(__dirname, 'assets', 'clients');

async function main() {
  const logos = JSON.parse(fs.readFileSync(path.join(root, 'logos.json'), 'utf8'));
  const output = path.join(root, 'optimized');
  fs.mkdirSync(output, { recursive: true });
  let before = 0, after = 0;
  for (const { file } of logos) {
    const source = path.join(root, file);
    const target = path.join(output, file + '.webp');
    // About twice the rendered dimensions, including the square Metawires crop.
    await sharp(source).rotate().resize({
      width: 320, height: file === 'metawires-new.png' ? 320 : 192,
      fit: 'inside', withoutEnlargement: true
    }).webp({ quality: 90, alphaQuality: 100, effort: 6 }).toFile(target);
    before += fs.statSync(source).size;
    after += fs.statSync(target).size;
  }
  console.log(JSON.stringify({ images: logos.length, before, after, savedPercent: +(100 * (1 - after / before)).toFixed(2) }));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
