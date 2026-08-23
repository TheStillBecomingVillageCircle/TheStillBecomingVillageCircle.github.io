/* The Still Becoming Village Circle — persistent soundtrack + shared navigation */
(function () {
  'use strict';
  if (window.__TSBVC_MUSIC__) return;
  window.__TSBVC_MUSIC__ = true;

  const PLAYER_ID = 'villageSoundtrack';
  const NAV_PAGES = new Set(['index.html','about.html','LearningtheUnknown.html','experiences.html','events.html','contact.html','coaching.html','kitta.html']);
  const CANONICAL_PAGES = { 'events.html': 'experiences.html' };
  const BOOKING_URL = 'https://calendly.com/thestillbecomingvillagecircle/30min';
  const COVER = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAErAKsDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAH/AP/EABQQAQAAAAAAAAAAAAAAAAAAABD/2gAIAQEAAQUCf//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8Bf//EABQQAQAAAAAAAAAAAAAAAAAAABD/2gAIAQEABj8Cf//Z';
  const MUSIC_SRC = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1935974870&color=%2316aaa9&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false';

  let soundtrackWidget = null;
  let soundtrackReady = false;
  let soundtrackPlaying = false;
  let autoplayRequested = false;

  function removeLegacyPlayers() {
    document.querySelectorAll('#soundtrack, .soundtrack, #musicBubble, .music-bubble').forEach(el => el.remove());
  }

  function addStyles() {
    if (document.getElementById('village-music-styles')) return;
    const style = document.createElement('style');
    style.id = 'village-music-styles';
    style.textContent = `
      #${PLAYER_ID}{position:fixed;right:24px;bottom:24px;width:96px;height:96px;background:transparent;border:0;box-shadow:none;z-index:99999;display:flex;align-items:center;justify-content:center;cursor:pointer;overflow:visible}
      #${PLAYER_ID} .closed{position:relative;width:96px;height:96px;display:flex;align-items:center;justify-content:center;background:transparent;border:0;box-shadow:none}
      #${PLAYER_ID} .music-orb{width:92px;height:92px;display:flex;align-items:center;justify-content:center;background:transparent;border:0;box-shadow:none}
      #${PLAYER_ID} .sax{width:92px;height:92px;position:relative;display:flex;align-items:center;justify-content:center;filter:drop-shadow(0 5px 10px rgba(40,120,120,.12))}
      .sax-bubble{width:92px;height:92px;display:block;overflow:visible}
      .sax-bubble .cover{opacity:.58;mix-blend-mode:normal}
      .sax-bubble .glass{fill:rgba(218,255,251,.20);stroke:rgba(255,255,255,.92);stroke-width:1.4}
      .sax-bubble .edge{fill:none;stroke:rgba(255,255,255,.72);stroke-width:1.4}
      .sax-bubble .shine{fill:none;stroke:rgba(255,255,255,.92);stroke-width:2;stroke-linecap:round}
      .sax-bubble .key{fill:rgba(255,255,255,.62);stroke:rgba(40,120,120,.18);stroke-width:1}
      .sax-bubble .bubble-highlight{fill:rgba(255,255,255,.30);stroke:rgba(255,255,255,.72);stroke-width:1}
      #${PLAYER_ID} .play{position:absolute;left:59%;top:72%;transform:translate(-50%,-50%);width:28px;height:28px;border-radius:50%;border:1.5px solid rgba(255,255,255,.95);background:rgba(22,170,169,.82);color:white;display:flex;align-items:center;justify-content:center;font:13px Arial,sans-serif;box-shadow:0 4px 10px rgba(40,120,120,.14)}
      #${PLAYER_ID}.playing .play::after{content:'❚❚';font-size:10px;letter-spacing:-1px}
      #${PLAYER_ID}.playing .play{font-size:0}
      #${PLAYER_ID} .content{position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;overflow:hidden}
      #${PLAYER_ID}.open .content{position:fixed;left:auto;top:auto;right:20px;bottom:20px;width:min(390px,calc(100vw - 40px));opacity:1;pointer-events:auto;overflow:visible;background:rgba(235,255,252,.94);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:16px;box-shadow:0 18px 45px rgba(40,120,120,.18);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
      #${PLAYER_ID} .cover-open{display:block;width:150px;height:150px;object-fit:cover;border-radius:18px;margin:0 auto 10px;box-shadow:0 10px 24px rgba(40,120,120,.14)}
      #${PLAYER_ID} .title{text-align:center;color:#285f61;font:700 17px Arial,sans-serif;margin-bottom:2px}
      #${PLAYER_ID} .song{text-align:center;color:#16aaa9;font:14px Arial,sans-serif;margin-bottom:10px}
      #${PLAYER_ID} iframe{width:100%;height:166px;border:0;border-radius:16px;overflow:hidden}
      #${PLAYER_ID} .close{display:block;margin:9px auto 0;border:0;background:rgba(255,255,255,.9);color:#285f61;padding:7px 20px;border-radius:25px;font-weight:700;cursor:pointer}
      .conversation-link,.becoming-journey-link{margin-top:10px!important;padding:13px 24px;border:0;border-radius:52% 48% 45% 55% / 48% 55% 45% 52%;background:rgba(22,170,169,.10);color:#16aaa9;font-family:inherit;font-size:inherit;font-weight:700;line-height:1.4;cursor:pointer;appearance:none;-webkit-appearance:none;box-shadow:0 10px 24px rgba(40,120,120,.08);transition:transform .25s ease,background .25s ease}
      .conversation-link:hover,.becoming-journey-link:hover{background:rgba(22,170,169,.16);text-decoration:none!important;transform:translateY(-2px)}
      @media(max-width:600px){#${PLAYER_ID}{width:84px;height:84px;right:8px;bottom:10px}#${PLAYER_ID} .closed{width:84px;height:84px}#${PLAYER_ID} .music-orb{width:82px;height:82px}#${PLAYER_ID} .sax{width:82px;height:82px}.sax-bubble{width:82px;height:82px}#${PLAYER_ID} .play{width:26px;height:26px;left:59%;top:72%}}
    `;
    document.head.appendChild(style);
  }

  function setPlayingState(isPlaying){
    soundtrackPlaying = !!isPlaying;
    const player = document.getElementById(PLAYER_ID);
    if(player) player.classList.toggle('playing', soundtrackPlaying);
  }

  function playSoundtrack(){
    if(!soundtrackWidget || !soundtrackReady) return false;
    try { soundtrackWidget.play(); return true; } catch(e){ return false; }
  }

  function requestPlayback(){
    autoplayRequested = true;
    if(soundtrackReady) playSoundtrack();
  }

  function pauseSoundtrack(){
    if(!soundtrackWidget || !soundtrackReady) return;
    try { soundtrackWidget.pause(); } catch(e){}
  }

  function setupSoundtrackLoop(){
    const iframe = document.querySelector(`#${PLAYER_ID} .soundcloud-frame`);
    if(!iframe || iframe.dataset.loopBound === 'true') return;
    function bindWidget(){
      if(!window.SC || !window.SC.Widget) return;
      soundtrackWidget = window.SC.Widget(iframe);
      soundtrackWidget.bind(window.SC.Widget.Events.READY,function(){
        soundtrackReady = true;
        iframe.dataset.loopBound = 'true';
        soundtrackWidget.bind(window.SC.Widget.Events.PLAY,()=>setPlayingState(true));
        soundtrackWidget.bind(window.SC.Widget.Events.PAUSE,()=>setPlayingState(false));
        soundtrackWidget.bind(window.SC.Widget.Events.FINISH,function(){ try{ soundtrackWidget.seekTo(0); soundtrackWidget.play(); }catch(e){} });
        if(autoplayRequested) playSoundtrack();
      });
    }
    if(window.SC && window.SC.Widget){ bindWidget(); return; }
    let api=document.getElementById('soundcloud-widget-api');
    if(!api){
      api=document.createElement('script'); api.id='soundcloud-widget-api'; api.src='https://w.soundcloud.com/player/api.js'; api.async=false; api.onload=bindWidget; document.head.appendChild(api);
    }else api.addEventListener('load',bindWidget,{once:true});
  }

  function initializeScrollPlayback(){
    if(window.__TSBVC_SCROLL_MUSIC__) return;
    window.__TSBVC_SCROLL_MUSIC__=true;
    let attempted=false;
    function firstGesture(){
      if(attempted) return;
      attempted=true;
      requestPlayback();
      ['touchstart','pointerdown','wheel','touchmove','pointermove','scroll'].forEach(type=>window.removeEventListener(type,firstGesture));
    }
    ['touchstart','pointerdown','wheel','touchmove','pointermove','scroll'].forEach(type=>window.addEventListener(type,firstGesture,{passive:true}));
  }

  function createPlayer(){
    if(document.getElementById(PLAYER_ID)) return;
    const el=document.createElement('div'); el.id=PLAYER_ID;
    el.innerHTML=`<div class="closed" aria-label="The Village Soundtrack"><div class="music-orb"><span class="sax" aria-hidden="true"><svg class="sax-bubble" viewBox="0 0 92 92" role="img" aria-label="Translucent bubble saxophone with current song cover"><defs><clipPath id="saxClip"><path d="M54 8c-4 9-7 18-7 28v23c0 12-7 22-19 22-9 0-16-5-16-13 0-8 7-13 15-13h13V31c0-12 4-20 11-27z"/></clipPath><linearGradient id="glassFill" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".50"/><stop offset=".55" stop-color="#d8fffb" stop-opacity=".22"/><stop offset="1" stop-color="#9ee7e0" stop-opacity=".08"/></linearGradient></defs><image class="cover" href="${COVER}" x="0" y="0" width="92" height="92" preserveAspectRatio="xMidYMid slice" clip-path="url(#saxClip)"/><path class="glass" d="M54 8c-4 9-7 18-7 28v23c0 12-7 22-19 22-9 0-16-5-16-13 0-8 7-13 15-13h13V31c0-12 4-20 11-27z" fill="url(#glassFill)"/><path class="edge" d="M54 8c8 2 16 8 20 16M13 55c-6 3-9 9-9 16 0 12 10 19 23 19 15 0 26-12 26-27"/><circle class="key" cx="43" cy="35" r="3"/><circle class="key" cx="43" cy="45" r="3"/><circle class="key" cx="43" cy="55" r="3"/><path class="shine" d="M25 22c5-9 13-14 23-16"/><path class="shine" d="M63 63c6-6 9-14 10-22"/><circle class="bubble-highlight" cx="70" cy="18" r="6"/><circle class="bubble-highlight" cx="79" cy="29" r="3"/></svg></span><div class="play" aria-hidden="true">▶</div></div></div><div class="content" onclick="event.stopPropagation()"><img class="cover-open" src="${COVER}" alt="Bricks — Andra Day cover art"><div class="title">The Village Soundtrack</div><div class="song">Bricks — Andra Day</div><iframe class="soundcloud-frame" scrolling="no" frameborder="no" allow="autoplay; encrypted-media" title="The Village Soundtrack" src="${MUSIC_SRC}"></iframe><button class="close" type="button">Close</button></div>`;
    document.body.appendChild(el);
    el.querySelector('.closed').addEventListener('click',function(){ if(soundtrackPlaying) pauseSoundtrack(); else requestPlayback(); });
    el.querySelector('.close').addEventListener('click',()=>el.classList.remove('open'));
    setupSoundtrackLoop();
    initializeScrollPlayback();
  }

  function initFloatingBubble(root){
    const bubble=root.querySelector?.('#floatingBubble')||document.getElementById('floatingBubble');
    const message=root.querySelector?.('#floatingMessage')||document.getElementById('floatingMessage');
    if(!bubble||!message||bubble.dataset.villageBubbleInitialized==='true') return;
    bubble.dataset.villageBubbleInitialized='true';
    const messages=['🫧 You belong before you bloom.',"🫧 Healing isn't linear.",'🫧 Rest is productive.','🫧 Curiosity creates connection.','🫧 Becoming takes courage.',"🫧 It's okay to begin again.",'🫧 You are allowed to change.',"🫧 You don't have to rush becoming."];
    let index=0,x=12,y=62,targetX=12,targetY=62;
    function choosePosition(){const maxX=innerWidth<600?68:78,maxY=innerWidth<600?78:84;targetX=8+Math.random()*(maxX-8);targetY=14+Math.random()*(maxY-14);}
    function animate(){if(!document.body.contains(bubble))return;x+=(targetX-x)*.0028;y+=(targetY-y)*.0028;bubble.style.left=x+'%';bubble.style.top=y+'%';requestAnimationFrame(animate);}
    function change(){if(!document.body.contains(bubble))return;bubble.classList.remove('visible');setTimeout(()=>{if(!document.body.contains(bubble))return;index=(index+1)%messages.length;message.textContent=messages[index];choosePosition();bubble.classList.add('visible');},1800);}
    choosePosition();setTimeout(()=>{if(document.body.contains(bubble))bubble.classList.add('visible');},1200);setInterval(change,9000);animate();
  }

  function normalizeNavigation(){document.querySelectorAll('a[href]').forEach(link=>{const raw=link.getAttribute('href');if(!raw||raw.startsWith('#')||raw.startsWith('mailto:')||raw.startsWith('tel:'))return;try{const target=new URL(raw,location.href);if(target.origin!==location.origin)return;const page=target.pathname.split('/').pop()||'index.html';if(CANONICAL_PAGES[page]){target.pathname=target.pathname.replace(page,CANONICAL_PAGES[page]);link.setAttribute('href',target.href);}}catch(e){}});}
  function normalizeBookingLinks(){document.querySelectorAll('a[href*="calendly.com"]').forEach(link=>{link.href=BOOKING_URL;link.target='_blank';link.rel='noopener noreferrer';});}
  function cleanLegacyLanguage(root){const replacements=[[/honest conversations/gi,'honest reflection'],[/creative conversations/gi,'creative exploration'],[/the conversation to begin/gi,'the connection to begin'],[/start the conversation here/gi,'start here'],[/A conversation\./g,'An exploration.'],[/conversations/gi,'exploration'],[/conversation/gi,'exploration']];const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const nodes=[];let node;while(node=walker.nextNode())nodes.push(node);nodes.forEach(textNode=>{if(!textNode.nodeValue.trim())return;let value=textNode.nodeValue;replacements.forEach(pair=>value=value.replace(pair[0],pair[1]));if(value!==textNode.nodeValue)textNode.nodeValue=value;});}
  function applyVillageFixes(){normalizeNavigation();normalizeBookingLinks();cleanLegacyLanguage(document.body);const journey=document.querySelector('.conversation-link'),footprints=document.getElementById('conversation');if(journey&&footprints){journey.textContent='🌱 Let’s Take a Journey Into Your Becoming  →';journey.classList.remove('conversation-link');journey.classList.add('becoming-journey-link');journey.onclick=e=>{e.preventDefault();footprints.scrollIntoView({behavior:'smooth',block:'start'});};}const footprintSection=document.getElementById('conversation');if(footprintSection)footprintSection.id='journey';const word=document.querySelector('.word-box h2');if(word&&/Epistemic Humility/i.test(word.textContent)){word.textContent='Liminality';const definition=document.querySelector('.word-definition');if(definition)definition.textContent='noun — the state of being between one stage, condition, identity, or place and another';}}
  function replacePageStyles(parsed){document.head.querySelectorAll('style:not(#village-music-styles)').forEach(style=>style.remove());parsed.head.querySelectorAll('style').forEach(style=>document.head.insertBefore(document.importNode(style,true),document.getElementById('village-music-styles')));}
  async function navigate(url,push){const target=new URL(url,location.href);let page=target.pathname.split('/').pop()||'index.html';if(CANONICAL_PAGES[page]){page=CANONICAL_PAGES[page];target.pathname=target.pathname.replace(target.pathname.split('/').pop(),page);}if(target.origin!==location.origin||!NAV_PAGES.has(page))return false;const response=await fetch(target.href,{credentials:'same-origin',cache:'no-store'});if(!response.ok)throw new Error('Navigation failed: '+response.status);const parsed=new DOMParser().parseFromString(await response.text(),'text/html');const player=document.getElementById(PLAYER_ID);if(!player)return false;document.title=parsed.title||document.title;replacePageStyles(parsed);const incoming=[...parsed.body.children].filter(child=>child.id!==PLAYER_ID&&child.id!=='soundtrack'&&child.id!=='musicBubble'&&!child.classList.contains('soundtrack')&&!child.classList.contains('music-bubble'));[...document.body.children].forEach(child=>{if(child!==player)child.remove();});incoming.forEach(child=>document.body.insertBefore(document.importNode(child,true),player));removeLegacyPlayers();applyVillageFixes();initFloatingBubble(document);if(push)history.pushState({village:true},'',target.href);window.scrollTo({top:0,behavior:'instant'});window.dispatchEvent(new CustomEvent('village:pagechange',{detail:{url:target.href}}));return true;}
  document.addEventListener('click',event=>{const link=event.target.closest?.('a[href]');if(!link||link.target==='_blank'||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;const target=new URL(link.href,location.href);const page=target.pathname.split('/').pop()||'index.html';if(target.origin!==location.origin||!NAV_PAGES.has(page)||target.pathname===location.pathname)return;event.preventDefault();navigate(target.href,true).catch(()=>location.href=target.href);});
  window.addEventListener('popstate',()=>navigate(location.href,false).catch(()=>{}));
  function init(){removeLegacyPlayers();addStyles();createPlayer();applyVillageFixes();initFloatingBubble(document);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();