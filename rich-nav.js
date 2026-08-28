/* Legacy entry point kept for older pages. site-fixes.js owns the shared navigation. */
(function(){
'use strict';
function wait(){
  /* If the new shared navigation is already installed, never create a second one. */
  if(document.querySelector('.tsbvc-shared-nav-band')) return;
  /* Otherwise install the same exact artwork as a compatibility fallback. */
  const ART='/assets/B307A382-B6FC-4D8D-81C5-3047BDE8F4E3.png?v=20260828-6';
  const ITEMS=[['index.html','Home'],['about.html','Inside the Bubble'],['LearningtheUnknown.html','The Unknown'],['events.html','Experiences'],['web-design.html','Webspace'],['contact.html','Connect'],['coaching.html','Support']];
  document.querySelectorAll('.nav-band,.destination-band,header>nav').forEach(function(n){n.remove()});
  const header=document.querySelector('header'); if(!header)return;
  const band=document.createElement('nav'); band.className='nav-band'; band.setAttribute('aria-label','Village destinations');
  const row=document.createElement('div'); row.className='nav-row'; row.style.cssText='position:relative;display:block;width:100%;max-width:1200px;margin:0 auto;padding:0;line-height:0';
  const img=document.createElement('img'); img.src=ART; img.alt='Home, Inside the Bubble, The Unknown, Experiences, Webspace, Connect, Support'; img.style.cssText='display:block;width:100%;height:auto;margin:0;padding:0;border:0'; row.appendChild(img);
  ITEMS.forEach(function(item,i){const a=document.createElement('a');a.href=item[0];a.setAttribute('aria-label',item[1]);a.style.cssText='position:absolute;top:0;height:100%;display:block;z-index:10;left:'+([0,14.3,28.6,42.7,57.8,72.1,85.6][i])+'%;width:'+([14.3,14.3,14.1,15.1,14.3,13.5,14.4][i])+'%';row.appendChild(a)});
  band.appendChild(row); header.insertAdjacentElement('afterend',band);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wait,{once:true});else wait();
})();
