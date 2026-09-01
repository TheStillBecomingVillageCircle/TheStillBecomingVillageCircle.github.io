/* The Still Becoming Village Circle — shared navigation only. */
(function(){
'use strict';

const STYLE_ID='tsbvc-single-shell-style';
const NAV_ID='tsbvc-single-navigation';
const ART='/assets/B307A382-B6FC-4D8D-81C5-3047BDE8F4E3.png';

/* Exact artwork from the supplied seven-icon source image.
   The navigation remains six destinations: Connect is represented by Be Coming Together. */
const ITEMS=[
  ['index.html','Home',0,184,0],
  ['about.html','Inside the Bubble',184,184,1],
  ['LearningtheUnknown.html','The Unknown',368,182,2],
  ['events.html','Experiences',550,190,3],
  ['web-design.html','Webspace',740,185,4],
  ['coming-together.html','Be Coming Together',925,165,5]
];

function addStyles(){
  if(document.getElementById(STYLE_ID)) return;
  const s=document.createElement('style');
  s.id=STYLE_ID;
  s.textContent=`
html,body{width:100%!important;min-width:100%!important;max-width:none!important;margin:0!important;padding:0!important;overflow-x:hidden!important}
body{min-height:100vh!important}
nav:not(#${NAV_ID}),.nav-band,.nav-row,.tsbvc-nav,.tsbvc-shared-nav-band,.destination-band,.ornament{display:none!important}
.tsbvc-site-header{width:100%!important;background:rgba(255,255,255,.98)!important;border-bottom:1px solid rgba(22,84,91,.08)!important;position:relative!important;z-index:1000!important}
.tsbvc-header-inner{width:100%!important;max-width:1180px!important;min-height:88px!important;margin:0 auto!important;padding:14px 22px!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:18px!important;box-sizing:border-box!important}
.tsbvc-brand{display:flex!important;align-items:center!important;gap:10px!important;max-width:calc(100% - 70px)!important;color:#16545b!important;text-decoration:none!important;font-family:Georgia,'Times New Roman',serif!important;font-size:clamp(18px,2.6vw,32px)!important;font-weight:700!important;letter-spacing:-.035em!important;white-space:nowrap!important}
.tsbvc-brand svg{width:42px!important;height:42px!important;flex:none!important}
.tsbvc-menu{width:54px!important;height:54px!important;border-radius:50%!important;border:1px solid #dcebe8!important;background:#fff!important;box-shadow:0 7px 18px rgba(22,84,91,.09)!important;display:grid!important;place-items:center!important;flex:none!important;cursor:pointer!important}
.tsbvc-menu span,.tsbvc-menu span:before,.tsbvc-menu span:after{content:"";display:block;width:25px;height:3px;border-radius:3px;background:#28646a}
.tsbvc-menu span:before{transform:translateY(-8px)}
.tsbvc-menu span:after{transform:translateY(5px)}
#${NAV_ID}{position:relative!important;width:100%!important;height:clamp(150px,22vw,250px)!important;margin:0!important;padding:0!important;background:#fff!important;border-bottom:1px solid rgba(22,84,91,.08)!important;box-sizing:border-box!important;z-index:900!important;display:grid!important;grid-template-columns:repeat(6,minmax(0,1fr))!important;align-items:stretch!important;overflow:hidden!important}
#${NAV_ID} .tsbvc-nav-link{position:relative!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:flex-end!important;width:100%!important;height:100%!important;min-width:0!important;margin:0!important;padding:5px 3px 10px!important;box-sizing:border-box!important;color:#174f57!important;font-family:Georgia,'Times New Roman',serif!important;font-size:clamp(11px,1.8vw,23px)!important;line-height:1.04!important;text-align:center!important;text-decoration:none!important;background:#fff!important;border:0!important;cursor:pointer!important;z-index:2!important}
#${NAV_ID} .tsbvc-nav-link:hover{background:#fbfffe!important}
#${NAV_ID} .tsbvc-nav-link:focus-visible{outline:3px solid #b99458!important;outline-offset:-4px!important}
#${NAV_ID} .tsbvc-nav-art{position:relative!important;width:100%!important;height:clamp(105px,15vw,180px)!important;overflow:hidden!important;flex:none!important;margin:0 auto 3px!important;background:#fff!important}
#${NAV_ID} .tsbvc-nav-art img{position:absolute!important;top:0!important;height:auto!important;max-width:none!important;width:var(--imgw)!important;left:var(--left)!important;display:block!important;margin:0!important;padding:0!important;pointer-events:none!important;user-select:none!important;-webkit-user-drag:none!important}
#${NAV_ID} .tsbvc-nav-label{display:block!important;max-width:100%!important;pointer-events:none!important}
#${NAV_ID} .tsbvc-nav-link.active .tsbvc-nav-label{font-weight:700!important}
#${NAV_ID} .tsbvc-nav-link.active:after{content:""!important;width:46px!important;height:3px!important;border-radius:3px!important;background:#b99458!important;margin-top:6px!important;flex:none!important}
.tsbvc-quick-menu{position:fixed!important;right:14px!important;top:78px!important;z-index:2000!important;display:flex!important;flex-direction:column!important;min-width:205px!important;padding:10px!important;background:#fff!important;border:1px solid #dcebe8!important;border-radius:18px!important;box-shadow:0 14px 34px rgba(22,84,91,.18)!important}
.tsbvc-quick-menu a{display:block!important;padding:11px 13px!important;color:#16545b!important;text-decoration:none!important;font:600 16px Georgia,'Times New Roman',serif!important;border-radius:10px!important}
.tsbvc-quick-menu a:hover{background:#effcfb!important}
@media(max-width:800px){
 .tsbvc-header-inner{min-height:72px!important;padding:10px 14px!important}
 .tsbvc-brand{font-size:17px!important;gap:7px!important}
 .tsbvc-brand svg{width:31px!important;height:31px!important}
 .tsbvc-menu{width:47px!important;height:47px!important}
 .tsbvc-menu span,.tsbvc-menu span:before,.tsbvc-menu span:after{width:23px!important;height:2.5px!important}
 #${NAV_ID}{height:150px!important}
 #${NAV_ID} .tsbvc-nav-link{font-size:12px!important;padding:4px 2px 8px!important}
 #${NAV_ID} .tsbvc-nav-art{height:104px!important;margin-bottom:3px!important}
 #${NAV_ID} .tsbvc-nav-link.active:after{width:30px!important;height:2px!important;margin-top:4px!important}
}
@media(max-width:430px){
 #${NAV_ID}{height:150px!important}
 #${NAV_ID} .tsbvc-nav-link{font-size:10.5px!important;padding-left:1px!important;padding-right:1px!important}
 #${NAV_ID} .tsbvc-nav-art{height:102px!important}
}
`;
  document.head.appendChild(s);
}

function removeOldShell(){
  document.querySelectorAll('header').forEach(h=>h.remove());
  document.querySelectorAll('nav,.nav-band,.nav-row,.tsbvc-nav,.tsbvc-shared-nav-band,.destination-band,.ornament').forEach(n=>n.remove());
  document.querySelectorAll('.quick-menu,.tsbvc-quick-menu').forEach(n=>n.remove());
}

function makeHeader(){
  const h=document.createElement('header');
  h.className='tsbvc-site-header';
  h.innerHTML=`<div class="tsbvc-header-inner"><a class="tsbvc-brand" href="index.html" aria-label="The Still Becoming Village Circle"><svg viewBox="0 0 60 60" aria-hidden="true"><path d="M28 54C28 36 31 18 49 7" fill="none" stroke="#5d9258" stroke-width="4" stroke-linecap="round"/><path d="M34 24C40 11 50 10 57 10c-2 10-10 16-23 16Z" fill="#82ad68"/><path d="M27 34C18 23 8 23 3 27c3 9 12 14 24 14Z" fill="#6f9e61"/></svg><span>The Still Becoming Village Circle</span></a><button class="tsbvc-menu" type="button" aria-label="Open menu" aria-expanded="false"><span></span></button></div>`;
  document.body.insertBefore(h,document.body.firstChild);
  return h;
}

function makeNavigation(){
  const n=document.createElement('nav');
  n.id=NAV_ID;
  n.setAttribute('aria-label','Village destinations');
  const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();

  ITEMS.forEach(([url,label,sx,sw])=>{
    const a=document.createElement('a');
    a.className='tsbvc-nav-link';
    a.href=url;
    a.setAttribute('aria-label',label);
    a.title=label;
    if(current===url.toLowerCase()) a.classList.add('active');

    const art=document.createElement('span');
    art.className='tsbvc-nav-art';
    const img=document.createElement('img');
    img.src=ART+'?v=20260901-exact-artwork';
    img.alt='';
    img.setAttribute('draggable','false');
    const imgWidth=(1290/sw*100).toFixed(4)+'%';
    const left=(-sx/sw*100).toFixed(4)+'%';
    art.style.setProperty('--imgw',imgWidth);
    art.style.setProperty('--left',left);
    art.appendChild(img);

    const span=document.createElement('span');
    span.className='tsbvc-nav-label';
    span.textContent=label;

    a.appendChild(art);
    a.appendChild(span);
    n.appendChild(a);
  });

  document.querySelector('.tsbvc-site-header').insertAdjacentElement('afterend',n);
}

function wireMenu(){
  const button=document.querySelector('.tsbvc-menu');
  if(!button) return;
  button.addEventListener('click',()=>{
    let box=document.querySelector('.tsbvc-quick-menu');
    if(box){box.remove();button.setAttribute('aria-expanded','false');return;}
    box=document.createElement('div');
    box.className='tsbvc-quick-menu';
    ITEMS.forEach(([url,label])=>{
      const a=document.createElement('a');
      a.href=url;
      a.textContent=label;
      box.appendChild(a);
    });
    document.body.appendChild(box);
    button.setAttribute('aria-expanded','true');
  });
}

function install(){
  addStyles();
  removeOldShell();
  makeHeader();
  makeNavigation();
  wireMenu();
  window.TSBVCInstallSharedNav=install;
}

window.TSBVCInstallSharedNav=install;
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
else install();
})();
