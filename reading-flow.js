(function () {
  function simplifyNavigation() {
    const nav = document.getElementById('tsbvc-static-nav');
    if (!nav || nav.dataset.villageNavDone === 'true') return;
    nav.dataset.villageNavDone = 'true';

    const links = Array.from(nav.querySelectorAll('a'));
    const topLinks = links.slice(0, 6);
    const bottomLinks = links.slice(6, 12);
    const targets = [
      ['index.html?nav=static-1', 'Home'],
      ['about.html?nav=static-1', 'Inside the Village'],
      ['web-design.html?nav=static-1', 'Webspace'],
      ['coming-together.html?nav=static-1', 'Be Coming Together']
    ];

    // Rebuild the clickable navigation as four destinations without touching the artwork.
    const overlay = nav.querySelector('div > div');
    if (overlay) {
      overlay.style.display = 'grid';
      overlay.style.gridTemplateColumns = '19.02% 31.60% 20.80% 28.58%';
      overlay.innerHTML = '';
      targets.forEach(function (item) {
        const a = document.createElement('a');
        a.href = item[0];
        a.setAttribute('aria-label', item[1]);
        a.style.cssText = 'position:absolute;top:0;height:78.3%;z-index:3;display:block;';
        overlay.appendChild(a);
      });

      const zones = [
        ['0%', '19.02%'],
        ['19.02%', '31.60%'],
        ['50.62%', '20.80%'],
        ['71.42%', '28.58%']
      ];
      Array.from(overlay.children).forEach(function (a, i) {
        a.style.left = zones[i][0];
        a.style.width = zones[i][1];
      });

      const bottom = document.createElement('div');
      bottom.style.cssText = 'position:absolute;left:0;right:0;bottom:0;height:21.7%;display:grid;grid-template-columns:19.02% 31.60% 20.80% 28.58%;align-items:center;background:#fff;z-index:4;line-height:1;';
      targets.forEach(function (item) {
        const a = document.createElement('a');
        a.href = item[0];
        a.textContent = item[1];
        a.style.cssText = "color:#174f57;text-decoration:none;text-align:center;font:clamp(8px,1.35vw,17px)/1.03 Georgia,'Times New Roman',serif;padding:2px 3px;";
        bottom.appendChild(a);
      });
      overlay.parentElement.appendChild(bottom);
      return;
    }

    // Fallback for an unexpected navigation structure.
    topLinks.forEach(function (a) { a.style.display = 'none'; });
    bottomLinks.forEach(function (a) { a.style.display = 'none'; });
  }

  function initReadingFlow() {
    simplifyNavigation();

    if (document.body.classList.contains('reading-flow-ready')) return;
    document.body.classList.add('reading-flow-ready');

    // Keep the homepage intentionally open and welcoming.
    const path = (window.location.pathname || '').toLowerCase();
    if (path.endsWith('/index.html') || path === '/' || path === '') return;

    const style = document.createElement('style');
    style.textContent = `
      .village-more {
        margin: 22px auto 0;
        text-align: center;
      }
      .village-more summary {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        cursor: pointer;
        list-style: none;
        padding: 11px 18px;
        border-radius: 999px;
        background: rgba(22,170,169,.08);
        color: #16aaa9;
        font-weight: 700;
        line-height: 1.3;
        transition: background .2s ease, transform .2s ease;
      }
      .village-more summary::-webkit-details-marker { display:none; }
      .village-more summary:hover { background: rgba(22,170,169,.14); transform: translateY(-1px); }
      .village-more[open] summary { margin-bottom: 18px; }
      .village-more-content > :first-child { margin-top: 0; }
      @media (max-width: 600px) {
        .village-more summary { font-size: 14px; padding: 10px 16px; }
      }
    `;
    document.head.appendChild(style);

    const selectors = [
      '.section-box', '.mission-box', '.thought', '.scope', '.cta', '.person',
      '.intro-box', '.word-box', '.philosophy-box', '.coming-box', '.event-space-box'
    ];

    document.querySelectorAll(selectors.join(',')).forEach(function (box) {
      if (box.dataset.readingFlow === 'done') return;
      const paragraphs = Array.from(box.children).filter(function (el) { return el.tagName === 'P'; });
      if (paragraphs.length < 3) return;
      const textLength = paragraphs.reduce(function (sum, p) { return sum + (p.textContent || '').trim().length; }, 0);
      if (textLength < 420 && paragraphs.length < 4) return;

      const hidden = paragraphs.slice(2);
      if (!hidden.length) return;
      const details = document.createElement('details');
      details.className = 'village-more';
      const summary = document.createElement('summary');
      summary.textContent = 'Keep reading →';
      const content = document.createElement('div');
      content.className = 'village-more-content';
      hidden.forEach(function (p) { content.appendChild(p); });
      details.appendChild(summary);
      details.appendChild(content);

      const firstNonParagraph = Array.from(box.children).find(function (el) {
        return el !== details && el.tagName !== 'P';
      });
      if (firstNonParagraph) box.insertBefore(details, firstNonParagraph);
      else box.appendChild(details);

      details.addEventListener('toggle', function () {
        summary.textContent = details.open ? 'Close this thought ↑' : 'Keep reading →';
      });
      box.dataset.readingFlow = 'done';
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initReadingFlow);
  else initReadingFlow();
})();
