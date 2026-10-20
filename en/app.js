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
base:["Basic salary eligibility period","01–30 September 2026 · Eligible for 30 of 30 days.","10,000 × 30 ÷ 30 = EGP 10,000. Deductions are shown separately."],
allowance:["Fixed allowances","Transport: EGP 1,000 · Communication: EGP 500.","Total: EGP 1,500 in this example."],
absence:["Absence details · Two days","08 September: absent · 22 September: absent.","10,000 ÷ 30 × 2 days = EGP 666.67 after rounding."],
unpaid:["Unpaid leave · One day","15 September: approved unpaid leave.","10,000 ÷ 30 × 1 day = EGP 333.33 after rounding."],
late:["Lateness details · 120 minutes","03 September: 30 minutes · 10 September: 45 minutes · 24 September: 45 minutes.","120 ÷ 60 × 62.50 = EGP 125. The hourly rate is illustrative."],
early:["Early departure · 60 minutes","17 September: left 60 minutes early.","60 ÷ 60 × 62.50 = EGP 62.50 under the example policy."],
overtime:["Overtime details · 10 hours","06 and 20 September: check-in 09:00, check-out 22:00; 5 overtime hours each day.","10 hours × EGP 100 = EGP 1,000 under the example policy."],
advance:["Advance installment","September installment: EGP 500 · Example of a scheduled advance repayment.","This item is independent of attendance deductions."]};
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
// Touch scrolling must not leave the ribbon permanently paused.
marquee?.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')setLogoMotion(true);});
for(const event of ['pointerup','pointercancel','lostpointercapture']){
  window.addEventListener(event,()=>setLogoMotion(reducedMotion.matches));
}
const nav=document.querySelector('.nav-links');
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav?.addEventListener('click',e=>{if(e.target.closest('a')){toggle.setAttribute('aria-expanded','false');nav.classList.remove('open');}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.focus();}});
const datasets={attendance:{labels:["Employees","Present today","On leave"],values:['128','119','9'],bars:[65,83,74,94,88,98,91],title:"Weekly attendance overview"},payroll:{labels:["Payroll records","Reviewed","Under review"],values:['128','120','8'],bars:[55,68,82,72,88,96,100],title:"Payroll review status"},performance:{labels:["Team goals","Completed","In progress"],values:['36','28','8'],bars:[42,56,66,75,70,87,92],title:"Team goal progress"}};
const serviceNames={hr:"Bwsla HR demo",care:"Bwsla Care demo",go:"Bwsla Go demo",it:"IT services quote",studio:"Website or online store quote"};
const pageProduct=new URLSearchParams(location.search).get('product')||location.pathname.split('/').pop().replace('.html','');
const serviceSelect=document.querySelector('select[name="service"]');
if(serviceSelect&&serviceNames[pageProduct])serviceSelect.value=serviceNames[pageProduct];
const scopeSelect=document.querySelector('select[name="size"]');
const scopeLabel=document.querySelector('#scope-label');
const scopes={
  hr:["Team size",["Fewer than 25 employees","25–100 employees","101–500 employees","More than 500 employees"]],
  care:["Facility type",["Clinic or medical center","Hospital","Laboratory","Radiology center"]],
  go:["Number of branches",["One branch","2–5 branches","More than 5 branches"]],
  it:["Approximate number of devices",["Fewer than 10 devices","10–25 devices","26–50 devices","More than 50 devices"]],
  studio:["Project type",["Corporate website","Online store","Improve an existing website","I need help choosing"]]
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
document.querySelector('#demo-form')?.addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;const data=new FormData(form);const text=`Hello Digital Bwsla, I would like ${data.get('service')}.\nName: ${data.get('name')}\nCompany: ${data.get('company')}\n${scopeLabel.textContent}: ${data.get('size')}\nDetails: ${data.get('message')||"Discuss requirements during the demo"}`;window.open('https://wa.me/201280571375?text='+encodeURIComponent(text),'_blank','noopener,noreferrer');const status=document.querySelector('#form-status');status.textContent="Review your message and press Send in WhatsApp. If no window opens, ";const retry=document.createElement('a');retry.href='https://wa.me/201280571375?text='+encodeURIComponent(text);retry.target='_blank';retry.rel='noopener noreferrer';retry.textContent="open your request draft here";status.append(retry);});

// Animate once on entry; content remains visible if scripting or observation is unavailable.
(function initScrollMotion(){
  if(!('IntersectionObserver' in window)||reducedMotion.matches)return;
  const selectors=[
    '.hero-grid > div','.hr-layout > div','.section-head','.product-card','.service-row',
    '.step','.payroll-intro','.shared-employee','.attendance-board','.payslip',
    '.purpose-intro','.vision-panel','.mission-panel','.values-panel','.media-hero-copy',
    '.editorial-photo','.media-story-copy','.care-app-preview','.service-gallery figure',
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
      el.style.setProperty('--reveal-delay',Math.min(Math.max(siblings.indexOf(el),0)*70,140)+'ms');
      el.classList.add('scroll-reveal');
      const finish=()=>{el.classList.remove('scroll-reveal');el.style.removeProperty('--reveal-delay');};
      el.addEventListener('animationend',event=>{if(event.target===el)finish();},{once:true});
      window.setTimeout(finish,900);
    });
  },{threshold:0,rootMargin:'0px 0px -16px 0px'});
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

// Product descriptions can be opened by touch or keyboard as well as hover.
const heroProducts=document.querySelectorAll('button.float');
heroProducts.forEach(button=>button.addEventListener('click',()=>{
const opening=button.getAttribute('aria-expanded')!=='true';
heroProducts.forEach(item=>item.setAttribute('aria-expanded',String(item===button&&opening)));
}));
document.addEventListener('click',event=>{if(!event.target.closest('button.float'))heroProducts.forEach(item=>item.setAttribute('aria-expanded','false'));});
document.addEventListener('keydown',event=>{if(event.key==='Escape')heroProducts.forEach(item=>item.setAttribute('aria-expanded','false'));});
