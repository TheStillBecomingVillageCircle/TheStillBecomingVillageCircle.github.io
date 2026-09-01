/* The Still Becoming Village Circle — ONE navigation source for EVERY page. */
(function(){
'use strict';

const STYLE_ID='tsbvc-single-shell-style';
const NAV_ID='tsbvc-single-navigation';

/* EXACT artwork requested by Kendra. These are the six individual navigation icons.
   No composite sprite, no alternate navigation artwork, no Support icon, no mask/ornament. */
const ITEMS=[
  ['index.html','Home','/assets/nav-home-correct.svg'],
  ['about.html','Inside the Bubble','/assets/nav-inside-bubble-correct.svg'],
  ['LearningtheUnknown.html','The Unknown','/assets/nav-unknown-correct.svg'],
  ['events.html','Experiences','/assets/nav-experiences-correct.svg'],
  ['web-design.html','Webspace','/assets/nav-webspace-correct.svg'],
  ['coming-together.html','Be Coming Together','/assets/nav-be-coming-together-correct.svg']
];

function addStyles(){
  if(document.getElementById(STYLE_ID)) return;
  const s=document.createElement('style');
  s.id=STYLE_ID;
  s.textContent=`
html,body{width:100%!important;min-width:100%!important;max-width:none!important;margin:0!important;padding:0!important;overflow-x:hidden!important}
body{min-height:100vh!important}

/* Remove every old navigation/ornament implementation. */
nav:not(#${NAV_ID}),.nav-band,.nav-row,.tsbvc-nav,.tsbvc-shared-nav-band,.destination-band,.ornament{display:none!important}

.tsbvc-site-header{width:100%!important;background:rgba(255,255,255,.98)!important;border-bottom:1px solid rgba(22,84,91,.08)!important;position:relative!important;z-index:50!important}
.tsbvc-header-inner{width:100%!important;max-width:1180px!important;min-height:88px!important;margin:0 auto!important;padding:14px 22px!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:18px!important;box-sizing:border-box!important}
.tsbvc-brand{display:flex!important;align-items:center!important;gap:10px!important;max-width:calc(100% - 70px)!important;color:#16545b!important;text-decoration:none!important;font-family:Georgia,'Times New Roman',serif!important;font-size:clamp(18px,2.6vw,32px)!important;font-weight:700!important;letter-spacing:-.035em!important;white-space:nowrap!important}
.tsbvc-brand svg{width:42px!important;height:42px!important;flex:none!important}
.tsbvc-menu{width:54px!important;height:54px!important;border-radius:50%!important;border:1px solid #dcebe8!important;background:#fff!important;box-shadow:0 7px 18px rgba(22,84,91,.09)!important;display:grid!important;place-items:center!important;flex:none!important}
.tsbvc-menu span,.tsbvc-menu span:before,.tsbvc-menu span:after{content:"";display:block;width:25px;height:3px;border-radius:3px;background:#28646a}
.tsbvc-menu span:before{transform:translateY(-8px)}
.tsbvc-menu span:after{transform:translateY(5px)}

#${NAV_ID}{position:relative!important;width:100%!important;height:clamp(150px,22vw,250px)!important;margin:0!important;padding:0!important;background:#fff!important;border-bottom:1px solid rgba(22,84,91,.08)!important;box-sizing:border-box!important;z-index:40!important;display:grid!important;grid-template-columns:repeat(6,minmax(0,1fr))!important;align-items:end!important;overflow:hidden!important}
#${NAV_ID} .tsbvc-nav-link{position:relative!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:flex-end!important;width:100%!important;height:100%!important;min-width:0!important;margin:0!important;padding:10px 4px 13px!important;box-sizing:border-box!important;color:#174f57!important;font-family:Georgia,'Times New Roman',serif!important;font-size:clamp(11px,1.8vw,23px)!important;line-height:1.04!important;text-align:center!important;text-decoration:none!important;background:#fff!important;border:0!important;cursor:pointer!important;z-index:2!important}
#${NAV_ID} .tsbvc-nav-link:hover{background:#fbfffe!important}
#${NAV_ID} .tsbvc-nav-link:focus-visible{outline:3px solid #b99458!important;outline-offset:-4px!important}
#${NAV_ID} .tsbvc-nav-icon{display:block!important;width:100%!important;height:clamp(88px,15vw,170px)!important;max-width:190px!important;object-fit:contain!important;object-position:center bottom!important;margin:0 auto 5px!important;pointer-events:none!important;user-select:none!important;-webkit-user-drag:none!important}
#${NAV_ID} .tsbvc-nav-label{display:block!important;max-width:100%!important;pointer-events:none!important}
#${NAV_ID} .tsbvc-nav-link.active .tsbvc-nav-label{font-weight:700!important}
#${NAV_ID} .tsbvc-nav-link.active:after{content:""!important;width:46px!important;height:3px!important;border-radius:3px!important;background:#b99458!important;margin-top:6px!important;flex:none!important}

@media(max-width:800px){
 .tsbvc-header-inner{min-height:72px!important;padding:10px 14px!important}
 .tsbvc-brand{font-size:17px!important;gap:7px!important}
 .tsbvc-brand svg{width:31px!important;height:31px!important}
 .tsbvc-menu{width:47px!important;height:47px!important}
 .tsbvc-menu span,.tsbvc-menu span:before,.tsbvc-menu span:after{width:23px!important;height:2.5px!important}
 #${NAV_ID}{height:150px!important}
 #${NAV_ID} .tsbvc-nav-link{font-size:12px!important;padding:7px 2px 10px!important}
 #${NAV_ID} .tsbvc-nav-icon{height:88px!important;max-width:125px!important;margin-bottom:4px!important}
 #${NAV_ID} .tsbvc-nav-link.active:after{width:30px!important;height:2px!important;margin-top:4px!important}
}

@media(max-width:430px){
 #${NAV_ID}{height:150px!important}
 #${NAV_ID} .tsbvc-nav-link{font-size:10.5px!important;padding-left:1px!important;padding-right:1px!important}
 #${NAV_ID} .tsbvc-nav-icon{height:82px!important;max-width:112px!important}
}
`;
  document.head.appendChild(s);
}

function removeOldShell(){
  document.querySelectorAll('header').forEach(h=>h.remove());
  document.querySelectorAll('nav,.nav-band,.nav-row,.tsbvc-nav,.tsbvc-shared-nav-band,.destination-band,.ornament').forEach(n=>n.remove());
  document.querySelectorAll('.quick-menu').forEach(n=>n.remove());
}

function makeHeader(){
  const h=document.createElement('header');
  h.className='tsbvc-site-header';
  h.innerHTML=`<div class="tsbvc-header-inner"><a class="tsbvc-brand" href="index.html" aria-label="The Still Becoming Village Circle"><svg viewBox="0 0 60 60" aria-hidden="true"><path d="M28 54C28 36 31 18 49 7" fill="none" stroke="#5d9258" stroke-width="4" stroke-linecap="round"/><path d="M34 24C40 11 50 10 57 10c-2 10-10 16-23 16Z" fill="#82ad68"/><path d="M27 34C18 23 8 23 3 27c3 9 12 14 24 14Z" fill="#6f9e61"/></svg><span>The Still Becoming Village Circle</span></a><button class="tsbvc-menu" type="button" aria-label="Open menu"><span></span></button></div>`;
  document.body.insertBefore(h,document.body.firstChild);
}

function makeNavigation(){
  const n=document.createElement('nav');
  n.id=NAV_ID;
  n.setAttribute('aria-label','Village destinations');
  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();

  ITEMS.forEach(([url,label,icon])=>{
    const a=document.createElement('a');
    a.className='tsbvc-nav-link';
    a.href=url;
    a.setAttribute('aria-label',label);
    a.title=label;
    if(current===url.toLowerCase()) a.classList.add('active');

    const img=document.createElement('img');
    img.className='tsbvc-nav-icon';
    img.src=icon+'?v=20260901-exact-six';
    img.alt='';
    img.setAttribute('draggable','false');

    const span=document.createElement('span');
    span.className='tsbvc-nav-label';
    span.textContent=label;

    a.appendChild(img);
    a.appendChild(span);
    n.appendChild(a);
  });

  document.querySelector('.tsbvc-site-header').insertAdjacentElement('afterend',n);
}

function install(){
  addStyles();
  removeOldShell();
  makeHeader();
  makeNavigation();
  window.TSBVCInstallSharedNav=install;
}

window.TSBVCInstallSharedNav=install;
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
else install();
})();
