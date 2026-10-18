const copy = {
  eyebrow: ['من الديمو إلى التشغيل', 'From demo to launch'],
  heading: ['ديمو مجاني. وتفعيل في نفس اليوم.', 'Free demo. Same-day activation.'],
  demo: ['ديمو مجاني قبل القرار', 'Free demo before you decide'],
  demoText: ['شوف المنتج واسأل عن احتياجاتك في ديمو مجاني للتأكد من مناسبته لطريقة شغلك قبل الاتفاق.', 'Explore the product and discuss your needs in a free demo to check that it fits your workflow before agreeing to proceed.'],
  activation: ['التفعيل في نفس اليوم', 'Same-day activation'],
  activationText: ['بعد الاتفاق على المنتج والباقة، يتم التفعيل في نفس اليوم. نراجع نقل البيانات والربط بالأجهزة بشكل منفصل حسب احتياجك.', 'After agreeing on the product and plan, activation takes place the same day. Data migration and device integrations are reviewed separately for your needs.'],
  training: ['تدريب مجاني', 'Free training'],
  trainingText: ['التدريب على استخدام المنتج مجاني. ننسّق معك تفاصيل التدريب ضمن خطوات البداية.', 'Training on using the product is free. We coordinate the training details with you as part of getting started.'],
  migration: ['هل أقدر أنقل بياناتي الحالية؟', 'Can I migrate my existing data?'],
  hrData: ['أثناء الديمو، نراجع نوع ملفات الموظفين وأرصدة الإجازات وبيانات الرواتب المطلوب نقلها، ونوضح ما يمكن استيراده ومتطلبات النقل ومدته وتكلفته إن وجدت قبل الاتفاق.', 'During the demo, we review the employee files, leave balances and payroll data you want to migrate, and clarify what can be imported, migration requirements, timing and any cost before agreement.'],
  careData: ['أثناء الديمو، نراجع أنواع بيانات المنشأة والمواعيد والسجلات المطلوب نقلها، ونوضح ما يمكن نقله وآليته ومدته وتكلفته إن وجدت قبل الاتفاق. لا ترسل بيانات مرضى عبر نموذج التواصل.', 'During the demo, we review the types of facility data, appointments and records you want to migrate, and clarify migration availability, process, timing and any cost before agreement. Do not send patient data through the contact form.'],
  goData: ['أثناء الديمو، نراجع ملفات الأصناف والأسعار والمخزون والعملاء المطلوب نقلها، ونوضح ما يمكن استيراده ومتطلبات النقل ومدته وتكلفته إن وجدت قبل الاتفاق.', 'During the demo, we review the product, pricing, inventory and customer files you want to migrate, and clarify what can be imported, migration requirements, timing and any cost before agreement.'],
  compatibility: ['إيه الأجهزة والأنظمة المتوافقة؟', 'Which devices and systems are compatible?'],
  hrCompatibility: ['اذكر موديل جهاز البصمة وأجهزة الموبايل وأي أنظمة تحتاج ربطها. نراجع توافقها أثناء الديمو ونؤكد الربط المتاح قبل الاتفاق.', 'Share your attendance device model, mobile devices and any systems you need to connect. We review compatibility during the demo and confirm available integrations before agreement.'],
  careCompatibility: ['وضّح الأجهزة والأنظمة المستخدمة في منشأتك، واحتياجك لتطبيق الموبايل وبوابة المرضى. نراجع التوافق والتكاملات المطلوبة أثناء الديمو ونؤكد المتاح قبل الاتفاق.', 'Tell us about your facility’s devices and systems, and your needs for the mobile app and patient portal. We review compatibility and required integrations during the demo and confirm availability before agreement.'],
  goCompatibility: ['اذكر موديلات أجهزة نقاط البيع والطابعات وقارئات الباركود وأي أنظمة تحتاج ربطها. نراجع التوافق أثناء الديمو ونؤكد الأجهزة والتكاملات المدعومة قبل الاتفاق.', 'Share the models of your point-of-sale devices, printers and barcode scanners, and any systems you need to connect. We review compatibility during the demo and confirm supported devices and integrations before agreement.'],
  support: ['إيه تفاصيل الدعم بعد التفعيل؟', 'What support is available after activation?'],
  supportText: ['نوضح قنوات الدعم ومواعيده ونطاقه وأزمنة الاستجابة ضمن العرض والاتفاق الخاص بمنتجك وباقتك.', 'Support channels, hours, scope and response times are specified in the offer and agreement for your product and plan.'],
  cta: ['احجز ديمو مجاني', 'Book a free demo']
};
exports.translations = Object.values(copy);
exports.render = id => {
  const t = key => copy[key][0];
  return `<section class="section wrap detail-body" id="getting-started"><span class="eyebrow">${t('eyebrow')}</span><h2>${t('heading')}</h2><div class="detail-list">${[['demo','demoText'],['activation','activationText'],['training','trainingText']].map(([h,p])=>`<article class="detail-item"><h3>${t(h)}</h3><p>${t(p)}</p></article>`).join('')}</div>${[['migration',id+'Data'],['compatibility',id+'Compatibility'],['support','supportText']].map(([q,a])=>`<details><summary>${t(q)}</summary><p>${t(a)}</p></details>`).join('')}<div class="actions"><a class="btn" href="contact.html?product=${id}">${t('cta')} <span class="arrow">↖</span></a></div></section>`;
};
