const toggle=document.querySelector('.menu-toggle');
const motionButton=document.querySelector('.motion-toggle');
const marquee=document.querySelector('.logo-marquee');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
function setLogoMotion(paused){marquee?.classList.toggle('paused',paused);if(motionButton){motionButton.setAttribute('aria-pressed',String(paused));motionButton.textContent=paused?'تشغيل حركة الشعارات':'إيقاف حركة الشعارات';}}
setLogoMotion(reducedMotion.matches);
motionButton?.addEventListener('click',()=>setLogoMotion(motionButton.getAttribute('aria-pressed')!=='true'));
reducedMotion.addEventListener('change',e=>setLogoMotion(e.matches));
const extraInput=document.querySelector('#payroll-extra');
const money=new Intl.NumberFormat('en-US');
extraInput?.addEventListener('input',()=>{const extra=Number(extraInput.value);document.querySelector('#extra-output').textContent=money.format(extra)+' ج.م';document.querySelector('#extra-line').textContent=money.format(extra);document.querySelector('#gross-total').textContent=money.format(11500+extra);document.querySelector('#net-total').textContent=new Intl.NumberFormat('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}).format(9812.5+extra);if(document.querySelector('[data-pay="overtime"][aria-pressed="true"]'))showPayDetail('overtime');});
const payDetails={
base:['فترة استحقاق الراتب الأساسي','01–30 سبتمبر 2026 • استحقاق 30 من 30 يومًا.','10,000 × 30 ÷ 30 = 10,000 ج.م. الخصومات معروضة بشكل منفصل.'],
allowance:['البدلات الثابتة','بدل انتقال: 1,000 ج.م • بدل اتصال: 500 ج.م.','الإجمالي 1,500 ج.م في هذا المثال.'],
absence:['تفاصيل الغياب • يومان','08 سبتمبر: يوم غياب • 22 سبتمبر: يوم غياب.','10,000 ÷ 30 × يومين = 666.67 ج.م بعد التقريب.'],
unpaid:['إجازة بدون أجر • يوم واحد','15 سبتمبر: إجازة بدون أجر معتمدة.','10,000 ÷ 30 × يوم = 333.33 ج.م بعد التقريب.'],
late:['تفاصيل التأخير • 120 دقيقة','03 سبتمبر: 30 دقيقة • 10 سبتمبر: 45 دقيقة • 24 سبتمبر: 45 دقيقة.','120 ÷ 60 × 62.50 = 125 ج.م. سعر الساعة افتراضي لهذا العرض.'],
early:['انصراف مبكر • 60 دقيقة','17 سبتمبر: انصراف مبكر لمدة 60 دقيقة.','60 ÷ 60 × 62.50 = 62.50 ج.م وفق سياسة المثال.'],
advance:['قسط السلفة','قسط سبتمبر: 500 ج.م • مثال لجدولة سلفة على أقساط.','هذا البند مستقل عن خصومات الحضور.']};
function showPayDetail(id){let parts=payDetails[id];if(id==='overtime'){const extra=Number(extraInput.value);parts=['تفاصيل الوقت الإضافي',`06 سبتمبر: ${money.format(extra/200)} ساعة • 20 سبتمبر: ${money.format(extra/200)} ساعة.`,`${money.format(extra/100)} ساعة × 100 ج.م = ${money.format(extra)} ج.م. يتغير عدد الساعات مع المثال التفاعلي.`];}if(!parts)return;const panel=document.querySelector('#pay-detail');panel.replaceChildren();for(const [i,text] of parts.entries()){const el=document.createElement(i===0?'strong':'p');el.textContent=text;panel.append(el);}document.querySelectorAll('[data-pay]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.pay===id)));}
document.querySelectorAll('[data-pay]').forEach(button=>{['pointerenter','focus','click'].forEach(event=>button.addEventListener(event,()=>showPayDetail(button.dataset.pay)));});
marquee?.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')marquee.classList.toggle('paused');});
const nav=document.querySelector('.nav-links');
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav?.addEventListener('click',e=>{if(e.target.closest('a')){toggle.setAttribute('aria-expanded','false');nav.classList.remove('open');}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.focus();}});
const datasets={attendance:{labels:['موظف','حاضر اليوم','إجازات'],values:['128','119','9'],bars:[65,83,74,94,88,98,91],title:'متابعة الحضور خلال الأسبوع'},payroll:{labels:['مسير رواتب','تمت مراجعته','قيد المراجعة'],values:['128','120','8'],bars:[55,68,82,72,88,96,100],title:'حالة مراجعة مسير الرواتب'},performance:{labels:['هدف للفريق','مكتمل','قيد التنفيذ'],values:['36','28','8'],bars:[42,56,66,75,70,87,92],title:'متابعة إنجاز أهداف الفريق'}};
const serviceNames={hr:'ديمو بوصلة HR',care:'ديمو بوصلة Care',go:'ديمو بوصلة Go',it:'عرض سعر لخدمات IT',studio:'عرض سعر لموقع أو متجر'};
const pageProduct=new URLSearchParams(location.search).get('product')||location.pathname.split('/').pop().replace('.html','');
const serviceSelect=document.querySelector('select[name="service"]');
if(serviceSelect&&serviceNames[pageProduct])serviceSelect.value=serviceNames[pageProduct];
const demoTabs=[...document.querySelectorAll('[data-demo]')];
demoTabs.forEach((button,index)=>button.addEventListener('keydown',e=>{let target;if(e.key==='ArrowLeft')target=(index+1)%demoTabs.length;if(e.key==='ArrowRight')target=(index-1+demoTabs.length)%demoTabs.length;if(e.key==='Home')target=0;if(e.key==='End')target=demoTabs.length-1;if(target!==undefined){e.preventDefault();demoTabs[target].focus();demoTabs[target].click();}}));
document.querySelectorAll('[data-demo]').forEach(button=>button.addEventListener('click',()=>{const data=datasets[button.dataset.demo];document.querySelectorAll('[data-demo]').forEach(b=>b.setAttribute('aria-selected',String(b===button)));document.querySelectorAll('.metric').forEach((m,i)=>{m.querySelector('b').textContent=data.values[i];m.querySelector('small').textContent=data.labels[i];});document.querySelectorAll('.bar').forEach((bar,i)=>bar.style.height=data.bars[i]+'%');document.querySelector('#chart-title').textContent=data.title;}));
document.querySelector('#demo-form')?.addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;const data=new FormData(form);const text=`مرحبًا بوصلة رقمية، أرغب في ${data.get('service')}.\nالاسم: ${data.get('name')}\nالشركة: ${data.get('company')}\nحجم الفريق: ${data.get('size')}\nالتفاصيل: ${data.get('message')||'مناقشة الاحتياج في الديمو'}`;window.open('https://wa.me/201280571375?text='+encodeURIComponent(text),'_blank','noopener,noreferrer');document.querySelector('#form-status').textContent='تم فتح واتساب بمسودة الطلب. راجع الرسالة واضغط إرسال هناك لإتمام التواصل.';});
