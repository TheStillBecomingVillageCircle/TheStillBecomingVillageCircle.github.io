/* Rich Village navigation layer — use the approved illustrated composition. */
(function(){
'use strict';
function apply(){
 const row=document.querySelector('.nav-row');
 if(!row || row.dataset.richNavApplied==='true') return;
 row.dataset.richNavApplied='true';
 const items=[['index.html','Home'],['about.html','Inside the<br>Bubble'],['LearningtheUnknown.html','The<br>Unknown'],['events.html','Experiences'],['web-design.html','Webspace'],['contact.html','Connect'],['coaching.html','Support']];
 const p=location.pathname.split('/').pop()||'index.html';
 row.innerHTML='';
 items.forEach((it,i)=>{
  const a=document.createElement('a');
  a.className='nav-item'+(((it[0]==='index.html'&&(p===''||p==='index.html'))||p===it[0])?' active':'');
  a.href=it[0];
  const art=document.createElement('div'); art.className='nav-art rich-art rich-'+i;
  const label=document.createElement('span'); label.className='nav-label'; label.innerHTML=it[1];
  a.append(art,label); row.appendChild(a);
 });
 const s=document.createElement('style'); s.id='rich-village-nav-style'; s.textContent=`
.nav-row{grid-template-columns:repeat(7,minmax(0,1fr))!important;gap:0!important;align-items:end!important}
.rich-art{height:309px!important;width:100%!important;background-image:url('/assets/rich-nav-sprite.svg')!important;background-repeat:no-repeat!important;background-position-y:bottom!important;background-size:1200px 309px!important}
.rich-0{background-position-x:0!important}.rich-1{background-position-x:-171px!important}.rich-2{background-position-x:-343px!important}.rich-3{background-position-x:-531px!important}.rich-4{background-position-x:-703px!important}.rich-5{background-position-x:-891px!important}.rich-6{background-position-x:-1046px!important}
.nav-art svg{display:none!important}.nav-label{font-size:clamp(15px,1.8vw,24px)!important;line-height:1.04!important}
@media(max-width:800px){.nav-band{overflow-x:auto!important;scrollbar-width:none!important}.nav-band::-webkit-scrollbar{display:none!important}.nav-row{width:max(100%,980px)!important;min-width:980px!important;padding:8px 4px 13px!important}.rich-art{height:252px!important;background-size:980px 252px!important}.rich-0{background-position-x:0!important}.rich-1{background-position-x:-140px!important}.rich-2{background-position-x:-280px!important}.rich-3{background-position-x:-434px!important}.rich-4{background-position-x:-574px!important}.rich-5{background-position-x:-728px!important}.rich-6{background-position-x:-854px!important}.nav-label{font-size:17px!important}}
@media(max-width:430px){.nav-row{width:max(100%,910px)!important;min-width:910px!important}.rich-art{height:234px!important;background-size:910px 234px!important}.rich-0{background-position-x:0!important}.rich-1{background-position-x:-130px!important}.rich-2{background-position-x:-260px!important}.rich-3{background-position-x:-403px!important}.rich-4{background-position-x:-533px!important}.rich-5{background-position-x:-676px!important}.rich-6{background-position-x:-793px!important}.nav-label{font-size:15px!important}}
`;
 document.head.appendChild(s);
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true}); else apply();
})();