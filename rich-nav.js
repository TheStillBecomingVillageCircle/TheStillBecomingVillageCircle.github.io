/* Site-wide illustrated navigation — exact approved composite artwork. */
(function(){
'use strict';
const ITEMS=[
 ['index.html','Home'],['about.html','Inside the Bubble'],['LearningtheUnknown.html','The Unknown'],
 ['events.html','Experiences'],['web-design.html','Webspace'],['contact.html','Connect'],['coaching.html','Support']
];
function apply(){
 const rows=document.querySelectorAll('.nav-row'); if(!rows.length)return;
 rows.forEach(function(row){
  if(row.dataset.richNavApplied==='true')return;
  row.dataset.richNavApplied='true';
  row.innerHTML='';
  const wrap=document.createElement('div'); wrap.className='exact-nav-wrap';
  const img=document.createElement('img'); img.className='exact-nav-art';
  /* Use the actual PNG artwork. Do not use the SVG-with-embedded-WebP version; Safari can render that incorrectly. */
  img.src='/assets/B307A382-B6FC-4D8D-81C5-3047BDE8F4E3.png?v=20260828-2';
  img.alt='Home, Inside the Bubble, The Unknown, Experiences, Webspace, Connect, Support';
  wrap.appendChild(img);
  ITEMS.forEach(function(item,i){
   const a=document.createElement('a');
   a.href=item[0]; a.className='exact-nav-link exact-nav-link-'+i;
   a.setAttribute('aria-label',item[1]);
   wrap.appendChild(a);
  });
  row.appendChild(wrap);
 });
 if(document.getElementById('exact-village-nav-style'))return;
 const s=document.createElement('style'); s.id='exact-village-nav-style'; s.textContent=`
.nav-row{display:block!important;width:100%!important;min-width:0!important;padding:0!important;margin:0!important;overflow:hidden!important}
.exact-nav-wrap{position:relative;width:min(75vw,970px);min-width:630px;margin:0 auto;line-height:0}
.exact-nav-art{display:block;width:100%;height:auto;margin:0;padding:0;border:0}
.exact-nav-link{position:absolute;top:0;height:100%;display:block;z-index:10}
.exact-nav-link-0{left:0;width:14.3%}.exact-nav-link-1{left:14.3%;width:14.3%}.exact-nav-link-2{left:28.6%;width:14.1%}
.exact-nav-link-3{left:42.7%;width:15.1%}.exact-nav-link-4{left:57.8%;width:14.3%}.exact-nav-link-5{left:72.1%;width:13.5%}.exact-nav-link-6{left:85.6%;width:14.4%}
.exact-nav-link:focus-visible{outline:3px solid #b99458;outline-offset:-4px;border-radius:10px}
@media(max-width:700px){
 .nav-band{overflow-x:auto!important;overflow-y:hidden!important;-webkit-overflow-scrolling:touch!important}
 /* Keep the same smaller sizing used in the intended mobile design. */
 .exact-nav-wrap{width:630px;min-width:630px;max-width:none;margin:0}
}
`;
 document.head.appendChild(s);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
})();
