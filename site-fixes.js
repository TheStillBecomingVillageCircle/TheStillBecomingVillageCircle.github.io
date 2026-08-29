/* The Still Becoming Village Circle — shared site shell. */
(function(){
'use strict';
const CSS_ID='tsbvc-shared-nav-style';
function addStyles(){
 if(document.getElementById(CSS_ID))return;
 const s=document.createElement('style');s.id=CSS_ID;s.textContent=`
.tsbvc-site-header{position:sticky!important;top:0!important;z-index:1000!important;width:100%!important;background:rgba(255,255,255,.97)!important;border-bottom:1px solid rgba(22,84,91,.08)!important;backdrop-filter:blur(12px)!important;-webkit-backdrop-filter:blur(12px)!important}
.tsbvc-site-header .tsbvc-header-inner{max-width:1180px!important;margin:0 auto!important;min-height:88px!important;padding:14px 22px!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:18px!important}
.tsbvc-brand{display:flex!important;align-items:center!important;gap:10px!important;color:#16545b!important;text-decoration:none!important;font-family:Georgia,'Times New Roman',serif!important;font-size:clamp(18px,2.6vw,32px)!important;font-weight:700!important;letter-spacing:-.035em!important;white-space:nowrap!important}.tsbvc-brand svg{width:42px!important;height:42px!important;flex:none!important}
.tsbvc-menu{width:54px!important;height:54px!important;border-radius:50%!important;border:1px solid #dcebe8!important;background:#fff!important;box-shadow:0 7px 18px rgba(22,84,91,.09)!important;display:grid!important;place-items:center!important;flex:none!important}.tsbvc-menu span,.tsbvc-menu span:before,.tsbvc-menu span:after{content:"";display:block;width:25px;height:3px;border-radius:3px;background:#28646a}.tsbvc-menu span:before{transform:translateY(-8px)}.tsbvc-menu span:after{transform:translateY(5px)}
.tsbvc-nav{display:grid!important;grid-template-columns:repeat(6,1fr)!important;width:100%!important;max-width:1200px!important;margin:0 auto!important;background:#fff!important;border-bottom:1px solid rgba(22,84,91,.08)!important;box-shadow:0 8px 24px rgba(22,84,91,.05)!important}
.tsbvc-nav-item{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:flex-end!important;min-height:180px!important;padding:18px 8px 12px!important;color:#16545b!important;text-decoration:none!important;font-family:Georgia,'Times New Roman',serif!important;font-size:18px!important;font-weight:600!important;text-align:center!important;line-height:1.05!important}.tsbvc-nav-item img{display:block!important;width:82px!important;height:112px!important;object-fit:contain!important;margin:0 auto 8px!important}.tsbvc-nav-item.active span:after{content:"";display:block!important;width:38px!important;height:3px!important;margin:6px auto 0!important;background:#d2ae62!important;border-radius:3px!important}
@media(max-width:800px){.tsbvc-site-header .tsbvc-header-inner{min-height:72px;padding:10px 14px}.tsbvc-brand{font-size:17px;gap:7px}.tsbvc-brand svg{width:31px;height:31px}.tsbvc-menu{width:47px;height:47px}.tsbvc-menu span,.tsbvc-menu span:before,.tsbvc-menu span:after{width:23px;height:2.5px}.tsbvc-nav{grid-template-columns:repeat(6,1fr)}.tsbvc-nav-item{min-height:122px;padding:8px 2px 9px;font-size:12px}.tsbvc-nav-item img{width:48px;height:70px;margin-bottom:5px}.tsbvc-nav-item.active span:after{width:28px;height:2px;margin-top:4px}}
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
 addStyles();const header=ensureHeader();
 document.querySelectorAll('.tsbvc-nav,.tsbvc-shared-nav-band,.nav-band,.destination-band').forEach(n=>n.remove());
 document.querySelectorAll('.ornament,.mask-ornament,.gold-mask,.mask-decoration,[class*="mask-ornament"],[class*="gold-mask"]').forEach(n=>n.remove());
 const nav=document.createElement('nav');nav.className='tsbvc-nav';nav.setAttribute('aria-label','Village destinations');
 const items=[
  ['index.html','/assets/nav-home-correct.svg','Home'],
  ['about.html','/assets/nav-inside-bubble-correct.svg','Inside the Bubble'],
  ['LearningtheUnknown.html','/assets/nav-unknown-correct.svg','The Unknown'],
  ['experiences.html','/assets/nav-experiences-correct.svg','Experiences'],
  ['web-design.html','/assets/nav-webspace-correct.svg','Webspace'],
  ['coming-together.html','/assets/nav-be-coming-together-correct.svg','Be Coming Together']
 ];
 const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
 items.forEach(([url,src,label])=>{const a=document.createElement('a');a.className='tsbvc-nav-item'+(current===url.toLowerCase()?' active':'');a.href=url;a.innerHTML='<img src="'+src+'" alt=""><span>'+label+'</span>';nav.appendChild(a)});
 header.insertAdjacentElement('afterend',nav);
 window.TSBVCInstallSharedNav=install;
}
function ensureMusic(){
 if(window.__TSBVC_MUSIC__)return;if(document.querySelector('script[data-tsbvc-music]'))return;
 const s=document.createElement('script');s.src='village-music.js?v=20260829-14';s.dataset.tsbvcMusic='true';document.body.appendChild(s);
}
window.TSBVCInstallSharedNav=install;
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){install();ensureMusic()},{once:true});else{install();ensureMusic();}
})();
