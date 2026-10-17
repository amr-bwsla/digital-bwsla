// Fictional September 2026 example. Friday and Saturday are rest days.
const events = {
  3: {kind:'late',label:'تأخير 30 دقيقة',in:'09:30',out:'17:00',amount:-31.25},
  6: {kind:'overtime',label:'إضافي 5 ساعات',in:'09:00',out:'22:00',amount:500},
  8: {kind:'absence',label:'غياب',in:'—',out:'—',amount:-333.335},
  10:{kind:'late',label:'تأخير 45 دقيقة',in:'09:45',out:'17:00',amount:-46.875},
  15:{kind:'unpaid',label:'إجازة بدون أجر',in:'—',out:'—',amount:-333.33},
  17:{kind:'early',label:'انصراف مبكر 60 دقيقة',in:'09:00',out:'16:00',amount:-62.5},
  20:{kind:'overtime',label:'إضافي 5 ساعات',in:'09:00',out:'22:00',amount:500},
  22:{kind:'absence',label:'غياب',in:'—',out:'—',amount:-333.335},
  24:{kind:'late',label:'تأخير 45 دقيقة',in:'09:45',out:'17:00',amount:-46.875}
};
const weekdays=['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
const days=Array.from({length:30},(_,i)=>{
  const day=i+1,weekday=new Date(Date.UTC(2026,8,day)).getUTCDay();
  const rest=weekday===5||weekday===6;
  return {day,weekday:weekdays[weekday],...(events[day]||{kind:rest?'rest':'regular',label:rest?'راحة أسبوعية':'حضور منتظم',in:rest?'—':'09:00',out:rest?'—':'17:00',amount:0})};
});
function attendanceDemo(){return `<div class="attendance-board" id="attendance-demo">
  <div class="attendance-heading"><div><span class="eyebrow">الحضور والانصراف</span><h3>شهر أحمد، يوم بيوم.</h3><p>أحمد محمد علي · EMP-024 · سبتمبر 2026</p></div><span class="demo-badge">محاكاة توضيحية</span></div>
  <div class="attendance-summary"><span><b>19</b>يوم حضور</span><span><b>2</b>يوم غياب</span><span><b>1</b>بدون أجر</span><span><b>8</b>راحة أسبوعية</span></div>
  <p class="attendance-shift">الوردية 09:00–17:00 · الراحة: الجمعة والسبت<br>120 دقيقة تأخير · 60 دقيقة انصراف مبكر · 10 ساعات إضافي</p>
  <div class="attendance-filters" role="group" aria-label="عرض سجل الحضور"><button type="button" data-attendance-filter="all" aria-pressed="true">الشهر بالكامل</button><button type="button" data-attendance-filter="events" aria-pressed="false">الأيام المؤثرة في الراتب</button></div>
  <div class="attendance-scroll" tabindex="0" role="region" aria-label="سجل حضور سبتمبر، قابل للتمرير"><table><caption class="sr-only">سجل الحضور والانصراف الشهري للموظف الافتراضي أحمد محمد علي</caption><thead><tr><th scope="col">اليوم</th><th scope="col">حضور</th><th scope="col">انصراف</th><th scope="col">الحالة / أثرها</th></tr></thead><tbody>${days.map(d=>`<tr data-attendance-kind="${d.kind}" class="attendance-${d.kind}"><th scope="row"><b dir="ltr">${String(d.day).padStart(2,'0')} / 09</b><small>${d.weekday}</small></th><td dir="ltr">${d.in}</td><td dir="ltr">${d.out}</td><td>${['rest','regular'].includes(d.kind)?`<span class="day-status">${d.label}</span>`:`<button type="button" data-attendance-impact="${d.kind}" aria-controls="pay-detail attendance-explanation" aria-pressed="false">${d.label} <span aria-hidden="true">↖</span></button>`}</td></tr>`).join('')}</tbody></table></div>
  <div class="attendance-explanation" id="attendance-explanation" role="status"><strong>من سجل اليوم إلى بند الراتب.</strong><p>اضغط على حالة يوم أو بند في كشف الراتب لمراجعة الأيام المرتبطة وطريقة الاحتساب.</p></div>
  <p class="attendance-footnote">أثر الحضور: +1,000 إضافي −1,187.50 استقطاعات. قسط السلفة 500 ج.م بند مستقل. تُجمّع الدقائق والأيام ثم يُقرّب إجمالي كل بند.</p>
</div>`;}
module.exports={days,attendanceDemo};
