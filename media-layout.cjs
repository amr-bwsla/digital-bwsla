// Editorial imagery is illustrative; actual product screenshots stay separate.
const captions = {
  'clinic-refined': 'فريق طبي يتابع إدارة العيادة في بيئة عمل احترافية',
  'pos-soft-background': 'تجربة دفع وإدارة مبيعات داخل مقهى',
  'focused-work': 'مساحة عمل هادئة لمراجعة الأعمال',
  'clinic-professional': 'فريق طبي يتابع إدارة العيادة في بيئة عمل احترافية',
  'hr-team': 'فريق عمل يتابع بيانات الموارد البشرية',
  'web-studio': 'جلسة عمل لتصميم تجربة موقع إلكتروني',
  'it-support': 'تعاون فريق الدعم التقني داخل بيئة العمل',
  'pos-checkout': 'تجربة دفع وإدارة مبيعات داخل مقهى',
  'clinic-care': 'استقبال المرضى وتنظيم العمل داخل عيادة',
  'compass-workspace': 'بوصلة على مكتب بإطلالة على القاهرة',
  'support-desk': 'مساحة عمل مخصصة للتواصل والدعم',
  'business-team': 'فريق يناقش مؤشرات الأعمال في اجتماع',
  'cairo-workspace': 'مساحة عمل وتحليلات بإطلالة على القاهرة',
  'hr-mobile-concept': 'تصور لاستخدام أدوات الموارد البشرية من الهاتف',
  'clinic-welcome': 'تواصل فريق الاستقبال مع أحد زوار العيادة'
};
function photo(name, eager=false) {
  if(name==='support-desk'||name==='cairo-workspace') return `<img src="assets/media/${name==='support-desk'?'support-desk-macbook':'cairo-workspace-mug'}-1280.webp" srcset="assets/media/${name==='support-desk'?'support-desk-macbook':'cairo-workspace-mug'}-640.webp 640w, assets/media/${name==='support-desk'?'support-desk-macbook':'cairo-workspace-mug'}-1280.webp 1280w" sizes="(max-width:760px) 92vw, 46vw" width="1280" height="${name==='support-desk'?853:720}" alt="${captions[name]}" loading="${eager?'eager':'lazy'}" decoding="async">`;
  if(name==='compass-workspace') return `<img src="assets/media/workspace-macbook-1280.webp" srcset="assets/media/workspace-macbook-640.webp 640w, assets/media/workspace-macbook-1280.webp 1280w" sizes="(max-width:760px) 92vw, 46vw" width="1280" height="720" alt="لابتوب ماك بوك على مكتب في مساحة عمل بإضاءة طبيعية" loading="${eager?'eager':'lazy'}" decoding="async">`;
  const portrait=['hr-team','hr-mobile-concept'].includes(name);
  return `<img src="assets/media/${name}-1280.webp" srcset="assets/media/${name}-640.webp 640w, assets/media/${name}-1280.webp ${portrait?'1122':'1280'}w" sizes="(max-width: 760px) 92vw, 46vw" width="${portrait?1122:1280}" height="${portrait?1402:name==='support-desk'?853:720}" alt="${captions[name]}" loading="${eager?'eager':'lazy'}" decoding="async">`;
}
function figure(name,eager=false){return `<figure class="editorial-photo">${photo(name,eager)}<figcaption>${name==='focused-work'?'مساحة للتركيز على ما يهم.':'تصوّر بصري لبيئة العمل'}</figcaption></figure>`;}
function story(name,eyebrow,title,copy,link,label){return `<section class="wrap media-story"><div class="media-story-copy"><span class="eyebrow">${eyebrow}</span><h2>${title}</h2><p>${copy}</p>${link?`<a class="text-link" href="${link}">${label} ↖</a>`:''}</div>${figure(name)}</section>`;}
module.exports=function(file,body){
  const heroes={'hr.html':'hr-team','care.html':'clinic-care','go.html':'pos-checkout','it.html':'it-support','studio.html':'web-studio','about.html':'compass-workspace'};
  if(heroes[file]){
    const end=body.indexOf('</div></section>');
    if(end<0) throw new Error('Missing detail hero for '+file);
    body=body.slice(0,end)+`</div>${figure(heroes[file],true)}</div></section>`+body.slice(end+'</div></section>'.length);
    body=body.replace('<div class="wrap">','<div class="wrap media-hero"><div class="media-hero-copy">');
  }
  if(file==='index.html'){
    // Give each product and service a contextual photo without replacing its identity.
    body=body.replaceAll('<article class="product-card">','<article class="product-card product-card-photo">');
    body=body.replace('<article class="product-card product-card-photo">','<article class="product-card product-card-photo">'+photo('clinic-refined'));
    const go='<article class="product-card product-card-photo"><div><span class="tag">للمتاجر';
    body=body.replace(go,'<article class="product-card product-card-photo">'+photo('pos-soft-background')+'<div><span class="tag">للمتاجر');
    body=body.replace('<section class="section services"',story('focused-work','صورة أوضح. قرار أسهل.','وقت أقل في التفاصيل.<br>ومساحة أكبر لفريقك.','من تنظيم بيانات الموظفين إلى متابعة نشاطك، اختار الأدوات التي تساعدك على رؤية الصورة كاملة.','contact.html','خلّينا نفهم احتياجك')+'<section class="section services"');
  }
  const stories={
    'about.html':['cairo-workspace','من القاهرة، لطموحك','اتجاه واضح.<br>في كل خطوة رقمية.','نفهم طبيعة نشاطك، ونربط احتياجك بالبرنامج أو الخدمة المناسبة. البداية حوار، والهدف تجربة تخدم شغلك.','contact.html','ابدأ الحديث']
  };
  if(stories[file]) {
    const marker='<section class="wrap contact"';
    body=body.includes(marker)?body.replace(marker,story(...stories[file])+marker):body+story(...stories[file]);
  }
  if(file==='hr.html'){
    const appSection=`<section class="wrap media-story care-app-story" id="hr-app"><div class="media-story-copy"><span class="eyebrow">من تطبيق بوصلة HR</span><h2>بوصلة HR.<br>في إيد فريقك.</h2><p>تابع الوردية، وسجّل حضورك، وراجع سجل الحضور من الموبايل. شاشة فعلية من التطبيق، وباقي تجربة الموظف متاحة للاستعراض أثناء الديمو.</p><a class="text-link" href="contact.html?product=hr">شوف التجربة في الديمو ↖</a></div><figure class="care-app-preview hr-app-visual"><div class="hr-device-stage"><div class="care-device hr-attendance-device"><div class="hr-screen-brand"><div class="hr-screen-logo"><img src="assets/brand/bwsla-hr-icon.svg" alt="" width="32" height="40"><strong lang="en" dir="ltr">Bwsla HR</strong></div><div class="hr-screen-employee" dir="rtl"><img src="assets/products/demo-employee.png" alt="صورة الموظف الافتراضي أحمد محمد علي" width="28" height="28"><div><strong>أحمد محمد علي</strong><small>موظف افتراضي</small></div></div></div><div class="hr-screen-crop"><img class="hr-actual-screen" src="assets/products/hr-attendance.png" alt="شاشة فعلية من تطبيق بوصلة HR تعرض الوردية وتسجيل الحضور والتحقق من الموقع وسجل الحضور" width="600" height="1320" loading="lazy" decoding="async"></div></div></div><figcaption>شاشة حضور فعلية من التطبيق</figcaption></figure></section>`;
    body=body.replace('</section>','</section>'+appSection);
  }
  if(file==='care.html'){
    const appSection=`<section class="wrap media-story care-app-story" id="care-app"><div class="media-story-copy"><span class="eyebrow">من تطبيق بوصلة Care</span><h2>تجربة المريض.<br>في إيده.</h2><p>المواعيد، نتائج التحاليل والأشعة، والسجلات الطبية؛ واجهة تجمع خدمات المريض وتسهّل الوصول إليها.</p><ul class="feature-list"><li><span>↖</span>حجز المواعيد ومتابعة الزيارات</li><li><span>↖</span>نتائج التحاليل والأشعة والوصفات</li><li><span>↖</span>الفواتير والإجازات المرضية</li></ul><a class="text-link" href="contact.html?product=care">اكتشف تجربة التطبيق في الديمو ↖</a></div><figure class="care-app-preview"><div class="care-device"><img src="assets/products/care-app-branded.webp" alt="شاشة من تطبيق بوصلة Care بعد تخصيص الهوية تعرض المواعيد وخدمات المريض ونتائج التحاليل والأشعة والسجلات الطبية" width="600" height="1320" loading="lazy" decoding="async"></div><figcaption>شاشة من التطبيق بعد تخصيص الاسم والشعار لبوصلة Care</figcaption></figure></section>`;
    body=body.replace('<section class="wrap contact"',appSection+'<section class="wrap contact"');
  }
  if(file==='go.html'){
    const appSection=`<section class="wrap media-story care-app-story" id="go-app"><div class="media-story-copy"><span class="eyebrow">تصوّر لتجربة بوصلة Go</span><h2>من أول بيع.<br>لصورة أوضح لنشاطك.</h2><p>تصوّر افتراضي يجمع البيع السريع وملخص المبيعات والمخزون في واجهة موبايل واحدة.</p><ul class="feature-list"><li><span>↖</span>اختيار المنتجات وتجهيز الفاتورة</li><li><span>↖</span>نظرة سريعة على المبيعات والطلبات</li><li><span>↖</span>متابعة المنتجات التي تحتاج إعادة توفير</li></ul><a class="text-link" href="contact.html?product=go">شوف البرنامج الفعلي في الديمو ↖</a></div><figure class="care-app-preview"><div class="care-device"><img src="assets/products/go-app-concept.webp" alt="تصميم افتراضي لبوصلة Go يعرض منتجات وسلة بيع وملخص مبيعات ببيانات تجريبية" width="600" height="1320" loading="lazy" decoding="async"></div></figure></section>`;
    body=body.replace('<section class="wrap contact"',appSection+'<section class="wrap contact"');
  }
  if(file==='contact.html'){
    body=body.replace('<section class="section wrap">','<section class="section wrap media-hero contact-media"><div class="media-hero-copy">');
    body=body.replace('</p></section>','</p></div>'+figure('support-desk',true)+'</section>');
  }
  if(file==='studio.html'||file==='it.html'){
    const studio=file==='studio.html';
    if(studio) body=body.replace(figure('web-studio',true),`<figure class="editorial-photo"><img src="assets/media/web-design-concepts.webp" alt="تصوّر لتصميم موقع شركة ومتجر إلكتروني" width="1200" height="800" decoding="async"><figcaption>أفضل التصميمات للمواقع الإلكترونية والمتاجر</figcaption></figure>`);
    const items=studio?[
      ['web-corporate-concept','موقع شركة بهوية واضحة','تصميم يعرّف بخدماتك، ويقود الزائر بسهولة لخطوة التواصل.'],
      ['web-store-concept','متجر يهتم بتجربة الشراء','عرض جذاب للمنتجات وتجربة متناسقة على الكمبيوتر والموبايل.']
    ]:[
      ['it-software-support','دعم البرامج وصيانة الأجهزة','دعم البرامج وأنظمة التشغيل وتحديثها ومعالجة مشكلاتها، مع صيانة الأجهزة عبر مركز الصيانة لدينا وفق نطاق الخدمة المتفق عليه.'],
      ['it-network','شبكة منظّمة تدعم شغلك','نؤسّس شبكة شركتك من البداية للنهاية: من معاينة الموقع وتخطيط الشبكة وتمديد الكابلات وتنظيمها، إلى تركيب وإعداد أجهزة الشبكة ونقاط الواي فاي وربط أجهزة فريقك. نختبر الاتصال والتغطية قبل التسليم، ونوفّر المتابعة والصيانة وفق نطاق الخدمة المتفق عليه، مع مراعاة احتياجات شركتك وتوسّعها.']
    ];
    const gallery=`<section class="wrap service-gallery" id="service-gallery"><div class="section-head"><div><span class="eyebrow">${studio?'أفكار تناسب نشاطك':'رعاية تقنية متكاملة'}</span><h2>${studio?'لكل مشروع، تجربة تخصّه.':'ركّز في شغلك، وسيب التقنية علينا.'}</h2></div><p>${studio?'تصوّرات تصميم لمواقع ومتاجر احترافية. نطوّر مشروعك بهويتك ومتطلباتك وبأسعار تنافسية.':'عقود صيانة ودعم تقني تناسب شركتك، تجمع متابعة البرامج والأجهزة والشبكات في خدمة واحدة. نساعدك تقلّل الأعطال وتخفّف أعباء المتابعة عن فريقك، بنطاق خدمة واضح يناسب احتياجاتك.'}</p></div><div class="service-gallery-grid">${items.map(([id,title,desc])=>`<figure><img src="assets/media/${id}.webp" alt="${title}" width="1200" height="800" loading="lazy" decoding="async"><figcaption><h3>${title}</h3><p>${desc}</p></figcaption></figure>`).join('')}</div></section>`;
    body=body.replace('<section class="wrap contact"',gallery+'<section class="wrap contact"');
  }
  const genericCaption='<figcaption>تصوّر بصري لبيئة العمل</figcaption>';
  if(file==='hr.html'||file==='it.html') body=body.replace(genericCaption,'');
  if(file==='care.html') body=body.replace(genericCaption,'<figcaption>حل ينظّم عمليات منشأتك الطبية دون ورقيات.</figcaption>');
  if(file==='contact.html') body=body.replace(genericCaption,'<figcaption>اطلب ديمو، وسيتواصل معك فريقنا لتحديد الموعد المناسب.</figcaption>');
  if(file==='index.html'){
    const services=body.match(/<section class="section services" id="services">[\s\S]*?<\/section>/);
    const purpose='<section class="section purpose-section" id="purpose">';
    if(!services||!body.includes(purpose))throw new Error('Missing home sections');
    body=body.replace(services[0],'').replace(purpose,services[0]+purpose);
  }
  return body;
};
