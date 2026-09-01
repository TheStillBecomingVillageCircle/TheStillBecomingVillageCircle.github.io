/* Compatibility loader: force the current shared navigation on every page. */
(function(){
'use strict';
const VERSION='20260901-24';
const ART='/assets/B307A382-B6FC-4D8D-81C5-3047BDE8F4E3.png';
const ITEMS=[
 ['index.html','Home',0,208],
 ['about.html','Inside the Bubble',208,199.5],
 ['LearningtheUnknown.html','The Unknown',407.5,174],
 ['events.html','Experiences',581.5,164],
 ['web-design.html','Webspace',745.5,175.5],
 ['coming-together.html','Be Coming Together',921,172.5]
];
function fallback(){
 if(document.getElementById('tsbvc-single-navigation')) return;
 const old=document.querySelector('.tsbvc-site-header');
 if(old) old.remove();
 document.querySelectorAll('header,nav,.nav-band,.nav-row,.tsbvc-nav,.tsbvc-shared-nav-band,.destination-band,.ornament,.quick-menu,.tsbvc-quick-menu').forEach(x=>x.remove());
 const style=document.createElement('style');
 style.id='tsbvc-rich-nav-fallback-style';
 style.textContent=`html,body{margin:0!important;padding:0!important;overflow-x:hidden!important} .tsbvc-site-header{width:100%;background:#fff;border-bottom:1px solid rgba(22,84,91,.08);position:relative;z-index:1000}.tsbvc-header-inner{width:100%;min-height:72px;padding:10px 14px;box-sizing:border-box;display:flex;align-items:center;justify-content:space-between}.tsbvc-brand{display:flex;align-items:center;gap:7px;color:#16545b;text-decoration:none;font:700 17px Georgia,serif;white-space:nowrap}.tsbvc-menu{width:47px;height:47px;border-radius:50%;border:1px solid #dcebe8;background:#fff;display:grid;place-items:center}.tsbvc-menu span,.tsbvc-menu span:before,.tsbvc-menu span:after{content:'';display:block;width:23px;height:2.5px;border-radius:3px;background:#28646a}.tsbvc-menu span:before{transform:translateY(-8px)}.tsbvc-menu span:after{transform:translateY(5px)}#tsbvc-single-navigation{width:100%;padding:0;margin:0;background:#fff;border-bottom:1px solid rgba(22,84,91,.08);overflow:hidden;line-height:0;position:relative;z-index:900}#tsbvc-single-navigation .tsbvc-nav-artwork{position:relative;width:100%;aspect-ratio:1093.5/396;overflow:hidden;background:#fff}#tsbvc-single-navigation .tsbvc-nav-artwork>img{position:absolute;left:0;top:0;width:118%;height:auto;max-width:none;display:block;clip-path:inset(0 0 22% 0);-webkit-clip-path:inset(0 0 22% 0)}#tsbvc-single-navigation .tsbvc-nav-link{position:absolute;top:0;height:100%;display:block;z-index:2;text-decoration:none;background:transparent}#tsbvc-single-navigation .tsbvc-connect-label{position:absolute;left:84.15%;top:78.3%;width:15.85%;height:21.7%;background:#fff;display:flex;align-items:flex-start;justify-content:center;padding:4px 2px 0;box-sizing:border-box;color:#174f57;font:9px/1.03 Georgia,serif;text-align:center;z-index:4;pointer-events:none}`;
 document.head.appendChild(style);
 const h=document.createElement('header'); h.className='tsbvc-site-header'; h.innerHTML='<div class="tsbvc-header-inner"><a class="tsbvc-brand" href="index.html">🌱<span>The Still Becoming Village Circle</span></a><button class="tsbvc-menu" aria-label="Open menu"><span></span></button></div>'; document.body.insertBefore(h,document.body.firstChild);
 const n=document.createElement('nav'); n.id='tsbvc-single-navigation'; n.setAttribute('aria-label','Village destinations');
 const w=document.createElement('div'); w.className='tsbvc-nav-artwork'; const img=document.createElement('img'); img.src=ART+'?v='+VERSION; img.alt=''; w.appendChild(img);
 const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
 ITEMS.forEach(([url,label,sx,sw])=>{const a=document.createElement('a');a.className='tsbvc-nav-link';a.href=url;a.title=label;a.setAttribute('aria-label',label);if(current===url.toLowerCase())a.setAttribute('aria-current','page');a.style.left=(sx/1093.5*100)+'%';a.style.width=(sw/1093.5*100)+'%';w.appendChild(a)});
 const label=document.createElement('span');label.className='tsbvc-connect-label';label.innerHTML='Be Coming<br>Together';w.appendChild(label);n.appendChild(w);h.insertAdjacentElement('afterend',n);
}
function boot(){
 const s=document.createElement('script');
 s.src='site-fixes.js?v='+VERSION;
 s.onload=function(){if(window.TSBVCInstallSharedNav)window.TSBVCInstallSharedNav();};
 s.onerror=function(){fallback();};
 document.head.appendChild(s);
 setTimeout(function(){if(!document.getElementById('tsbvc-single-navigation'))fallback();},1200);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
