/* The Still Becoming Village Circle — ONE shared navigation source. */
(function(){
'use strict';

const ITEMS=[
  ['index.html','Home','/assets/nav-home-correct.svg'],
  ['about.html','Inside the Bubble','/assets/nav-inside-bubble-correct.svg'],
  ['LearningtheUnknown.html','The Unknown','/assets/nav-unknown-correct.svg'],
  ['experiences.html','Experiences','/assets/nav-experiences-correct.svg'],
  ['web-design.html','Webspace','/assets/nav-webspace-correct.svg'],
  ['coming-together.html','Be Coming Together','/assets/nav-be-coming-together-correct.svg']
];
const CSS_ID='tsbvc-shared-nav-style';

function addStyles(){
  if(document.getElementById(CSS_ID)) return;
  const s=document.createElement('style');
  s.id=CSS_ID;
  s.textContent=`
.tsbvc-site-header{position:sticky!important;top:0!important;z-index:1000!important;width:100%!important;background:rgba(255,255,255,.97)!important;border-bottom:1px solid rgba(22,84,91,.08)!important;backdrop-filter:blur(12px)!important;-webkit-backdrop-filter:blur(12px)!important}
.tsbvc-site-header .tsbvc-header-inner{max-width:1180px!important;margin:0 auto!important;min-height:88px!important;padding:14px 22px!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:18px!important}
.tsbvc-brand{display:flex!important;align-items:center!important;gap:10px!important;color:#16545b!important;text-decoration:none!important;font-family:Georgia,'Times New Roman',serif!important;font-size:clamp(18px,2.6vw,32px)!important;font-weight:700!important;letter-spacing:-.035em!important;white-space:nowrap!important}
.tsbvc-brand svg{width:42px!important;height:42px!important;flex:none!important}
.tsbvc-menu{width:54px!important;height:54px!important;border-radius:50%!important;border:1px solid #dcebe8!important;background:#fff!important;box-shadow:0 7px 18px rgba(22,84,91,.09)!important;display:grid!important;place-items:center!important;flex:none!important}
.tsbvc-menu span,.tsbvc-menu span:before,.tsbvc-menu span:after{content:"";display:block;width:25px;height:3px;border-radius:3px;background:#28646a}
.tsbvc-menu span:before{transform:translateY(-8px)}.tsbvc-menu span:after{transform:translateY(5px)}
.tsbvc-shared-nav-band{display:block!important;width:100%!important;margin:0!important;padding:0!important;background:#fff!important;border-bottom:1px solid rgba(22,84,91,.08)!important;box-shadow:0 8px 24px rgba(22,84,91,.05)!important;overflow:hidden!important;position:relative!important;z-index:900!important}
.tsbvc-shared-nav-row{width:min(1290px,100%)!important;margin:0 auto!important;padding:8px 4px 12px!important;display:grid!important;grid-template-columns:repeat(6,minmax(0,1fr))!important;gap:2px!important;align-items:end!important}
.tsbvc-nav-item{min-width:0!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:flex-end!important;gap:5px!important;text-decoration:none!important;color:#174f57!important}
.tsbvc-nav-icon{display:block!important;width:100%!important;height:132px!important;object-fit:contain!important;object-position:center bottom!important}
.tsbvc-nav-label{display:block!important;width:100%!important;text-align:center!important;color:#174f57!important;font-family:Georgia,'Times New Roman',serif!important;font-size:clamp(14px,1.8vw,24px)!important;line-height:1.04!important;text-decoration:none!important;padding:0 3px!important;min-height:25px!important}
.tsbvc-nav-item[aria-current="page"] .tsbvc-nav-label{font-weight:700!important}
.tsbvc-nav-item[aria-current="page"] .tsbvc-nav-label:after{content:"";display:block;width:46px;height:3px;border-radius:3px;background:#b99458;margin:5px auto 0}
.ornament,.mask-ornament,.gold-mask,.mask-decoration,[class*="mask-ornament"],[class*="gold-mask"]{display:none!important}
@media(max-width:800px){
  .tsbvc-site-header .tsbvc-header-inner{min-height:72px;padding:10px 14px}
  .tsbvc-brand{font-size:17px;gap:7px}.tsbvc-brand svg{width:31px;height:31px}.tsbvc-menu{width:47px;height:47px}
  .tsbvc-menu span,.tsbvc-menu span:before,.tsbvc-menu span:after{width:23px;height:2.5px}
  .tsbvc-shared-nav-row{padding:7px 1px 10px;gap:0}.tsbvc-nav-item{gap:4px}.tsbvc-nav-icon{height:88px}
  .tsbvc-nav-label{font-size:11px;line-height:1.03;min-height:24px}.tsbvc-nav-item[aria-current="page"] .tsbvc-nav-label:after{width:30px;height:2px;margin-top:4px}
}
@media(max-width:430px){.tsbvc-nav-icon{height:78px}.tsbvc-nav-label{font-size:10px}}
`;
  document.head.appendChild(s);
}

function ensureHeader(){
  let header=document.querySelector('header');
  if(!header){header=document.createElement('header');document.body.insertBefore(header,document.body.firstChild)}
  header.className='tsbvc-site-header';
  header.innerHTML=`<div class="tsbvc-header-inner"><a class="tsbvc-brand" href="index.html" aria-label="The Still Becoming Village Circle"><svg viewBox="0 0 60 60" aria-hidden="true"><path d="M28 54C28 36 31 18 49 7" fill="none" stroke="#5d9258" stroke-width="4" stroke-linecap="round"/><path d="M34 24C40 11 50 10 57 10c-2 10-10 16-23 16Z" fill="#82ad68"/><path d="M27 34C18 23 8 23 3 27c3 9 12 14 24 14Z" fill="#6f9e61"/></svg><span>The Still Becoming Village Circle</span></a><button class="tsbvc-menu" type="button" aria-label="Open menu"><span></span></button></div>`;
  return header;
}

function install(){
  addStyles();
  const header=ensureHeader();
  document.querySelectorAll('.tsbvc-shared-nav-band,.nav-band,.destination-band').forEach(n=>n.remove());
  document.querySelectorAll('header > nav').forEach(n=>n.remove());
  document.querySelectorAll('.ornament,.mask-ornament,.gold-mask,.mask-decoration,[class*="mask-ornament"],[class*="gold-mask"]').forEach(n=>n.remove());

  const band=document.createElement('nav');band.className='tsbvc-shared-nav-band';band.setAttribute('aria-label','Village destinations');
  const row=document.createElement('div');row.className='tsbvc-shared-nav-row';
  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  ITEMS.forEach((item)=>{
    const a=document.createElement('a');a.href=item[0];a.className='tsbvc-nav-item';a.setAttribute('aria-label',item[1]);
    if(item[0].toLowerCase()===current)a.setAttribute('aria-current','page');
    const img=document.createElement('img');img.className='tsbvc-nav-icon';img.src=item[2]+'?v=20260829-12';img.alt='';img.decoding='async';img.setAttribute('aria-hidden','true');
    const label=document.createElement('span');label.className='tsbvc-nav-label';
    if(item[1]==='Inside the Bubble')label.innerHTML='Inside the<br>Bubble';
    else if(item[1]==='The Unknown')label.innerHTML='The<br>Unknown';
    else if(item[1]==='Be Coming Together')label.innerHTML='Be Coming<br>Together';
    else label.textContent=item[1];
    a.appendChild(img);a.appendChild(label);row.appendChild(a);
  });
  band.appendChild(row);header.insertAdjacentElement('afterend',band);window.TSBVCInstallSharedNav=install;
}

function ensureMusic(){
  if(window.__TSBVC_MUSIC__)return;
  if(document.querySelector('script[data-tsbvc-music]'))return;
  const s=document.createElement('script');s.src='village-music.js?v=20260829-12';s.dataset.tsbvcMusic='true';document.body.appendChild(s);
}

window.TSBVCInstallSharedNav=install;
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){install();ensureMusic()},{once:true});
else{install();ensureMusic();}
})();
