/* Village soundtrack persistence patch */
(function(){
'use strict';
if(window.__TSBVC_MUSIC_PATCH__)return;
window.__TSBVC_MUSIC_PATCH__=true;
function patch(){
  const iframe=document.querySelector('#villageSoundtrack .soundcloud-frame');
  if(!iframe||!window.SC||!window.SC.Widget)return;
  const widget=window.SC.Widget(iframe);
  widget.bind(window.SC.Widget.Events.FINISH,function(){
    try{widget.seekTo(0);widget.play()}catch(e){}
  });
}
function start(){
  const s=document.createElement('script');
  s.src='https://w.soundcloud.com/player/api.js';
  s.onload=patch;
  document.head.appendChild(s);
}
if(window.SC&&window.SC.Widget)patch();else start();
})();