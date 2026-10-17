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
function attendanceDemo(){
  const impacts=[['absence','الغياب','يومان','−666.67'],['unpaid','إجازة بدون أجر','يوم واحد','−333.33'],['late','التأخير','120 دقيقة','−125.00'],['early','انصراف مبكر','60 دقيقة','−62.50'],['overtime','الوقت الإضافي','10 ساعات','+1,000.00']];
  return `<div class="attendance-board" id="attendance-demo"><div class="attendance-heading"><div><small>الحضور والانصراف</small><h3>ملخص الحضور الشهري</h3></div><span class="demo-badge">مثال توضيحي</span></div><div class="attendance-summary"><span><b>19</b>يوم حضور</span><span><b>2</b>يوم غياب</span><span><b>1</b>بدون أجر</span><span><b>8</b>أيام راحة</span></div><div class="impact-heading"><span>ما أثّر على الراتب</span><small>القيمة بالجنيه</small></div><div class="attendance-impacts">${impacts.map(([kind,title,total,amount])=>`<button type="button" data-attendance-impact="${kind}" aria-controls="pay-detail attendance-explanation" aria-pressed="false"><span><strong>${title}</strong><small>${total}</small></span><b dir="ltr" class="${kind==='overtime'?'positive':'negative'}">${amount}</b></button>`).join('')}</div><div class="attendance-explanation" id="attendance-explanation" role="status"><strong>اختار بندًا، وشوف أثره.</strong><p>اضغط على الغياب أو التأخير لمعرفة طريقة احتسابه في كشف الراتب المقابل.</p></div><p class="attendance-footnote">قسط السلفة بند مستقل عن الحضور. الأرقام والسياسات افتراضية للتوضيح.</p></div>`;
}
module.exports={days,attendanceDemo};
