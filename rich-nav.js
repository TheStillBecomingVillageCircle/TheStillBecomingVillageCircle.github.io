/* Site-wide illustrated navigation. Exact approved artwork only. */
(function(){
'use strict';
const NAV_ITEMS=[['index.html','Home','/assets/home-button-exact.jpg'],['about.html','Inside the<br>Bubble','/assets/inside-bubble-exact.jpg'],['LearningtheUnknown.html','The<br>Unknown','/assets/nav-unknown.svg'],['events.html','Experiences','/assets/nav-experiences.svg'],['web-design.html','Webspace','/assets/nav-webspace.svg'],['contact.html','Connect','/assets/nav-connect.svg'],['coaching.html','Support','/assets/nav-support.svg']];
function apply(){
 const rows=document.querySelectorAll('.nav-row');
 if(!rows.length)return;
 rows.forEach(function(row){
  if(row.dataset.richNavApplied==='true')return;
  row.dataset.richNavApplied='true';
  const current=location.pathname.split('/').pop()||'index.html';
  row.innerHTML='';
  NAV_ITEMS.forEach(function(item){
   const a=document.createElement('a');
   const active=(item[0]==='index.html'&&(current===''||current==='index.html'))||current===item[0];
   a.className='nav-item rich-nav-item'+(active?' active':'');
   a.href=item[0];
   a.setAttribute('aria-label',item[1].replace('<br>',' '));
   const art=document.createElement('div');art.className='nav-art rich-art';
   const img=document.createElement('img');img.src=item[2]+'?v=20260828';img.alt='';img.setAttribute('aria-hidden','true');img.loading='eager';img.decoding='async';art.appendChild(img);
   const label=document.createElement('span');label.className='nav-label';label.innerHTML=item[1];
   a.append(art,label);row.appendChild(a);
  });
 });
 if(document.getElementById('rich-village-nav-style'))return;
 const style=document.createElement('style');style.id='rich-village-nav-style';style.textContent=`
.nav-row{grid-template-columns:repeat(7,minmax(0,1fr))!important;gap:0!important;align-items:end!important}
.rich-nav-item{min-width:0!important;width:100%!important;text-align:center!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:flex-end!important;gap:6px!important}
.rich-art{width:100%!important;height:220px!important;display:flex!important;align-items:flex-end!important;justify-content:center!important;overflow:hidden!important}
.rich-art img{display:block!important;width:100%!important;height:100%!important;max-width:190px!important;object-fit:contain!important;object-position:center bottom!important}
.rich-nav-item:first-child .rich-art img,.rich-nav-item:nth-child(2) .rich-art img{max-width:205px!important}
.rich-nav-item .nav-label{display:block!important;font-size:clamp(14px,1.45vw,20px)!important;line-height:1.04!important;color:#174f57!important;text-align:center!important}
.rich-nav-item.active .nav-label{font-weight:700!important}
.rich-nav-item.active:after{content:""!important;width:42px!important;height:3px!important;border-radius:999px!important;background:#b99458!important;margin-top:4px!important}
.nav-art svg{display:none!important}
@media(max-width:800px){.nav-band{overflow:hidden!important}.nav-row{width:100%!important;min-width:0!important;padding:6px 2px 9px!important}.rich-nav-item{gap:3px!important}.rich-art{height:120px!important}.rich-art img{max-width:100%!important}.rich-nav-item .nav-label{font-size:10px!important}.rich-nav-item.active:after{width:24px!important;height:2px!important;margin-top:3px!important}}
@media(max-width:430px){.nav-row{padding:5px 1px 8px!important}.rich-art{height:105px!important}.rich-nav-item .nav-label{font-size:9px!important}.rich-nav-item.active:after{width:20px!important;height:2px!important;margin-top:2px!important}}
`;document.head.appendChild(style);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
})();
