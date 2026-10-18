// Preserve the current product query and section when switching language.
document.querySelectorAll('.language-switch').forEach(link=>{
 const target=new URL(link.getAttribute('href'),location.href);
 target.search=location.search;target.hash=location.hash;link.href=target.href;
});
