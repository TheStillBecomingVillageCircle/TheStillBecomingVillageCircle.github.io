/* The Still Becoming Village Circle — ONE navigation source for EVERY page. */
(function(){
'use strict';
const STYLE_ID='tsbvc-single-shell-style';
const NAV_ID='tsbvc-single-navigation';
/* This is the exact navigation artwork supplied for the Village. No alternate icon set. */
const NAV_SRC='/assets/B307A382-B6FC-4D8D-81C5-3047BDE8F4E3.png?v=20260829-EXACT-NAV-1';

function addStyles(){
 if(document.getElementById(STYLE_ID)) return;
 const s=document.createElement('style');
 s.id=STYLE_ID;
 s.textContent=`
html,body{width:100%!important;min-width:100%!important;max-width:none!important;margin:0!important;padding:0!important;overflow-x:hidden!important}
body{min-height:100vh!important}
.tsbvc-site-header{width:100%!important;background:rgba(255,255,255,.98)!important;border-bottom:1px solid rgba(22,84,91,.08)!important}
.tsbvc-header-inner{width:100%!important;max-width:1180px!important;min-height:88px!important;margin:0 auto!important;padding:14px 22px!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:18px!important;box-sizing:border-box!important}
.tsbvc-brand{display:flex!important;align-items:center!important;gap:10px!important;max-width:calc(100% - 70px)!important;color:#16545b!important;text-decoration:none!important;font-family:Georgia,'Times New Roman',serif!important;font-size:clamp(18px,2.6vw,32px)!important;font-weight:700!important;letter-spacing:-.035em!important;white-space:nowrap!important}
.tsbvc-brand svg{width:42px!important;height:42px!important;flex:none!important}
.tsbvc-menu{width:54px!important;height:54px!important;border-radius:50%!important;border:1px solid #dcebe8!important;background:#fff!important;box-shadow:0 7px 18px rgba(22,84,91,.09)!important;display:grid!important;place-items:center!important;flex:none!important}
.tsbvc-menu span,.tsbvc-menu span:before,.tsbvc-menu span:after{content:"";display:block;width:25px;height:3px;border-radius:3px;background:#28646a}
.tsbvc-menu span:before{transform:translateY(-8px)}
.tsbvc-menu span:after{transform:translateY(5px)}

#${NAV_ID}{position:relative!important;width:100%!important;max-width:1290px!important;margin:0 auto!important;padding:0!important;background:#fff!important;border-bottom:1px solid rgba(22,84,91,.08)!important;overflow:hidden!important;line-height:1!important}
#${NAV_ID} .tsbvc-nav-art{display:block!important;width:100%!important;height:auto!important;margin:0!important;padding:0!important;border:0!important;user-select:none!important;-webkit-user-drag:none!important}
#${NAV_ID} .tsbvc-nav-cover{position:absolute!important;left:0!important;right:0!important;bottom:0!important;height:22%!important;background:#fff!important;z-index:2!important}
#${NAV_ID} .tsbvc-nav-links{position:absolute!important;left:0!important;right:0!important;bottom:0!important;height:22%!important;display:grid!important;grid-template-columns:repeat(5,minmax(0,1fr)) 2fr!important;z-index:3!important}
#${NAV_ID} .tsbvc-nav-link{display:flex!important;align-items:center!important;justify-content:center!important;width:100%!important;height:100%!important;margin:0!important;padding:2px 3px 4px!important;box-sizing:border-box!important;color:#174f57!important;font-family:Georgia,'Times New Roman',serif!important;font-size:clamp(12px,2vw,25px)!important;line-height:1.05!important;text-align:center!important;text-decoration:none!important;background:transparent!important;border:0!important}
#${NAV_ID} .tsbvc-nav-link.active{font-weight:700!important;text-decoration:underline!important;text-decoration-color:#b99458!important;text-decoration-thickness:3px!important;text-underline-offset:7px!important}
#${NAV_ID} .tsbvc-nav-link:focus-visible{outline:3px solid #b99458!important;outline-offset:-4px!important}

@media(max-width:800px){
 .tsbvc-header-inner{min-height:72px!important;padding:10px 14px!important}
 .tsbvc-brand{font-size:17px!important;gap:7px!important}
 .tsbvc-brand svg{width:31px!important;height:31px!important}
 .tsbvc-menu{width:47px!important;height:47px!important}
 .tsbvc-menu span,.tsbvc-menu span:before,.tsbvc-menu span:after{width:23px!important;height:2.5px!important}
 #${NAV_ID} .tsbvc-nav-link{font-size:clamp(11px,3.1vw,16px)!important;padding-left:2px!important;padding-right:2px!important}
}
@media(max-width:430px){
 .tsbvc-header-inner{padding:9px 12px!important}
 .tsbvc-brand{font-size:16px!important}
 #${NAV_ID} .tsbvc-nav-cover{height:22%!important}
 #${NAV_ID} .tsbvc-nav-links{height:22%!important}
 #${NAV_ID} .tsbvc-nav-link{font-size:12px!important}
}
`;
 document.head.appendChild(s);
}

function makeHeader(){
 document.querySelectorAll('header').forEach(h=>h.remove());
 const h=document.createElement('header');
 h.className='tsbvc-site-header';
 h.innerHTML=`<div class="tsbvc-header-inner"><a class="tsbvc-brand" href="index.html" aria-label="The Still Becoming Village Circle"><svg viewBox="0 0 60 60" aria-hidden="true"><path d="M28 54C28 36 31 18 49 7" fill="none" stroke="#5d9258" stroke-width="4" stroke-linecap="round"/><path d="M34 24C40 11 50 10 57 10c-2 10-10 16-23 16Z" fill="#82ad68"/><path d="M27 34C18 23 8 23 3 27c3 9 12 14 24 14Z" fill="#6f9e61"/></svg><span>The Still Becoming Village Circle</span></a><button class="tsbvc-menu" type="button" aria-label="Open menu"><span></span></button></div>`;
 document.body.insertBefore(h,document.body.firstChild);
}

function makeNavigation(){
 /* Remove every previous shared/per-page navigation so two nav systems cannot fight. */
 document.querySelectorAll('nav,#'+NAV_ID+',.tsbvc-nav,.tsbvc-shared-nav-band,.nav-band,.destination-band').forEach(n=>n.remove());
 const n=document.createElement('nav');
 n.id=NAV_ID;
 n.setAttribute('aria-label','Village destinations');

 const img=document.createElement('img');
 img.className='tsbvc-nav-art';
 img.src=NAV_SRC;
 img.alt='Village navigation artwork: Home, Inside the Bubble, The Unknown, Experiences, Webspace, Connect and Support';
 img.setAttribute('draggable','false');

 /* The exact source artwork contains the original Connect and Support visuals. They remain together in slot 6. */
 const cover=document.createElement('div');
 cover.className='tsbvc-nav-cover';

 const links=document.createElement('div');
 links.className='tsbvc-nav-links';
 [
  ['index.html','Home'],
  ['about.html','Inside the Bubble'],
  ['LearningtheUnknown.html','The Unknown'],
  ['experiences.html','Experiences'],
  ['web-design.html','Webspace'],
  ['coming-together.html','Be Coming Together']
 ].forEach(([url,label],i)=>{
  const a=document.createElement('a');
  a.className='tsbvc-nav-link';
  a.href=url;
  a.setAttribute('aria-label',label);
  a.title=label;
  if((location.pathname.split('/').pop()||'index.html')===url) a.classList.add('active');
  links.appendChild(a);
 });

 n.appendChild(img);
 n.appendChild(cover);
 n.appendChild(links);
 document.querySelector('.tsbvc-site-header').insertAdjacentElement('afterend',n);
}

function install(){
 if(document.getElementById(NAV_ID)) return;
 addStyles();
 makeHeader();
 makeNavigation();
 window.TSBVCInstallSharedNav=install;
}

window.TSBVCInstallSharedNav=install;
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
else install();
})();
