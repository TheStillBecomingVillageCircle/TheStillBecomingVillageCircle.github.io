/* Site-wide Village navigation. One source of truth. */
(function(){
'use strict';
const ART='/assets/B307A382-B6FC-4D8D-81C5-3047BDE8F4E3.png?v=20260828-8';
const ITEMS=[
 ['index.html','Home'],
 ['about.html','Inside the Bubble'],
 ['LearningtheUnknown.html','The Unknown'],
 ['events.html','Experiences'],
 ['web-design.html','Webspace'],
 ['coming-together.html','The Coming Together']
];
function install(){
 const header=document.querySelector('header'); if(!header)return;
 document.querySelectorAll('.tsbvc-shared-nav-band,.nav-band,.destination-band').forEach(function(n){n.remove()});
 document.querySelectorAll('header > nav').forEach(function(n){n.remove()});
 const band=document.createElement('nav');
 band.className='tsbvc-shared-nav-band';
 band.setAttribute('aria-label','Village navigation');
 const scroll=document.createElement('div'); scroll.className='tsbvc-nav-scroll';
 const row=document.createElement('div'); row.className='tsbvc-nav-row';
 const img=document.createElement('img'); img.className='tsbvc-nav-art'; img.src=ART; img.alt='Home, Inside the Bubble, The Unknown, Experiences, Webspace, The Coming Together'; row.appendChild(img);
 const left=[0,14.3,28.6,42.7,57.8,72.1], widths=[14.3,14.3,14.1,15.1,14.3,27.9];
 ITEMS.forEach(function(item,i){const a=document.createElement('a');a.href=item[0];a.className='tsbvc-nav-link';a.setAttribute('aria-label',item[1]);a.style.left=left[i]+'%';a.style.width=widths[i]+'%';row.appendChild(a)});
 scroll.appendChild(row); band.appendChild(scroll); header.insertAdjacentElement('afterend',band);
 if(document.getElementById('tsbvc-nav-style'))return;
 const s=document.createElement('style');s.id='tsbvc-nav-style';s.textContent=`
.tsbvc-shared-nav-band{width:100%;background:#fff;border-bottom:1px solid rgba(22,84,91,.08);box-shadow:0 8px 24px rgba(22,84,91,.05);overflow:hidden}
.tsbvc-nav-scroll{width:100%;overflow:hidden;-webkit-overflow-scrolling:touch}
.tsbvc-nav-row{position:relative;width:min(970px,75vw);min-width:630px;margin:0 auto;line-height:0}
.tsbvc-nav-art{display:block;width:100%;height:auto;margin:0;padding:0;border:0}
.tsbvc-nav-link{position:absolute;top:0;height:100%;display:block;z-index:10}
.tsbvc-nav-link:focus-visible{outline:3px solid #b99458;outline-offset:-4px;border-radius:10px}
@media(max-width:700px){.tsbvc-nav-row{width:100%;min-width:0}.tsbvc-nav-art{width:100%;height:auto}}
`;
 document.head.appendChild(s);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
