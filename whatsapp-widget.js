(()=>{
 const launcher=document.querySelector('#wa-launcher'),dialog=document.querySelector('#wa-dialog'),form=document.querySelector('#wa-form'),message=document.querySelector('#wa-message'),status=document.querySelector('#wa-status');
 if(!launcher||!dialog)return;
 launcher.addEventListener('click',()=>{status.replaceChildren();dialog.showModal();message.focus();});
 dialog.querySelector('.wa-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>launcher.focus());
 message.addEventListener('input',()=>message.setCustomValidity(''));
 form.addEventListener('submit',e=>{e.preventDefault();const inquiry=message.value.trim();message.setCustomValidity(inquiry?'':'اكتب استفسارك أولًا.');if(!form.reportValidity())return;const url='https://wa.me/201280571375?text='+encodeURIComponent('مرحبًا بوصلة رقمية،\n'+inquiry);window.open(url,'_blank','noopener,noreferrer');status.replaceChildren();status.append('راجع الرسالة وأرسلها في واتساب. لو لم تفتح النافذة، ');const retry=document.createElement('a');retry.href=url;retry.target='_blank';retry.rel='noopener noreferrer';retry.textContent='افتح المحادثة من هنا';status.append(retry);});
})();
