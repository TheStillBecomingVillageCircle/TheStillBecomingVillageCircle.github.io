(function () {
  function initReadingFlow() {
    if (document.body.classList.contains('reading-flow-ready')) return;
    document.body.classList.add('reading-flow-ready');

    const path = (window.location.pathname || '').toLowerCase();
    if (path.endsWith('/index.html') || path === '/' || path === '') return;

    const style = document.createElement('style');
    style.textContent = `
      .village-more { margin:22px auto 0; text-align:center; }
      .village-more summary { display:inline-flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;list-style:none;padding:11px 18px;border-radius:999px;background:rgba(22,170,169,.08);color:#16aaa9;font-weight:700;line-height:1.3;transition:background .2s ease,transform .2s ease; }
      .village-more summary::-webkit-details-marker { display:none; }
      .village-more summary:hover { background:rgba(22,170,169,.14);transform:translateY(-1px); }
      .village-more[open] summary { margin-bottom:18px; }
      @media(max-width:600px){.village-more summary{font-size:14px;padding:10px 16px;}}
    `;
    document.head.appendChild(style);

    const selectors = ['.section-box','.mission-box','.thought','.scope','.cta','.person','.intro-box','.word-box','.philosophy-box','.coming-box','.event-space-box'];
    document.querySelectorAll(selectors.join(',')).forEach(function (box) {
      if (box.dataset.readingFlow === 'done') return;
      const paragraphs = Array.from(box.children).filter(function (el) { return el.tagName === 'P'; });
      if (paragraphs.length < 3) return;
      const textLength = paragraphs.reduce(function (sum,p) { return sum + (p.textContent || '').trim().length; },0);
      if (textLength < 420 && paragraphs.length < 4) return;

      const hidden = paragraphs.slice(2);
      if (!hidden.length) return;

      const details = document.createElement('details');
      details.className='village-more';
      const summary=document.createElement('summary');
      summary.textContent='Keep reading →';
      const content=document.createElement('div');
      content.className='village-more-content';
      hidden.forEach(function(p){content.appendChild(p);});
      details.appendChild(summary);
      details.appendChild(content);

      const firstNonParagraph=Array.from(box.children).find(function(el){return el!==details&&el.tagName!=='P';});
      if(firstNonParagraph) box.insertBefore(details,firstNonParagraph); else box.appendChild(details);
      details.addEventListener('toggle',function(){summary.textContent=details.open?'Close this thought ↑':'Keep reading →';});
      box.dataset.readingFlow='done';
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initReadingFlow); else initReadingFlow();
})();
