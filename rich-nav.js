/* Site-wide illustrated navigation — one exact approved navigation on every page. */
(function(){
'use strict';
const ITEMS=[['index.html','Home'],['about.html','Inside the Bubble'],['LearningtheUnknown.html','The Unknown'],['events.html','Experiences'],['web-design.html','Webspace'],['contact.html','Connect'],['coaching.html','Support']];
const ART='/assets/B307A382-B6FC-4D8D-81C5-3047BDE8F4E3.png?v=20260828-4';
function buildNav(){
 let band=document.querySelector('.nav-band');
 let row=band&&band.querySelector('.nav-row');
 if(!row){
  const oldNav=document.querySelector('header + nav, header ~ nav');
  if(oldNav){band=oldNav;band.className='nav-band';oldNav.innerHTML='';}
  else{const header=document.querySelector('header');if(!header)return;band=document.createElement('nav');band.className='nav-band';band.setAttribute('aria-label','Village destinations');header.insertAdjacentElement('afterend',band);}
  row=document.createElement('div');row.className='nav-row';band.appendChild(row);
 }
 if(row.dataset.richNavApplied==='true')return;
 row.dataset.richNavApplied='true';row.innerHTML='';
 const wrap=document.createElement('div');wrap.className='exact-nav-wrap';
 const img=document.createElement('img');img.className='exact-nav-art';img.src=ART;img.alt='Home, Inside the Bubble, The Unknown, Experiences, Webspace, Connect, Support';img.decoding='async';wrap.appendChild(img);
 ITEMS.forEach(function(item,i){const a=document.createElement('a');a.href=item[0];a.className='exact-nav-link exact-nav-link-'+i;a.setAttribute('aria-label',item[1]);wrap.appendChild(a);});
 row.appendChild(wrap);
 const current=(location.pathname.split('/').pop()||'index.html').toLowerCase();
 wrap.querySelectorAll('.exact-nav-link').forEach(function(a){if(a.getAttribute('href').toLowerCase()===current){a.classList.add('active');a.setAttribute('aria-current','page');}});
}
function addStyles(){
 if(document.getElementById('exact-village-nav-style'))return;
 const s=document.createElement('style');s.id='exact-village-nav-style';s.textContent=`
.nav-band{width:100%!important;background:#fff!important;border-bottom:1px solid rgba(22,84,91,.08)!important;box-shadow:0 8px 24px rgba(22,84,91,.05)!important;overflow:hidden!important;position:relative!important;z-index:40!important}
.nav-row{display:block!important;width:100%!important;min-width:0!important;max-width:none!important;padding:0!important;margin:0!important;overflow:hidden!important}
.exact-nav-wrap{position:relative!important;width:100%!important;max-width:1200px!important;margin:0 auto!important;line-height:0!important}
.exact-nav-art{display:block!important;width:100%!important;height:auto!important;margin:0!important;padding:0!important;border:0!important}
.exact-nav-link{position:absolute!important;top:0!important;height:100%!important;display:block!important;z-index:10!important;background:transparent!important;text-decoration:none!important}
.exact-nav-link-0{left:0;width:14.3%}.exact-nav-link-1{left:14.3%;width:14.3%}.exact-nav-link-2{left:28.6%;width:14.1%}.exact-nav-link-3{left:42.7%;width:15.1%}.exact-nav-link-4{left:57.8%;width:14.3%}.exact-nav-link-5{left:72.1%;width:13.5%}.exact-nav-link-6{left:85.6%;width:14.4%}
.exact-nav-link:focus-visible{outline:3px solid #b99458;outline-offset:-4px;border-radius:10px}
@media(max-width:700px){.nav-band{overflow:hidden!important}.exact-nav-wrap{width:100%!important;max-width:none!important;min-width:0!important}.exact-nav-art{width:100%!important;height:auto!important}}
`;
 document.head.appendChild(s);
}
function apply(){addStyles();buildNav();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
})();
