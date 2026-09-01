/* Compatibility loader: force the current shared navigation on every page. */
(function(){
'use strict';
function boot(){
 const s=document.createElement('script');
 s.src='site-fixes.js?v=20260901-18';
 s.onload=function(){
  if(window.TSBVCInstallSharedNav) window.TSBVCInstallSharedNav();
 };
 document.head.appendChild(s);
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
else boot();
})();
