/* Compatibility loader: every page uses site-fixes.js as the single navigation source. */
(function(){
'use strict';
function boot(){
 if(window.TSBVCInstallSharedNav){window.TSBVCInstallSharedNav();return;}
 const s=document.createElement('script');
 s.src='site-fixes.js?v=20260829-4';
 s.onload=function(){if(window.TSBVCInstallSharedNav)window.TSBVCInstallSharedNav()};
 document.head.appendChild(s);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
