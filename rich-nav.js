/* Compatibility loader: force the current shared navigation on every page. */
(function(){
'use strict';
function boot(){
 const s=document.createElement('script');
 s.src='site-fixes.js?v=20260901-22';
 s.onload=function(){
  if(window.TSBVCInstallSharedNav){
   window.TSBVCInstallSharedNav();
   let style=document.getElementById('tsbvc-artwork-label-clip');
   if(!style){
    style=document.createElement('style');
    style.id='tsbvc-artwork-label-clip';
    style.textContent='#tsbvc-single-navigation .tsbvc-nav-artwork>img{clip-path:inset(0 0 22% 0)!important;-webkit-clip-path:inset(0 0 22% 0)!important;}';
    document.head.appendChild(style);
   }
  }
 };
 s.onerror=function(){
  if(window.TSBVCInstallSharedNav) window.TSBVCInstallSharedNav();
 };
 document.head.appendChild(s);
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
else boot();
})();
