/* The Still Becoming Village Circle — visual polish layer
   Replaces the remaining emoji-as-icons with quiet, hand-drawn SVG marks. */
(function(){
  'use strict';
  if(window.__TSBVC_POLISH__) return;
  window.__TSBVC_POLISH__=true;

  const icons={
    leaf:`<svg viewBox="0 0 32 32" aria-hidden="true" class="village-inline-icon"><path d="M7 26C8 14 15 7 27 5c-2 12-9 19-20 21Z" fill="none" stroke="#4f8b70" stroke-width="1.8" stroke-linecap="round"/><path d="M8 25 24 9" fill="none" stroke="#8ab879" stroke-width="1.5" stroke-linecap="round"/><path d="M13 19c-2-5-5-7-8-7 1 5 4 8 8 9" fill="none" stroke="#6fa66b" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    bubble:`<svg viewBox="0 0 40 32" aria-hidden="true" class="village-inline-icon bubble-inline-icon"><circle cx="15" cy="18" r="9" fill="rgba(220,250,246,.22)" stroke="rgba(255,255,255,.95)" stroke-width="1.5"/><circle cx="28" cy="10" r="5" fill="rgba(220,250,246,.18)" stroke="rgba(255,255,255,.9)" stroke-width="1.2"/><circle cx="34" cy="23" r="3" fill="rgba(220,250,246,.18)" stroke="rgba(255,255,255,.85)" stroke-width="1"/><path d="M10 14c2-3 5-4 7-4" fill="none" stroke="#fff" stroke-width="1.3" stroke-linecap="round" opacity=".85"/></svg>`,
    art:`<svg viewBox="0 0 32 32" aria-hidden="true" class="village-inline-icon"><path d="M7 25c3-8 7-13 14-16 3-1 5-1 6-1-1 5-4 10-9 13-4 2-7 3-11 4Z" fill="none" stroke="#5d8f7c" stroke-width="1.7"/><path d="M8 25 24 9" fill="none" stroke="#c49a66" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="25" r="2" fill="#d7b47d"/></svg>`,
    footprints:`<svg viewBox="0 0 36 32" aria-hidden="true" class="village-inline-icon"><ellipse cx="11" cy="10" rx="4" ry="7" transform="rotate(-18 11 10)" fill="none" stroke="#6d9c8e" stroke-width="1.7"/><ellipse cx="25" cy="22" rx="4" ry="7" transform="rotate(-18 25 22)" fill="none" stroke="#6d9c8e" stroke-width="1.7"/><circle cx="8" cy="3" r="1.3" fill="#8bb9ad"/><circle cx="14" cy="4" r="1.1" fill="#8bb9ad"/><circle cx="22" cy="15" r="1.2" fill="#8bb9ad"/><circle cx="28" cy="16" r="1" fill="#8bb9ad"/></svg>`
  };

  function style(){
    if(document.getElementById('village-polish-styles')) return;
    const s=document.createElement('style'); s.id='village-polish-styles';
    s.textContent=`
      .village-inline-icon{display:inline-block;width:1.18em;height:1.18em;vertical-align:-.22em;flex:none;overflow:visible}
      .bubble-inline-icon{width:1.55em;height:1.2em;vertical-align:-.16em}
      .village-icon-replaced{display:inline-flex;align-items:center;gap:.28em}
      .village-icon-replaced .village-inline-icon{margin-right:.05em}
      .logo .village-inline-icon{width:1.1em;height:1.1em}
      .bubble-icon .village-inline-icon{width:100%;height:100%}
      .foot .village-inline-icon{width:1.25em;height:1.25em}
    `;
    document.head.appendChild(s);
  }

  function replaceText(root){
    const walker=document.createTreeWalker(root||document.body,NodeFilter.SHOW_TEXT);
    const nodes=[];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node=>{
      if(!node.nodeValue || !/[🌱🫧🎨👣]/u.test(node.nodeValue)) return;
      if(node.parentElement && node.parentElement.closest('#villageSoundtrack')) return;
      let text=node.nodeValue;
      const frag=document.createDocumentFragment();
      const re=/([🌱🫧🎨👣])/gu;
      let last=0,m;
      while((m=re.exec(text))){
        if(m.index>last) frag.appendChild(document.createTextNode(text.slice(last,m.index)));
        const span=document.createElement('span');
        span.className='village-icon-replaced';
        span.setAttribute('aria-hidden','true');
        span.innerHTML=m[1]==='🌱'?icons.leaf:m[1]==='🫧'?icons.bubble:m[1]==='🎨'?icons.art:icons.footprints;
        frag.appendChild(span);
        last=re.lastIndex;
      }
      if(last<text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      node.parentNode.replaceChild(frag,node);
    });
  }

  function run(){style();replaceText(document.body)}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run,{once:true}); else run();
})();
