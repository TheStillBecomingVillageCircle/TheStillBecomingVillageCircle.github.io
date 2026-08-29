/* The Still Becoming Village Circle — shared site shell + exact illustrated navigation. */
(function(){
'use strict';
const CSS_ID='tsbvc-shared-nav-style';

function addStyles(){
 if(document.getElementById(CSS_ID))return;
 const s=document.createElement('style');
 s.id=CSS_ID;
 s.textContent=`
/* ---------- Global viewport repair ---------- */
html,body{
 width:100%!important;
 min-width:100%!important;
 max-width:none!important;
 margin:0!important;
 padding:0!important;
 overflow-x:hidden!important;
}
body{
 min-height:100vh!important;
}

/* ---------- Shared header ---------- */
.tsbvc-site-header{
 position:sticky!important;
 top:0!important;
 z-index:1000!important;
 display:block!important;
 width:100%!important;
 max-width:none!important;
 margin:0!important;
 background:rgba(255,255,255,.97)!important;
 border-bottom:1px solid rgba(22,84,91,.08)!important;
 backdrop-filter:blur(12px)!important;
 -webkit-backdrop-filter:blur(12px)!important;
}
.tsbvc-site-header .tsbvc-header-inner{
 width:100%!important;
 max-width:1180px!important;
 min-height:88px!important;
 margin:0 auto!important;
 padding:14px 22px!important;
 display:flex!important;
 align-items:center!important;
 justify-content:space-between!important;
 gap:18px!important;
 box-sizing:border-box!important;
}
.tsbvc-brand{
 display:flex!important;
 align-items:center!important;
 gap:10px!important;
 max-width:calc(100% - 70px)!important;
 color:#16545b!important;
 text-decoration:none!important;
 font-family:Georgia,'Times New Roman',serif!important;
 font-size:clamp(18px,2.6vw,32px)!important;
 font-weight:700!important;
 letter-spacing:-.035em!important;
 white-space:nowrap!important;
}
.tsbvc-brand svg{width:42px!important;height:42px!important;flex:none!important}
.tsbvc-menu{
 width:54px!important;
 height:54px!important;
 border-radius:50%!important;
 border:1px solid #dcebe8!important;
 background:#fff!important;
 box-shadow:0 7px 18px rgba(22,84,91,.09)!important;
 display:grid!important;
 place-items:center!important;
 flex:none!important;
}
.tsbvc-menu span,.tsbvc-menu span:before,.tsbvc-menu span:after{
 content:"";
 display:block;
 width:25px;
 height:3px;
 border-radius:3px;
 background:#28646a;
}
.tsbvc-menu span:before{transform:translateY(-8px)}
.tsbvc-menu span:after{transform:translateY(5px)}

/* ---------- EXACT six-item illustrated navigation ---------- */
.tsbvc-nav{
 position:relative!important;
 display:block!important;
 width:100%!important;
 max-width:none!important;
 min-width:0!important;
 margin:0!important;
 padding:0!important;
 background:#fff!important;
 border-bottom:1px solid rgba(22,84,91,.08)!important;
 box-shadow:0 8px 24px rgba(22,84,91,.05)!important;
 box-sizing:border-box!important;
 line-height:0!important;
 overflow:hidden!important;
}
.tsbvc-nav-art{
 display:block!important;
 width:100%!important;
 height:auto!important;
 max-width:none!important;
 margin:0!important;
 padding:0!important;
 border:0!important;
}
.tsbvc-nav-links{
 position:absolute!important;
 inset:0!important;
 display:grid!important;
 grid-template-columns:repeat(6,minmax(0,1fr))!important;
 width:100%!important;
 height:100%!important;
 margin:0!important;
 padding:0!important;
}
.tsbvc-nav-link{
 display:block!important;
 width:100%!important;
 height:100%!important;
 min-width:0!important;
 min-height:0!important;
 margin:0!important;
 padding:0!important;
 color:transparent!important;
 text-decoration:none!important;
 background:transparent!important;
 border:0!important;
 outline-offset:-4px!important;
}
.tsbvc-nav-link:focus-visible{
 outline:3px solid #b99458!important;
 outline-offset:-5px!important;
}

/* ---------- Kill legacy navigation containers after exact nav installs ---------- */
.tsbvc-nav + .nav-band,
.tsbvc-nav + .destination-band,
.tsbvc-nav + .tsbvc-shared-nav-band{display:none!important}

@media(max-width:800px){
 html,body{
   width:100%!important;
   min-width:100%!important;
   max-width:none!important;
 }
 .tsbvc-site-header{
   width:100vw!important;
   max-width:100vw!important;
   margin-left:0!important;
   margin-right:0!important;
 }
 .tsbvc-site-header .tsbvc-header-inner{
   width:100%!important;
   max-width:none!important;
   min-height:72px!important;
   padding:10px 14px!important;
 }
 .tsbvc-brand{
   font-size:17px!important;
   gap:7px!important;
 }
 .tsbvc-brand svg{width:31px!important;height:31px!important}
 .tsbvc-menu{width:47px!important;height:47px!important}
 .tsbvc-menu span,.tsbvc-menu span:before,.tsbvc-menu span:after{
   width:23px!important;
   height:2.5px!important;
 }
 .tsbvc-nav{
   width:100vw!important;
   max-width:100vw!important;
 }

 /* Keep legacy page sections on the real mobile viewport. */
 body > .site-header,
 body > .nav-band,
 body > .hero,
 body > main,
 body > section,
 body > footer{
   max-width:none!important;
 }
 body > .site-header,
 body > .nav-band,
 body > .hero{
   width:100vw!important;
   margin-left:0!important;
   margin-right:0!important;
 }
}

@media(max-width:430px){
 .tsbvc-site-header .tsbvc-header-inner{padding:9px 12px!important}
 .tsbvc-brand{font-size:16px!important}
}
`;
 document.head.appendChild(s);
}

function ensureHeader(){
 let header=document.querySelector('header');
 if(!header){
   header=document.createElement('header');
   document.body.insertBefore(header,document.body.firstChild);
 }
 header.className='tsbvc-site-header';
 header.innerHTML=`<div class="tsbvc-header-inner"><a class="tsbvc-brand" href="index.html" aria-label="The Still Becoming Village Circle"><svg viewBox="0 0 60 60" aria-hidden="true"><path d="M28 54C28 36 31 18 49 7" fill="none" stroke="#5d9258" stroke-width="4" stroke-linecap="round"/><path d="M34 24C40 11 50 10 57 10c-2 10-10 16-23 16Z" fill="#82ad68"/><path d="M27 34C18 23 8 23 3 27c3 9 12 14 24 14Z" fill="#6f9e61"/></svg><span>The Still Becoming Village Circle</span></a><button class="tsbvc-menu" type="button" aria-label="Open menu"><span></span></button></div>`;
 return header;
}

function install(){
 addStyles();
 const header=ensureHeader();

 /* Remove only navigation elements that this shared shell owns. */
 document.querySelectorAll('.tsbvc-nav,.tsbvc-shared-nav-band,.nav-band,.destination-band').forEach(n=>n.remove());

 const nav=document.createElement('nav');
 nav.className='tsbvc-nav';
 nav.setAttribute('aria-label','Village destinations');

 /*
    IMPORTANT: This is the exact approved six-icon artwork.
    It is one 1200x350 SVG containing all six illustrations AND labels.
    The transparent links below sit over the six 200px-wide sections.
 */
 const art=document.createElement('img');
 art.className='tsbvc-nav-art';
 art.src='/assets/village-nav-6-exact.svg?v=20260829-1';
 art.alt='Village navigation: Home, Inside the Bubble, The Unknown, Experiences, Webspace, Be Coming Together';
 art.setAttribute('draggable','false');

 const links=document.createElement('div');
 links.className='tsbvc-nav-links';

 const items=[
  ['index.html','Home'],
  ['about.html','Inside the Bubble'],
  ['LearningtheUnknown.html','The Unknown'],
  ['experiences.html','Experiences'],
  ['web-design.html','Webspace'],
  ['coming-together.html','Be Coming Together']
 ];

 items.forEach(([url,label])=>{
   const a=document.createElement('a');
   a.className='tsbvc-nav-link';
   a.href=url;
   a.setAttribute('aria-label',label);
   a.title=label;
   links.appendChild(a);
 });

 nav.appendChild(art);
 nav.appendChild(links);
 header.insertAdjacentElement('afterend',nav);
 window.TSBVCInstallSharedNav=install;
}

function ensureMusic(){
 if(window.__TSBVC_MUSIC__)return;
 if(document.querySelector('script[data-tsbvc-music]'))return;
 const s=document.createElement('script');
 s.src='village-music.js?v=20260829-15';
 s.dataset.tsbvcMusic='true';
 document.body.appendChild(s);
}

window.TSBVCInstallSharedNav=install;
if(document.readyState==='loading'){
 document.addEventListener('DOMContentLoaded',function(){install();ensureMusic()},{once:true});
}else{
 install();
 ensureMusic();
}
})();
