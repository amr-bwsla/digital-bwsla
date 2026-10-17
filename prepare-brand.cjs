const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = __dirname;
const out = path.join(root, 'assets', 'brand');
fs.mkdirSync(path.join(out, 'originals'), { recursive: true });
const html = fs.readFileSync('C:/Users/Islam Hamdy/Downloads/مركز_تحميل_شعارات_Bwsla_المتجهة__100__Pure_Vector_SVG_.html', 'utf8');
const script = html.match(/<script>\s*([\s\S]*?)<\/script>/)[1].split("let currentFilter = 'all';")[0];
const context = vm.createContext({});
const logos = vm.runInContext(script + '\nLOGOS.map(item => ({name:item.name, group:item.subGroupId, full:buildFullSvg(item,true), icon:buildIconSvg(item)}))', context, {timeout:1000});
for (const logo of logos) {
  const name = logo.name.toLowerCase();
  fs.writeFileSync(path.join(out, 'originals', `bwsla-${name}-full.svg`), logo.full);
  const clean = logo.full.replace(new RegExp('<g id="' + logo.group + '">[\\s\\S]*?<\\/g>'), '');
  fs.writeFileSync(path.join(out, `bwsla-${name}.svg`), clean);
  fs.writeFileSync(path.join(out, `bwsla-${name}-icon.svg`), logo.icon);
}
const company = fs.readFileSync('C:/Users/Islam Hamdy/Downloads/Digital_Bwsla_SVG_Downloader.html','utf8');
for (const [id, name] of [['code-main-full','digital-bwsla'], ['code-main-icon','digital-bwsla-icon']]) {
  const svg = company.match(new RegExp('<textarea[^>]*id="'+id+'"[^>]*>([\\s\\S]*?)<\\/textarea>'))[1];
  fs.writeFileSync(path.join(out,'originals', name+'.svg'), svg);
  fs.writeFileSync(path.join(out,name+'.svg'),svg.replace(/<g id="Digital_Bwsla_Tagline">[\s\S]*?<\/g>/,''));
}
const products = [['hr','Bwsla HR','منظومة متكاملة لإدارة الموارد البشرية'],['care','Bwsla Care','إدارة المنشآت الطبية وتجربة المرضى'],['go','Bwsla Go','نقاط البيع والمخزون وإدارة نشاطك']];
const preview = `<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>بوصلة رقمية — الهوية المعتمدة للموقع</title><style>*{box-sizing:border-box}body{margin:0;background:#f5f9fa;color:#16334b;font-family:Tahoma,Arial,sans-serif;line-height:1.8}main{max-width:1100px;margin:auto;padding:48px 24px}.hero{background:white;padding:48px;border-radius:24px;text-align:center;border:1px solid #dce9ed}.hero img{height:130px}h1{font-size:40px;margin:12px 0 0}.tagline{font-size:24px;color:#197b86;margin:4px 0}.intro{max-width:650px;margin:24px auto}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:28px}article{background:white;border:1px solid #dce9ed;border-radius:20px;padding:24px;text-align:center}article img{height:160px;width:100%;object-fit:contain}article p{margin:8px 0;color:#416176}.note{margin-top:30px;color:#526b7b}.compact{display:flex;align-items:center;gap:12px;margin-top:24px;padding:18px;background:white;border-radius:16px}.compact img{width:36px;height:44px}@media(max-width:650px){.grid{grid-template-columns:1fr}h1{font-size:30px}.hero{padding:28px 16px}.tagline{font-size:20px}}</style><main><section class="hero"><img src="assets/brand/digital-bwsla-icon.svg" alt="رمز بوصلة رقمية"><h1>بوصلة رقمية</h1><p class="tagline">بوصلتك نحو التحول الرقمي</p><p lang="en" dir="ltr">Digital Bwsla</p><p class="intro">ابدأ بتنظيم فريقك مع بوصلة HR، واكتشف حلولنا لإدارة نشاطك وتطوير حضورك الرقمي ودعم شبكاتك وأجهزتك.</p></section><div class="grid">${products.map(([id,name,description])=>`<article><img src="assets/brand/bwsla-${id}.svg" alt="${name}"><p>${description}</p></article>`).join('')}</div><p class="note">نموذج الاستخدام المختصر لهيدر الموبايل:</p><div class="compact"><img src="assets/brand/digital-bwsla-icon.svg" alt=""><strong>بوصلة رقمية</strong></div><p class="note">معاينة الهوية فقط. HR هو المنتج الرئيسي. السوق الأول مصر، والتواصل بطلب ديمو أو عرض سعر. شعار ERP محفوظ ضمن الأصول ولا يظهر كمنتج متاح في النسخة الأولى.</p></main></html>`;
fs.writeFileSync(path.join(root,'brand-preview.html'),preview);
console.log('Prepared brand assets and brand-preview.html');
