/* Stable shared Village navigation. No dependency on older navigation scripts. */
(function(){
'use strict';
if(window.__TSBVC_STABLE_NAV__) return;
window.__TSBVC_STABLE_NAV__=true;
const ART='/assets/B307A382-B6FC-4D8D-81C5-3047BDE8F4E3.png';
const NAV_VERSION='stable-2';
const ITEMS=[
 ['index.html','Home',0,208],
 ['about.html','Inside the Bubble',208,199.5],
 ['LearningtheUnknown.html','The Unknown',407.5,174],
 ['events.html','Experiences',581.5,164],
 ['web-design.html','Webspace',745.5,175.5],
 ['coming-together.html','Be Coming Together',921,172.5]
];
function hrefFor(item){return item[0]+'?nav='+NAV_VERSION;}
function install(){
 if(!document.body||document.getElementById('tsbvc-stable-nav')) return;
 document.querySelectorAll('header,nav,.nav-band,.nav-row,.tsbvc-site-header,.tsbvc-single-navigation,.tsbvc-nav,.destination-band,.ornament,.quick-menu,.tsbvc-quick-menu').forEach(function(x){x.remove();});
 const style=document.createElement('style');
 style.id='tsbvc-stable-nav-style';
 style.textContent=`
#tsbvc-stable-header{width:100%;background:rgba(255,255,255,.98);border-bottom:1px solid rgba(22,84,91,.08);position:relative;z-index:10000}
#tsbvc-stable-header .inner{min-height:72px;padding:10px 14px;display:flex;align-items:center;justify-content:space-between;box-sizing:border-box}
#tsbvc-stable-header .brand{display:flex;align-items:center;gap:7px;color:#16545b;text-decoration:none;font:700 17px Georgia,serif;white-space:nowrap}
#tsbvc-stable-header .brand svg{width:31px;height:31px;flex:none}
#tsbvc-stable-header button{width:47px;height:47px;border-radius:50%;border:1px solid #dcebe8;background:#fff;box-shadow:0 7px 18px rgba(22,84,91,.09);display:grid;place-items:center;cursor:pointer}
#tsbvc-stable-header button i,#tsbvc-stable-header button i:before,#tsbvc-stable-header button i:after{content:'';display:block;width:23px;height:2.5px;border-radius:3px;background:#28646a}
#tsbvc-stable-header button i:before{transform:translateY(-8px)}#tsbvc-stable-header button i:after{transform:translateY(5px)}
#tsbvc-stable-nav{width:100%;background:#fff;border-bottom:1px solid rgba(22,84,91,.08);overflow:hidden;position:relative;z-index:9999;line-height:0}
#tsbvc-stable-nav .art{position:relative;width:100%;aspect-ratio:1093.5/396;overflow:hidden;background:#fff}
#tsbvc-stable-nav img{position:absolute;left:0;top:0;width:118%;height:auto;max-width:none;display:block;clip-path:inset(0 0 22% 0);-webkit-clip-path:inset(0 0 22% 0);pointer-events:none;user-select:none}
#tsbvc-stable-nav a.hot{position:absolute;top:0;height:78.3%;display:block;z-index:3;background:transparent;text-decoration:none;cursor:pointer}
#tsbvc-stable-nav .labels{position:absolute;left:0;right:0;bottom:0;height:21.7%;display:grid;grid-template-columns:19.02% 18.24% 15.91% 14.97% 16.06% 15.80%;align-items:center;background:#fff;z-index:4;line-height:1}
#tsbvc-stable-nav .labels a{color:#174f57;text-decoration:none;text-align:center;font:clamp(8px,1.35vw,17px)/1.03 Georgia,'Times New Roman',serif;padding:2px 3px}
#tsbvc-stable-nav .labels a[aria-current=page]{font-weight:700}
#tsbvc-stable-nav .labels a:focus-visible{outline:2px solid #b99458;outline-offset:-2px}
@media(max-width:430px){#tsbvc-stable-header .brand{font-size:16px}#tsbvc-stable-nav .labels a{font-size:8px}}
`;
 document.head.appendChild(style);
 const h=document.createElement('header');h.id='tsbvc-stable-header';
 h.innerHTML='<div class="inner"><a class="brand" href="'+hrefFor(['index.html'])+'" aria-label="The Still Becoming Village Circle"><svg viewBox="0 0 60 60" aria-hidden="true"><path d="M28 54C28 36 31 18 49 7" fill="none" stroke="#5d9258" stroke-width="4" stroke-linecap="round"/><path d="M34 24C40 11 50 10 57 10c-2 10-10 16-23 16Z" fill="#82ad68"/><path d="M27 34C18 23 8 23 3 27c3 9 12 14 24 14Z" fill="#6f9e61"/></svg><span>The Still Becoming Village Circle</span></a><button type="button" aria-label="Open Village menu"><i></i></button></div>';
 document.body.insertBefore(h,document.body.firstChild);
 const n=document.createElement('nav');n.id='tsbvc-stable-nav';n.setAttribute('aria-label','Village destinations');
 const art=document.createElement('div');art.className='art';
 const img=document.createElement('img');img.src=ART+'?v='+NAV_VERSION;img.alt='';img.draggable=false;art.appendChild(img);
 const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
 ITEMS.forEach(function(item){const a=document.createElement('a');a.className='hot';a.href=hrefFor(item);a.setAttribute('aria-label',item[1]);a.title=item[1];a.style.left=(item[2]/1093.5*100)+'%';a.style.width=(item[3]/1093.5*100)+'%';a.style.height='78.3%';if(current===item[0].toLowerCase())a.setAttribute('aria-current','page');art.appendChild(a);});
 const labels=document.createElement('div');labels.className='labels';
 ITEMS.forEach(function(item){const a=document.createElement('a');a.href=hrefFor(item);a.textContent=item[1];a.setAttribute('aria-label',item[1]);if(current===item[0].toLowerCase())a.setAttribute('aria-current','page');labels.appendChild(a);});
 art.appendChild(labels);n.appendChild(art);h.insertAdjacentElement('afterend',n);
 const btn=h.querySelector('button');btn.addEventListener('click',function(){let box=document.getElementById('tsbvc-stable-menu');if(box){box.remove();btn.setAttribute('aria-expanded','false');return;}box=document.createElement('div');box.id='tsbvc-stable-menu';box.style.cssText='position:fixed;right:12px;top:82px;z-index:20000;display:flex;flex-direction:column;min-width:220px;padding:10px;background:#fff;border:1px solid #dcebe8;border-radius:18px;box-shadow:0 14px 34px rgba(22,84,91,.18)';ITEMS.forEach(function(item){const a=document.createElement('a');a.href=hrefFor(item);a.textContent=item[1];a.style.cssText='display:block;padding:11px 13px;color:#16545b;text-decoration:none;font:600 16px Georgia,serif;border-radius:10px';box.appendChild(a);});document.body.appendChild(box);btn.setAttribute('aria-expanded','true');});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
