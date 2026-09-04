/* The Still Becoming Village Circle — soundtrack only. */
(function(){
'use strict';
if(window.__TSBVC_MUSIC__) return;
window.__TSBVC_MUSIC__=true;

const PLAYER_ID='villageSoundtrack';
const COVER='/bricks-cover.jpeg';
const MUSIC_SRC='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1935974870&color=%2316aaa9&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false';
let widget=null,ready=false,playing=false,playRequested=true;

function removeLegacy(){
  document.querySelectorAll('#soundtrack,.soundtrack,#musicBubble,.music-bubble').forEach(e=>e.remove());
}

function addStyles(){
  if(document.getElementById('village-music-styles')) return;
  const s=document.createElement('style');
  s.id='village-music-styles';
  s.textContent=`
#${PLAYER_ID}{position:fixed;right:18px;bottom:18px;width:104px;height:104px;z-index:99999;background:transparent;border:0;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;animation:villageBubbleFloat 6s ease-in-out infinite}
#${PLAYER_ID} .closed{position:relative;width:104px;height:104px;display:flex;align-items:center;justify-content:center}
.music-orb{position:relative;width:96px;height:96px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 32% 27%,rgba(255,255,255,.86),rgba(221,255,251,.42) 28%,rgba(126,224,216,.22) 58%,rgba(255,255,255,.12) 100%);border:1.5px solid rgba(255,255,255,.9);box-shadow:inset 8px 8px 18px rgba(255,255,255,.55),inset -10px -12px 20px rgba(94,190,188,.14),0 14px 30px rgba(40,120,120,.16);backdrop-filter:blur(7px);-webkit-backdrop-filter:blur(7px);overflow:visible}
.music-orb:before,.music-orb:after{content:"";position:absolute;border-radius:50%;border:1px solid rgba(255,255,255,.68);background:rgba(255,255,255,.12)}
.music-orb:before{width:20px;height:20px;left:13px;top:18px}.music-orb:after{width:9px;height:9px;right:18px;top:12px}
.music-note{font:400 39px/1 Georgia,'Times New Roman',serif;color:rgba(25,143,145,.72);text-shadow:0 1px 8px rgba(255,255,255,.7);transform:translateY(-2px)}
#${PLAYER_ID} .play{position:absolute;right:7px;bottom:7px;width:27px;height:27px;border:1px solid rgba(255,255,255,.9);border-radius:50%;background:rgba(217,255,251,.58);color:#176f73;display:flex;align-items:center;justify-content:center;font:12px/1 Arial,sans-serif;box-shadow:0 5px 12px rgba(40,120,120,.14)}
#${PLAYER_ID}.playing .play{font-size:0}#${PLAYER_ID}.playing .play:after{content:'❚❚';font-size:9px}
#${PLAYER_ID} .bubble-shine{position:absolute;width:32px;height:14px;border-radius:50%;left:22px;top:16px;border-top:2px solid rgba(255,255,255,.8);transform:rotate(-28deg)}
#${PLAYER_ID} .content{position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0;pointer-events:none}
@keyframes villageBubbleFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
@media(max-width:600px){#${PLAYER_ID}{width:88px;height:88px;right:8px;bottom:10px}.music-orb,#${PLAYER_ID} .closed{width:82px;height:82px}.music-note{font-size:33px}#${PLAYER_ID} .play{width:24px;height:24px;right:5px;bottom:5px}}
`;
  document.head.appendChild(s);
}

function setState(value){
  playing=!!value;
  const player=document.getElementById(PLAYER_ID);
  if(player) player.classList.toggle('playing',playing);
}

function play(){
  if(!widget||!ready) return false;
  try{widget.play();return true}catch(e){return false}
}

function requestPlay(){
  playRequested=true;
  if(ready) play();
}

function pause(){
  if(widget&&ready) try{widget.pause()}catch(e){}
}

function setupWidget(){
  const frame=document.querySelector(`#${PLAYER_ID} .soundcloud-frame`);
  if(!frame||frame.dataset.bound==='1') return;
  function bind(){
    if(!window.SC||!window.SC.Widget) return;
    widget=window.SC.Widget(frame);
    widget.bind(window.SC.Widget.Events.READY,function(){
      ready=true;
      frame.dataset.bound='1';
      widget.bind(window.SC.Widget.Events.PLAY,()=>setState(true));
      widget.bind(window.SC.Widget.Events.PAUSE,()=>setState(false));
      widget.bind(window.SC.Widget.Events.FINISH,function(){try{widget.seekTo(0);widget.play()}catch(e){setTimeout(play,250)}});
      if(playRequested) play();
    });
  }
  if(window.SC&&window.SC.Widget) bind();
  else{
    let script=document.getElementById('soundcloud-widget-api');
    if(!script){
      script=document.createElement('script');
      script.id='soundcloud-widget-api';
      script.src='https://w.soundcloud.com/player/api.js';
      script.onload=bind;
      document.head.appendChild(script);
    }else script.addEventListener('load',bind,{once:true});
  }
}

function waitForGesture(){
  if(window.__TSBVC_SCROLL_MUSIC__) return;
  window.__TSBVC_SCROLL_MUSIC__=true;
  let done=false;
  function go(){
    if(done) return;
    done=true;
    requestPlay();
    ['touchstart','touchend','pointerdown','pointerup','click','wheel','touchmove','pointermove','scroll'].forEach(t=>window.removeEventListener(t,go));
  }
  ['touchstart','touchend','pointerdown','pointerup','click','wheel','touchmove','pointermove','scroll'].forEach(t=>window.addEventListener(t,go,{passive:true}));
}

function createPlayer(){
  if(document.getElementById(PLAYER_ID)) return;
  const player=document.createElement('div');
  player.id=PLAYER_ID;
  player.innerHTML=`<div class="closed" aria-label="The Village Soundtrack — tap to play or pause"><div class="music-orb"><span class="bubble-shine" aria-hidden="true"></span><span class="music-note" aria-hidden="true">♪</span><div class="play">▶</div></div></div><div class="content"><img class="cover-open" src="${COVER}" alt="Bricks — Andra Day cover art"><iframe class="soundcloud-frame" scrolling="no" frameborder="no" allow="autoplay; encrypted-media" title="The Village Soundtrack" src="${MUSIC_SRC}"></iframe></div>`;
  document.body.appendChild(player);
  player.querySelector('.closed').addEventListener('click',()=>playing?pause():requestPlay());
  setupWidget();
  waitForGesture();
}

function init(){
  removeLegacy();
  addStyles();
  createPlayer();
  requestPlay();
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
else init();
})();
