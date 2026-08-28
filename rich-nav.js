/* Site-wide illustrated navigation. Approved artwork only. */
(function(){
'use strict';
function apply(){
 const rows=document.querySelectorAll('.nav-row');
 if(!rows.length) return;
 rows.forEach(function(row){
  if(row.dataset.richNavApplied==='true') return;
  row.dataset.richNavApplied='true';
  const items=[['index.html','Home'],['about.html','Inside the<br>Bubble'],['LearningtheUnknown.html','The<br>Unknown'],['events.html','Experiences'],['web-design.html','Webspace'],['contact.html','Connect'],['coaching.html','Support']];
  const p=location.pathname.split('/').pop()||'index.html';
  row.innerHTML='';
  items.forEach(function(it,i){
   const a=document.createElement('a');
   a.className='nav-item rich-nav-item'+(((it[0]==='index.html'&&(p===''||p==='index.html'))||p===it[0])?' active':'');
   a.href=it[0];
   const art=document.createElement('div'); art.className='nav-art rich-art rich-'+i;
   if(i===0 || i===1){
    const img=document.createElement('img');
    img.src=i===0 ? '/assets/home-button-exact.jpg?v=20260827-1855' : '/assets/inside-bubble-exact.jpg?v=20260827-1855';
    img.alt=it[1].replace('<br>',' ');
    img.loading='eager';
    art.appendChild(img);
   }
   const label=document.createElement('span'); label.className='nav-label'; label.innerHTML=it[1];
   a.append(art,label); row.appendChild(a);
  });
 });
 if(document.getElementById('rich-village-nav-style')) return;
 const s=document.createElement('style'); s.id='rich-village-nav-style'; s.textContent=`
/* Exact illustrated Village navigation — scaled down as one cohesive system. */
.nav-row{grid-template-columns:repeat(7,minmax(0,1fr))!important;gap:0!important;align-items:end!important}
.rich-art{height:220px!important;width:100%!important;background-image:url('/assets/rich-nav-sprite.svg?v=20260827-1855')!important;background-repeat:no-repeat!important;background-position-y:bottom!important;background-size:900px 232px!important}
.rich-0,.rich-1{background-image:none!important;background-position:0 0!important}
.rich-0 img,.rich-1 img{display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;object-position:center bottom!important}
.rich-0 + .nav-label{display:block!important}.rich-0.active:after{display:block!important}
.rich-1 + .nav-label{display:block!important}.rich-1 + .nav-label:after{display:none!important}.rich-1 img{padding:0!important}
.rich-2{background-position-x:-257px!important}.rich-3{background-position-x:-398px!important}.rich-4{background-position-x:-527px!important}.rich-5{background-position-x:-668px!important}.rich-6{background-position-x:-785px!important}
.nav-art svg{display:none!important}.nav-label{font-size:clamp(14px,1.45vw,20px)!important;line-height:1.04!important}
@media(max-width:800px){
 .nav-band{overflow:hidden!important}
 .nav-row{width:100%!important;min-width:0!important;padding:6px 2px 9px!important}
 .rich-art{height:120px!important;background-size:466px 120px!important}
 .rich-2{background-position-x:-133px!important}.rich-3{background-position-x:-212px!important}.rich-4{background-position-x:-281px!important}.rich-5{background-position-x:-347px!important}.rich-6{background-position-x:-406px!important}
 .nav-label{font-size:10px!important}
 .nav-item{gap:3px!important}
 .nav-item.active:after{width:24px!important;height:2px!important;margin-top:3px!important}
}
@media(max-width:430px){
 .nav-row{width:100%!important;min-width:0!important;padding:5px 1px 8px!important}
 .rich-art{height:105px!important;background-size:408px 105px!important}
 .rich-2{background-position-x:-116px!important}.rich-3{background-position-x:-185px!important}.rich-4{background-position-x:-246px!important}.rich-5{background-position-x:-304px!important}.rich-6{background-position-x:-355px!important}
 .nav-label{font-size:9px!important}
 .nav-item{gap:2px!important}
 .nav-item.active:after{width:20px!important;height:2px!important;margin-top:2px!important}
}
`;
 document.head.appendChild(s);
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true}); else apply();
})();
