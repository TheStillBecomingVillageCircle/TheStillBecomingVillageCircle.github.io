/* The Still Becoming Village Circle — shared navigation. */
(function () {
  'use strict';
  const ART='/assets/B307A382-B6FC-4D8D-81C5-3047BDE8F4E3.png?v=20260828-7';
  const ITEMS=[['index.html','Home'],['about.html','Inside the Bubble'],['LearningtheUnknown.html','The Unknown'],['events.html','Experiences'],['web-design.html','Webspace'],['contact.html','Connect'],['coaching.html','Support']];

  function styles(){
    if(document.getElementById('tsbvc-shared-nav-style')) return;
    const s=document.createElement('style');
    s.id='tsbvc-shared-nav-style';
    s.textContent=`
.tsbvc-shared-nav-band{display:block!important;width:100%!important;margin:0!important;padding:0!important;background:#fff!important;border-bottom:1px solid rgba(22,84,91,.08)!important;box-shadow:0 8px 24px rgba(22,84,91,.05)!important;overflow:hidden!important;position:relative!important;z-index:40!important}
.tsbvc-shared-nav-row{position:relative!important;display:block!important;width:100%!important;max-width:1200px!important;min-width:0!important;margin:0 auto!important;padding:0!important;line-height:0!important}
.tsbvc-shared-nav-art{display:block!important;width:100%!important;height:auto!important;margin:0!important;padding:0!important;border:0!important}
.tsbvc-shared-nav-link{position:absolute!important;top:0!important;height:100%!important;display:block!important;z-index:10!important;background:transparent!important;text-decoration:none!important}
.tsbvc-shared-nav-link-0{left:0;width:14.3%}.tsbvc-shared-nav-link-1{left:14.3%;width:14.3%}.tsbvc-shared-nav-link-2{left:28.6%;width:14.1%}.tsbvc-shared-nav-link-3{left:42.7%;width:15.1%}.tsbvc-shared-nav-link-4{left:57.8%;width:14.3%}.tsbvc-shared-nav-link-5{left:72.1%;width:13.5%}.tsbvc-shared-nav-link-6{left:85.6%;width:14.4%}
@media(max-width:700px){.tsbvc-shared-nav-row{width:100%!important;max-width:none!important}.tsbvc-shared-nav-art{width:100%!important}}
/* Do not allow legacy decorative mask/ornament elements to return. */
.ornament,.mask-ornament,.gold-mask,.mask-decoration,[class*="mask-ornament"],[class*="gold-mask"]{display:none!important}
`;
    document.head.appendChild(s);
  }

  function install(){
    if(window.__TSBVC_SHARED_NAV_DONE__) return;
    window.__TSBVC_SHARED_NAV_DONE__=true;
    styles();
    document.querySelectorAll('.tsbvc-shared-nav-band,.nav-band,.destination-band,header>nav').forEach(function(n){n.remove()});
    document.querySelectorAll('.ornament,.mask-ornament,.gold-mask,.mask-decoration,[class*="mask-ornament"],[class*="gold-mask"]').forEach(function(n){n.remove()});
    const header=document.querySelector('header');
    if(!header) return;
    const band=document.createElement('nav');
    band.className='tsbvc-shared-nav-band';
    band.setAttribute('aria-label','Village destinations');
    const row=document.createElement('div');
    row.className='tsbvc-shared-nav-row';
    const img=document.createElement('img');
    img.className='tsbvc-shared-nav-art';
    img.src=ART;
    img.alt='Home, Inside the Bubble, The Unknown, Experiences, Webspace, Connect, Support';
    img.decoding='async';
    row.appendChild(img);
    const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
    ITEMS.forEach(function(item,i){
      const a=document.createElement('a');
      a.href=item[0];
      a.className='tsbvc-shared-nav-link tsbvc-shared-nav-link-'+i;
      a.setAttribute('aria-label',item[1]);
      if(item[0].toLowerCase()===current) a.setAttribute('aria-current','page');
      row.appendChild(a);
    });
    band.appendChild(row);
    header.insertAdjacentElement('afterend',band);
    document.body.classList.add('tsbvc-shared-nav-page');
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
