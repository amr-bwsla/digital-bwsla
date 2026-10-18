const toggle=document.querySelector('.menu-toggle');
const marquee=document.querySelector('.logo-marquee');
// Warm the entire moving ribbon only when the visitor approaches it, so
// horizontally offscreen logos are ready before the animation reveals them.
if(marquee&&'IntersectionObserver' in window){
  const logoObserver=new IntersectionObserver(entries=>{
    if(!entries.some(entry=>entry.isIntersecting))return;
    marquee.querySelectorAll('img[loading="lazy"]').forEach(img=>{img.loading='eager';});
    logoObserver.disconnect();
  },{rootMargin:'800px 0px'});
  logoObserver.observe(marquee);
}
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
function setLogoMotion(paused){marquee?.classList.toggle('paused',paused);}
setLogoMotion(reducedMotion.matches);
reducedMotion.addEventListener('change',e=>setLogoMotion(e.matches));
const payDetails={
base:['فترة استحقاق الراتب الأساسي','01–30 سبتمبر 2026 • استحقاق 30 من 30 يومًا.','10,000 × 30 ÷ 30 = 10,000 ج.م. الخصومات معروضة بشكل منفصل.'],
allowance:['البدلات الثابتة','بدل انتقال: 1,000 ج.م • بدل اتصال: 500 ج.م.','الإجمالي 1,500 ج.م في هذا المثال.'],
absence:['تفاصيل الغياب • يومان','08 سبتمبر: يوم غياب • 22 سبتمبر: يوم غياب.','10,000 ÷ 30 × يومين = 666.67 ج.م بعد التقريب.'],
unpaid:['إجازة بدون أجر • يوم واحد','15 سبتمبر: إجازة بدون أجر معتمدة.','10,000 ÷ 30 × يوم = 333.33 ج.م بعد التقريب.'],
late:['تفاصيل التأخير • 120 دقيقة','03 سبتمبر: 30 دقيقة • 10 سبتمبر: 45 دقيقة • 24 سبتمبر: 45 دقيقة.','120 ÷ 60 × 62.50 = 125 ج.م. سعر الساعة افتراضي لهذا العرض.'],
early:['انصراف مبكر • 60 دقيقة','17 سبتمبر: انصراف مبكر لمدة 60 دقيقة.','60 ÷ 60 × 62.50 = 62.50 ج.م وفق سياسة المثال.'],
overtime:['تفاصيل الوقت الإضافي • 10 ساعات','06 و20 سبتمبر: حضور 09:00 وانصراف 22:00؛ 5 ساعات إضافي في كل يوم.','10 ساعات × 100 ج.م = 1,000 ج.م وفق سياسة المثال.'],
advance:['قسط السلفة','قسط سبتمبر: 500 ج.م • مثال لجدولة سلفة على أقساط.','هذا البند مستقل عن خصومات الحضور.']};
function showPayDetail(id){
  const parts=payDetails[id];
  if(!parts)return;
  for(const selector of ['#pay-detail','#attendance-explanation']){
    const panel=document.querySelector(selector);
    if(!panel)continue;
    panel.replaceChildren(...parts.map((text,i)=>{const el=document.createElement(i===0?'strong':'p');el.textContent=text;return el;}));
  }
  document.querySelectorAll('[data-pay]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.pay===id)));
  document.querySelectorAll('[data-attendance-impact]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.attendanceImpact===id)));
}
document.querySelectorAll('[data-attendance-impact]').forEach(button=>button.addEventListener('click',()=>showPayDetail(button.dataset.attendanceImpact)));
document.querySelectorAll('[data-pay]').forEach(button=>{['pointerenter','focus','click'].forEach(event=>button.addEventListener(event,()=>showPayDetail(button.dataset.pay)));});
marquee?.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')setLogoMotion(!marquee.classList.contains('paused'));});
const nav=document.querySelector('.nav-links');
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav?.addEventListener('click',e=>{if(e.target.closest('a')){toggle.setAttribute('aria-expanded','false');nav.classList.remove('open');}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.focus();}});
const datasets={attendance:{labels:['موظف','حاضر اليوم','إجازات'],values:['128','119','9'],bars:[65,83,74,94,88,98,91],title:'متابعة الحضور خلال الأسبوع'},payroll:{labels:['مسير رواتب','تمت مراجعته','قيد المراجعة'],values:['128','120','8'],bars:[55,68,82,72,88,96,100],title:'حالة مراجعة مسير الرواتب'},performance:{labels:['هدف للفريق','مكتمل','قيد التنفيذ'],values:['36','28','8'],bars:[42,56,66,75,70,87,92],title:'متابعة إنجاز أهداف الفريق'}};
const serviceNames={hr:'ديمو بوصلة HR',care:'ديمو بوصلة Care',go:'ديمو بوصلة Go',it:'عرض سعر لخدمات IT',studio:'عرض سعر لموقع أو متجر'};
const pageProduct=new URLSearchParams(location.search).get('product')||location.pathname.split('/').pop().replace('.html','');
const serviceSelect=document.querySelector('select[name="service"]');
if(serviceSelect&&serviceNames[pageProduct])serviceSelect.value=serviceNames[pageProduct];
const scopeSelect=document.querySelector('select[name="size"]');
const scopeLabel=document.querySelector('#scope-label');
const scopes={
  hr:['حجم الفريق',['أقل من 25 موظفًا','25–100 موظف','101–500 موظف','أكثر من 500 موظف']],
  care:['نوع المنشأة',['عيادة أو مركز طبي','مستشفى','معمل تحاليل','مركز أشعة']],
  go:['عدد الفروع',['فرع واحد','2–5 فروع','أكثر من 5 فروع']],
  it:['عدد الأجهزة التقريبي',['أقل من 10 أجهزة','10–25 جهازًا','26–50 جهازًا','أكثر من 50 جهازًا']],
  studio:['نوع المشروع',['موقع شركة','متجر إلكتروني','تطوير موقع قائم','أحتاج مساعدة في الاختيار']]
};
function updateScope(){
  if(!scopeSelect||!scopeLabel)return;
  const id=Object.keys(serviceNames).find(key=>serviceNames[key]===serviceSelect.value)||'hr';
  const [label,options]=scopes[id];
  scopeLabel.textContent=label;
  scopeSelect.replaceChildren(...options.map(text=>new Option(text,text)));
}
serviceSelect?.addEventListener('change',updateScope);
updateScope();
const demoTabs=[...document.querySelectorAll('[data-demo]')];
demoTabs.forEach((button,index)=>button.addEventListener('keydown',e=>{let target;if(e.key==='ArrowLeft')target=(index+1)%demoTabs.length;if(e.key==='ArrowRight')target=(index-1+demoTabs.length)%demoTabs.length;if(e.key==='Home')target=0;if(e.key==='End')target=demoTabs.length-1;if(target!==undefined){e.preventDefault();demoTabs[target].focus();demoTabs[target].click();}}));
document.querySelectorAll('[data-demo]').forEach(button=>button.addEventListener('click',()=>{const data=datasets[button.dataset.demo];document.querySelectorAll('[data-demo]').forEach(b=>b.setAttribute('aria-selected',String(b===button)));document.querySelectorAll('.metric').forEach((m,i)=>{m.querySelector('b').textContent=data.values[i];m.querySelector('small').textContent=data.labels[i];});document.querySelectorAll('.bar').forEach((bar,i)=>bar.style.height=data.bars[i]+'%');document.querySelector('#chart-title').textContent=data.title;}));
document.querySelector('#demo-form')?.addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;const data=new FormData(form);const text=`مرحبًا بوصلة رقمية، أرغب في ${data.get('service')}.\nالاسم: ${data.get('name')}\nالشركة: ${data.get('company')}\n${scopeLabel.textContent}: ${data.get('size')}\nالتفاصيل: ${data.get('message')||'مناقشة الاحتياج في الديمو'}`;window.open('https://wa.me/201280571375?text='+encodeURIComponent(text),'_blank','noopener,noreferrer');const status=document.querySelector('#form-status');status.textContent='راجع الرسالة واضغط إرسال في واتساب لإتمام التواصل. لو لم تفتح النافذة، ';const retry=document.createElement('a');retry.href='https://wa.me/201280571375?text='+encodeURIComponent(text);retry.target='_blank';retry.rel='noopener noreferrer';retry.textContent='افتح مسودة طلبك من هنا';status.append(retry);});

