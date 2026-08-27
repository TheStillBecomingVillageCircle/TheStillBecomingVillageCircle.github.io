/* The Still Becoming Village Circle — visual polish layer */
(function(){
  'use strict';
  if(window.__TSBVC_POLISH__) return;
  window.__TSBVC_POLISH__=true;

  function style(){
    if(document.getElementById('village-polish-styles')) return;
    const s=document.createElement('style');
    s.id='village-polish-styles';
    s.textContent=`
      .village-inline-icon{display:inline-block;width:1.18em;height:1.18em;vertical-align:-.22em;flex:none;overflow:visible}
      .bubble-inline-icon{width:1.55em;height:1.2em;vertical-align:-.16em}
      .village-icon-replaced{display:inline-flex;align-items:center;gap:.28em}
      .village-icon-replaced .village-inline-icon{margin-right:.05em}
    `;
    document.head.appendChild(s);
  }

  /* The site's navigation is now supplied by site-fixes.js from the approved
     reference navigation. Do not replace Home with a different image. */
  function removeLegacyGraceHome(){
    document.querySelectorAll('.tsbvc-grace-home').forEach(link=>{
      const img=link.querySelector('img');
      if(img) link.textContent='Home';
      link.classList.remove('tsbvc-grace-home');
      link.removeAttribute('data-grace-home-installed');
    });
  }

  /* Do not turn written emoji characters into interface icons. The site uses
     its illustrated SVG navigation instead. */
  function removeLegacyEmojiText(){
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    const nodes=[];
    let node;
    while((node=walker.nextNode())) nodes.push(node);
    const emoji=/[\u{1F000}-\u{1FAFF}\u{1FC00}-\u{1FFFD}\u{2600}-\u{27BF}\u{FE0F}\u{200D}\u{20E3}]/gu;
    nodes.forEach(n=>{
      if(n.parentElement && ['SCRIPT','STYLE','NOSCRIPT'].includes(n.parentElement.tagName)) return;
      n.nodeValue=n.nodeValue.replace(emoji,'');
    });
  }

  function run(){
    style();
    removeLegacyGraceHome();
    removeLegacyEmojiText();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run,{once:true});
  else run();
})();
