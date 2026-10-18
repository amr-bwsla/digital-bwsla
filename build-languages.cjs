const fs=require('node:fs');
const source=JSON.parse(fs.readFileSync('translation-source.json','utf8'));
const target=fs.readFileSync('translation-en.txt','utf8').trimEnd().split(/\r?\n/);
const dynamic=JSON.parse(fs.readFileSync('dynamic-source.json','utf8'));
const dynamicEn=fs.readFileSync('dynamic-en.txt','utf8').trimEnd().split(/\r?\n/);
if(source.length!==target.length||dynamic.length!==dynamicEn.length)throw Error('Translation count mismatch');
const dictionary=new Map([...source.map((v,i)=>[v,target[i]]),...dynamic.map((v,i)=>[v,dynamicEn[i]])]);
for(const [ar,en] of require('./product-onboarding.cjs').translations)dictionary.set(ar,en);
const missing=new Set();
const arabic=/[\u0600-\u06ff]/;
const escape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
function translate(value){
 const key=value.trim();if(!arabic.test(key))return value;
 if(!dictionary.has(key)){missing.add(key);return value;}
 return value.replace(key,dictionary.get(key));
}
const pages=['index','hr','care','go','it','studio','about','contact','privacy'];
fs.mkdirSync('en',{recursive:true});
function controls(html,name,en){
 if(!en)html=html.replace('<strong>بوصلة رقمية</strong>','<strong><span class="brand-ar-bwsla">بوصلة</span> <span class="brand-ar-digital">رقمية</span></strong>');
 const link=`${en?'../':'en/'}${name}.html`;
 const button=`<a class="language-switch" href="${link}" lang="${en?'ar':'en'}" hreflang="${en?'ar':'en'}" aria-label="${en?'Switch to Arabic':'Switch to English'}">${en?'العربية':'English'}</a>`;
 html=html.replace('<div class="header-socials"','<div class="header-tools">'+button+'<div class="header-socials"');
 html=html.replace('</div><button class="menu-toggle"','</div></div><button class="menu-toggle"');
 return html.replace('</head>',`<link rel="alternate" hreflang="ar" href="${en?'../':''}${name}.html"><link rel="alternate" hreflang="en" href="${en?'':'en/'}${name}.html"><script src="${en?'../':''}language.js" defer></script></head>`);
}
for(const name of pages){
 const ar=fs.readFileSync(name+'.html','utf8');
 let en=ar.replace(/>([^<>]+)</g,(_,s)=>'>'+escape(translate(s)).replaceAll('&amp;','&')+'<');
 en=en.replace(/\b(alt|title|aria-label|placeholder|content)="([^"]*)"/g,(_,a,s)=>a+'="'+escape(translate(s))+'"');
 en=en.replace('<html lang="ar" dir="rtl">','<html lang="en" dir="ltr">');
 en=en.replaceAll('<small lang="en">DIGITAL BWSLA</small>','<small class="brand-arabic" lang="ar" dir="rtl">بوصلة رقمية</small>');
 en=en.replaceAll('<strong>Digital Bwsla</strong>','<strong class="brand-wordmark"><span class="brand-digital">Digital</span> <span class="brand-bwsla">Bwsla</span></strong>');
 en=en.replace('<p>Your compass for digital transformation.<br>','<p><span class="brand-tagline">Your Compass for Digital Transformation.</span><br>');
 en=en.replace(/\b(src|href|srcset)="([^"]*)"/g,(all,attr,url)=>{
   if(url.startsWith('assets/')) return `${attr}="${url.split(',').map(part=>'../'+part.trim()).join(', ')}"`;
   if(['style.css','whatsapp-widget.css'].includes(url))return `${attr}="../${url}"`;
   return all;
 });
 fs.writeFileSync('en/'+name+'.html',controls(en,name,true));
 fs.writeFileSync(name+'.html',controls(ar,name,false));
}
for(const file of ['app.js','whatsapp-widget.js']){
 let code=fs.readFileSync(file,'utf8');
 code=code.replace(/'([^'\n]*)'/g,(all,s)=>dictionary.has(s)?JSON.stringify(dictionary.get(s).replaceAll('\\n','\n')):all);
 code=code.replace('مرحبًا بوصلة رقمية، أرغب في ','Hello Digital Bwsla, I would like ').replace('الاسم: ','Name: ').replace('الشركة: ','Company: ').replace('التفاصيل: ','Details: ');
 fs.writeFileSync('en/'+file,code);
}
if(missing.size)throw Error('Missing translations: '+JSON.stringify([...missing]));
console.log('Built 9 English pages with localized interactions.');