// Animate once on entry; content remains visible if scripting or observation is unavailable.
(function initScrollMotion(){
  if(!('IntersectionObserver' in window)||reducedMotion.matches)return;
  const selectors=[
    '.hero-grid > div','.hr-layout > div','.section-head','.product-card','.service-row',
    '.step','.payroll-intro','.shared-employee','.attendance-board','.payslip',
    '.purpose-intro','.vision-panel','.mission-panel','.values-panel','.media-hero-copy',
    '.editorial-photo','.media-story-copy','.care-app-preview','.service-gallery article',
    '.detail-item','.detail-body > h2','.detail-body > p','.detail-body > details',
    '.contact > div','.contact > form','.client-heading','.logo-marquee',
    '.workflow-break .wrap > div','.workflow-break li','.footer-top > div','.footer-bottom',
    'main > section > h1','main > section > .lead'
  ].join(',');
  const candidates=[...document.querySelectorAll(selectors)];
  const selected=new Set(candidates);
  const targets=candidates.filter(el=>{for(let p=el.parentElement;p;p=p.parentElement){if(selected.has(p))return false;}return true;});
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      const el=entry.target;
      observer.unobserve(el);
      if(reducedMotion.matches)return;
      const siblings=el.parentElement?Array.from(el.parentElement.children).filter(child=>selected.has(child)):[];
      el.style.setProperty('--reveal-delay',Math.min(Math.max(siblings.indexOf(el),0)*65,195)+'ms');
      el.classList.add('scroll-reveal');
      const finish=()=>{el.classList.remove('scroll-reveal');el.style.removeProperty('--reveal-delay');};
      el.addEventListener('animationend',event=>{if(event.target===el)finish();},{once:true});
      window.setTimeout(finish,1000);
    });
  },{threshold:0,rootMargin:'0px 0px -24px 0px'});
  targets.forEach(el=>observer.observe(el));
  reducedMotion.addEventListener('change',event=>{
    if(!event.matches)return;
    observer.disconnect();
    targets.forEach(el=>{el.classList.remove('scroll-reveal');el.style.removeProperty('--reveal-delay');});
  });
})();

// Keep the return control out of the way until the visitor scrolls down.
(()=>{
  const button=document.querySelector('.back-to-top');
  if(!button)return;
  const update=()=>{button.hidden=window.scrollY<450;};
  window.addEventListener('scroll',update,{passive:true});
  update();
  button.addEventListener('click',()=>{
    window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    const home=document.querySelector('.nav .brand');
    if(home)home.focus({preventScroll:true});
  });
})();
