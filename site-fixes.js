/* The Still Becoming Village Circle — SINGLE shared site shell.
   Navigation source of truth: /assets/village-nav-6-exact.svg
*/
(function(){
'use strict';
const STYLE_ID='tsbvc-single-shell-style';
const NAV_ID='tsbvc-single-navigation';
const NAV_SRC='/assets/village-nav-6-exact.svg?v=20260829-8';

function addStyles(){
 if(document.getElementById(STYLE_ID)) return;
 const s=document.createElement('style'); s.id=STYLE_ID;
 s.textContent=`
html,body{width:100%!important;min-width:100%!important;max-width:none!important;margin:0!important;padding:0!important;overflow-x:hidden!important}
body{min-height:100vh!important}
.tsbvc-site-header{position:sticky!important;top:0!important;z-index:10000!important;width:100%!important;background:rgba(255,255,255,.97)!important;border-bottom:1px solid rgba(22,84,91,.08)!important;backdrop-filter:blur(12px)!important;-webkit-backdrop-filter:blur(12px)!important}
.tsbvc-header-inner{width:100%!important;max-width:1180px!important;min-height:88px!important;margin:0 auto!important;padding:14px 22px!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:18px!important;box-sizing:border-box!important}
.tsbvc-brand{display:flex!important;align-items:center!important;gap:10px!important;max-width:calc(100% - 70px)!important;color:#16545b!important;text-decoration:none!important;font-family:Georgia,'Times New Roman',serif!important;font-size:clamp(18px,2.6vw,32px)!important;font-weight:700!important;letter-spacing:-.035em!important;white-space:nowrap!important}
.tsbvc-brand svg{width:42px!important;height:42px!important;flex:none!important}
.tsbvc-menu{width:54px!important;height:54px!important;border-radius:50%!important;border:1px solid #dcebe8!important;background:#fff!important;box-shadow:0 7px 18px rgba(22,84,91,.09)!important;display:grid!important;place-items:center!important;flex:none!important}
.tsbvc-menu span,.tsbvc-menu span:before,.tsbvc-menu span:after{content:"";display:block;width:25px;height:3px;border-radius:3px;background:#28646a}
.tsbvc-menu span:before{transform:translateY(-8px)}.tsbvc-menu span:after{transform:translateY(5px)}
#${NAV_ID}{position:relative!important;width:100%!important;max-width:1200px!important;margin:0 auto!important;padding:0!important;background:#fff!important;border-bottom:1px solid rgba(22,84,91,.08)!important;box-shadow:0 8px 24px rgba(22,84,91,.05)!important;line-height:0!important;overflow:hidden!important}
#${NAV_ID} .tsbvc-nav-art{display:block!important;width:100%!important;height:auto!important;margin:0!important;padding:0!important;border:0!important}
#${NAV_ID} .tsbvc-nav-links{position:absolute!important;inset:0!important;display:grid!important;grid-template-columns:repeat(6,minmax(0,1fr))!important;width:100%!important;height:100%!important;margin:0!important;padding:0!important}
#${NAV_ID} .tsbvc-nav-link{display:block!important;width:100%!important;height:100%!important;min-width:0!important;min-height:0!important;margin:0!important;padding:0!important;color:transparent!important;text-decoration:none!important;background:transparent!important;border:0!important}
#${NAV_ID} .tsbvc-nav-link:focus-visible{outline:3px solid #b99458!important;outline-offset:-5px!important}
@media(max-width:800px){
 .tsbvc-header-inner{min-height:72px!important;padding:10px 14px!important}
 .tsbvc-brand{font-size:17px!important;gap:7px!important}.tsbvc-brand svg{width:31px!important;height:31px!important}
 .tsbvc-menu{width:47px!important;height:47px!important}.tsbvc-menu span,.tsbvc-menu span:before,.tsbvc-menu span:after{width:23px!important;height:2.5px!important}
 #${NAV_ID}{width:100vw!important;max-width:100vw!important}
}
@media(max-width:430px){.tsbvc-header-inner{padding:9px 12px!important}.tsbvc-brand{font-size:16px!important}}
`;
 document.head.appendChild(s);
}

function makeHeader(){
 const old=document.querySelector('header');
 if(old) old.remove();
 const header=document.createElement('header'); header.className='tsbvc-site-header';
 header.innerHTML=`<div class="tsbvc-header-inner"><a class="tsbvc-brand" href="index.html" aria-label="The Still Becoming Village Circle"><svg viewBox="0 0 60 60" aria-hidden="true"><path d="M28 54C28 36 31 18 49 7" fill="none" stroke="#5d9258" stroke-width="4" stroke-linecap="round"/><path d="M34 24C40 11 50 10 57 10c-2 10-10 16-23 16Z" fill="#82ad68"/><path d="M27 34C18 23 8 23 3 27c3 9 12 14 24 14Z" fill="#6f9e61"/></svg><span>The Still Becoming Village Circle</span></a><button class="tsbvc-menu" type="button" aria-label="Open menu"><span></span></button></div>`;
 document.body.insertBefore(header,document.body.firstChild);
}

function makeNavigation(){
 document.querySelectorAll('#'+NAV_ID+',.tsbvc-nav,.tsbvc-shared-nav-band,.nav-band,.destination-band').forEach(n=>n.remove());
 const nav=document.createElement('nav'); nav.id=NAV_ID; nav.setAttribute('aria-label','Village destinations');
 const img=document.createElement('img'); img.className='tsbvc-nav-art'; img.src=NAV_SRC; img.alt='Village navigation: Home, Inside the Bubble, The Unknown, Experiences, Webspace, Be Coming Together'; img.setAttribute('draggable','false');
 const links=document.createElement('div'); links.className='tsbvc-nav-links';
 [['index.html','Home'],['about.html','Inside the Bubble'],['LearningtheUnknown.html','The Unknown'],['experiences.html','Experiences'],['web-design.html','Webspace'],['coming-together.html','Be Coming Together']].forEach(([url,label])=>{const a=document.createElement('a');a.className='tsbvc-nav-link';a.href=url;a.setAttribute('aria-label',label);a.title=label;links.appendChild(a)});
 nav.appendChild(img); nav.appendChild(links);
 document.querySelector('.tsbvc-site-header').insertAdjacentElement('afterend',nav);
}

function loadOnce(src,id){
 if(document.getElementById(id)||document.querySelector('script[src*="'+src+'"]')) return;
 const s=document.createElement('script'); s.id=id; s.src=src; s.async=false; document.body.appendChild(s);
}

function install(){
 addStyles(); makeHeader(); makeNavigation();
 // Non-navigation enhancements and music remain in their existing script.
 loadOnce('village-persistence.js','tsbvc-persistence-loader');
 window.TSBVCInstallSharedNav=install;
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true}); else install();
})();
