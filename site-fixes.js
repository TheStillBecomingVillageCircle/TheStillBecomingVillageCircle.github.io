/* The Still Becoming Village Circle — live polish + responsive fixes */
(function(){
  'use strict';

  const HOUSE=`<svg viewBox="0 0 180 120" role="img" aria-label="Grace's home" class="grace-nav-house-svg">
    <defs>
      <linearGradient id="gRoof" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#9edfd6"/><stop offset="1" stop-color="#5fa9a2"/></linearGradient>
      <linearGradient id="gGlass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f5fffd"/><stop offset="1" stop-color="#b9e8e1"/></linearGradient>
      <linearGradient id="gGold" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f3dfa9"/><stop offset="1" stop-color="#b58748"/></linearGradient>
    </defs>
    <ellipse cx="90" cy="104" rx="64" ry="8" fill="#8ecfc6" opacity=".25"/>
    <path d="M35 91c-5-8 1-16 12-17 5-12 18-17 29-11 10-13 31-13 40 2 13-8 34 0 36 14 13 0 22 6 22 14 0 10-12 15-27 15H55c-12 0-19-5-20-17Z" fill="#fff" stroke="#fff" stroke-width="2"/>
    <path d="M46 55 90 24l47 31v40H46Z" fill="#f8fbf9" stroke="#d1e9e4" stroke-width="1.5"/>
    <path d="M37 57 90 18l56 39-8 7-48-33-45 33Z" fill="url(#gRoof)"/>
    <rect x="65" y="50" width="50" height="24" rx="2" fill="url(#gGlass)" stroke="#fff" stroke-width="3"/>
    <path d="M90 50v24M65 62h50" stroke="#6f9e99" stroke-width="1.2" opacity=".55"/>
    <rect x="57" y="75" width="29" height="23" rx="2" fill="url(#gGlass)" stroke="#fff" stroke-width="3"/>
    <rect x="94" y="75" width="30" height="23" rx="2" fill="url(#gGlass)" stroke="#fff" stroke-width="3"/>
    <path d="M86 98V85c0-5 3-8 7-8s7 3 7 8v13Z" fill="#66847e"/>
    <path d="M48 99h84" stroke="url(#gGold)" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M31 20c32-24 85-24 118 4" fill="none" stroke="url(#gGold)" stroke-width="2" stroke-linecap="round" opacity=".9"/>
    <circle cx="90" cy="9" r="2" fill="#fff0c2"/><circle cx="53" cy="16" r="1.7" fill="#fff0c2"/><circle cx="130" cy="15" r="1.7" fill="#fff0c2"/>
  </svg>`;

  function styles(){
    if(document.getElementById('tsbvc-live-fixes')) return;
    const s=document.createElement('style'); s.id='tsbvc-live-fixes';
    s.textContent=`
      .tsbvc-mobile-toggle{display:none!important;align-items:center!important;justify-content:center!important;width:44px!important;height:44px!important;flex:0 0 44px!important;padding:0!important;margin:0!important;border:1px solid rgba(49,95,93,.14)!important;border-radius:50%!important;background:rgba(255,255,255,.94)!important;color:#315f5d!important;box-shadow:0 7px 18px rgba(49,95,93,.10)!important;font:700 21px/1 Arial,sans-serif!important;cursor:pointer!important}
      .tsbvc-mobile-toggle svg{width:21px;height:21px;display:block}
      .tsbvc-mobile-menu{position:relative!important}
      .tsbvc-mobile-links{transition:opacity .2s ease,transform .2s ease!important}
      .tsbvc-mobile-open .tsbvc-mobile-links{display:flex!important;opacity:1!important;transform:translateY(0)!important;pointer-events:auto!important}
      .tsbvc-mobile-home-icon{display:inline-flex!important;width:48px!important;height:34px!important;padding:0!important;margin:0!important;border-radius:10px!important;align-items:center!important;justify-content:center!important;background:rgba(234,255,249,.94)!important;border:1px solid rgba(49,95,93,.12)!important;box-shadow:0 5px 14px rgba(49,95,93,.09)!important;overflow:hidden!important;vertical-align:middle!important}
      .tsbvc-mobile-home-icon .grace-nav-house-svg{width:44px;height:30px;display:block}
      .grace-home-place .place-name{display:none!important}
      .grace-home-scene.tsbvc-home-repaired{background:linear-gradient(180deg,#eaf9f5 0%,#d7f2ec 100%)!important;box-shadow:0 14px 32px rgba(63,126,119,.10)!important}
      .grace-home-scene.tsbvc-home-repaired img{display:none!important}
      .tsbvc-home-illustration-wrap{display:flex!important;align-items:center!important;justify-content:center!important;width:100%!important;height:100%!important}
      .tsbvc-home-illustration-wrap .grace-nav-house-svg{width:100%!important;height:100%!important;display:block!important}
      @media(max-width:760px){
        header{position:sticky!important;top:0!important;z-index:10000!important}
        nav.village-top-nav,nav.tsbvc-mobile-menu{position:relative!important;width:100%!important;min-height:64px!important;padding:10px 14px!important;flex-direction:row!important;align-items:center!important;justify-content:space-between!important;gap:10px!important}
        nav.village-top-nav .logo,nav.tsbvc-mobile-menu .logo{flex:1 1 auto!important;min-width:0!important;max-width:calc(100% - 54px)!important;white-space:nowrap!important;font-size:16px!important;line-height:1!important;overflow:hidden!important;text-overflow:ellipsis!important}
        nav.village-top-nav .village-top-links{display:none!important;position:absolute!important;left:10px!important;right:10px!important;top:calc(100% + 8px)!important;z-index:10001!important;flex-direction:column!important;align-items:stretch!important;gap:2px!important;width:auto!important;max-height:calc(100vh - 100px)!important;overflow:auto!important;padding:10px!important;border-radius:20px!important;background:rgba(255,255,255,.97)!important;border:1px solid rgba(49,95,93,.10)!important;box-shadow:0 18px 45px rgba(49,95,93,.16)!important;backdrop-filter:blur(16px)!important;-webkit-backdrop-filter:blur(16px)!important;opacity:0!important;transform:translateY(-5px)!important;pointer-events:none!important;white-space:normal!important}
        nav.village-top-nav .village-top-links a{display:block!important;width:100%!important;padding:12px 14px!important;border-radius:12px!important;font:600 15px/1.25 Arial,Helvetica,sans-serif!important;text-align:left!important}
        nav.village-top-nav .tsbvc-mobile-toggle{display:inline-flex!important}
        .grace-home-place{min-height:255px!important}.grace-home-scene{width:min(330px,90vw)!important;height:215px!important}
      }
      @media(max-width:480px){nav.village-top-nav .logo{font-size:15px!important}.grace-home-place{min-height:225px!important}.grace-home-scene{width:min(315px,92vw)!important;height:195px!important}}
    `;
    document.head.appendChild(s);
  }

  function toggle(nav,links){
    if(!nav||!links||nav.querySelector('.tsbvc-mobile-toggle')||nav.querySelector('.village-mobile-menu-button')) return;
    nav.classList.add('tsbvc-mobile-menu'); links.classList.add('tsbvc-mobile-links');
    const b=document.createElement('button'); b.type='button'; b.className='tsbvc-mobile-toggle';
    b.setAttribute('aria-expanded','false'); b.setAttribute('aria-label','Open Village navigation');
    const icon=open=>open?'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    b.innerHTML=icon(false);
    b.addEventListener('click',()=>{const open=nav.classList.toggle('tsbvc-mobile-open');b.setAttribute('aria-expanded',String(open));b.setAttribute('aria-label',open?'Close Village navigation':'Open Village navigation');b.innerHTML=icon(open);});
    links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('tsbvc-mobile-open');b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Open Village navigation');b.innerHTML=icon(false);}));
    nav.appendChild(b);
  }

  function navigation(){
    document.querySelectorAll('nav').forEach(nav=>{
      const links=nav.querySelector('.village-top-links')||nav.querySelector('ul'); if(!links) return;
      toggle(nav,links);
      links.querySelectorAll('a').forEach(a=>{
        const href=(a.getAttribute('href')||'').toLowerCase(), text=(a.textContent||'').trim().toLowerCase();
        if(href==='index.html'&&text==='home'){
          a.classList.add('tsbvc-mobile-home-icon');a.setAttribute('aria-label','Home');a.setAttribute('title','Home');a.innerHTML=HOUSE;
        }
      });
    });
  }

  function home(){
    const isHome=location.pathname==='/'||/index\.html$/i.test(location.pathname); if(!isHome) return;
    const scene=document.querySelector('.grace-home-scene'); if(!scene||scene.dataset.tsbvcRepaired==='true') return;
    scene.dataset.tsbvcRepaired='true';scene.classList.add('tsbvc-home-repaired');
    scene.innerHTML='<div class="tsbvc-home-illustration-wrap">'+HOUSE+'</div>';
  }

  function init(){styles();navigation();home();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
