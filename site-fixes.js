/* The Still Becoming Village Circle — shared navigation only. */
(function(){
'use strict';

const STYLE_ID='tsbvc-single-shell-style';
const NAV_ID='tsbvc-single-navigation';
const ART='/assets/B307A382-B6FC-4D8D-81C5-3047BDE8F4E3.png';

/* One exact artwork strip. The source artwork has seven panels; the navigation
   uses the first six, with Connect serving as the visual for Be Coming Together. */
const ITEMS=[
  ['index.html','Home',0,208],
  ['about.html','Inside the Bubble',208,199.5],
  ['LearningtheUnknown.html','The Unknown',407.5,174],
  ['events.html','Experiences',581.5,164],
  ['web-design.html','Webspace',745.5,175.5],
  ['coming-together.html','Be Coming Together',921,172.5]
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
#${NAV_ID}{position:relative!important;width:100%!important;margin:0!important;padding:0!important;background:#fff!important;border-bottom:1px solid rgba(22,84,91,.08)!important;box-sizing:border-box!important;z-index:900!important;overflow:hidden!important;line-height:0!important}
#${NAV_ID} .tsbvc-nav-artwork{position:relative!important;width:100%!important;aspect-ratio:1093.5 / 396!important;overflow:hidden!important;background:#fff!important}
#${NAV_ID} .tsbvc-nav-artwork>img{position:absolute!important;left:0!important;top:0!important;width:118%!important;height:auto!important;max-width:none!important;display:block!important;margin:0!important;padding:0!important;pointer-events:none!important;user-select:none!important;-webkit-user-drag:none!important}
#${NAV_ID} .tsbvc-nav-link{position:absolute!important;top:0!important;height:100%!important;margin:0!important;padding:0!important;background:transparent!important;border:0!important;text-decoration:none!important;display:block!important;z-index:2!important;cursor:pointer!important}
#${NAV_ID} .tsbvc-nav-link:focus-visible{outline:3px solid #b99458!important;outline-offset:-3px!important}
#${NAV_ID} .tsbvc-connect-label{position:absolute!important;left:84.15%!important;top:78.3%!important;width:15.85%!important;height:21.7%!important;background:#fff!important;display:flex!important;align-items:flex-start!important;justify-content:center!important;padding:5px 3px 0!important;box-sizing:border-box!important;color:#174f57!important;font-family:Georgia,'Times New Roman',serif!important;font-size:clamp(11px,1.55vw,21px)!important;line-height:1.03!important;text-align:center!important;z-index:4!important;pointer-events:none!important}
#${NAV_ID} .tsbvc-connect-label span{display:block!important;max-width:100%!important}
#${NAV_ID} .tsbvc-connect-label:after{content:"";position:absolute!important;top:0!important;left:0!important;right:0!important;bottom:0!important;background:#fff!important;z-index:-1!important}
@media(max-width:800px){
 .tsbvc-header-inner{min-height:72px!important;padding:10px 14px!important}
 .tsbvc-brand{font-size:17px!important;gap:7px!important}
 .tsbvc-brand svg{width:31px!important;height:31px!important}
 .tsbvc-menu{width:47px!important;height:47px!important}
 .tsbvc-menu span,.tsbvc-menu span:before,.tsbvc-menu span:after{width:23px!important;height:2.5px!important}
 #${NAV_ID} .tsbvc-connect-label{font-size:10.5px!important;padding-top:4px!important}
}
@media(max-width:430px){
 #${NAV_ID} .tsbvc-connect-label{font-size:9px!important;padding-top:3px!important}
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

  const artWrap=document.createElement('div');
  artWrap.className='tsbvc-nav-artwork';
  const img=document.createElement('img');
  img.src=ART+'?v=20260901-exact-strip';
  img.alt='';
  img.setAttribute('draggable','false');
  artWrap.appendChild(img);

  ITEMS.forEach(([url,label,sx,sw])=>{
    const a=document.createElement('a');
    a.className='tsbvc-nav-link';
    a.href=url;
    a.setAttribute('aria-label',label);
    a.title=label;
    if(current===url.toLowerCase()) a.setAttribute('aria-current','page');
    a.style.left=(sx/1093.5*100).toFixed(4)+'%';
    a.style.width=(sw/1093.5*100).toFixed(4)+'%';
    artWrap.appendChild(a);
  });

  const sixth=document.createElement('span');
  sixth.className='tsbvc-connect-label';
  sixth.innerHTML='<span>Be Coming<br>Together</span>';
  artWrap.appendChild(sixth);
  n.appendChild(artWrap);
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
    box.style.cssText='position:fixed;right:14px;top:78px;z-index:2000;display:flex;flex-direction:column;min-width:205px;padding:10px;background:#fff;border:1px solid #dcebe8;border-radius:18px;box-shadow:0 14px 34px rgba(22,84,91,.18)';
    ITEMS.forEach(([url,label])=>{
      const a=document.createElement('a');
      a.href=url;
      a.textContent=label;
      a.style.cssText='display:block;padding:11px 13px;color:#16545b;text-decoration:none;font:600 16px Georgia,Times New Roman,serif;border-radius:10px';
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
