(function () {
  'use strict';
  if (window.__TSBVC_PERSISTENT_NAV__) return;
  window.__TSBVC_PERSISTENT_NAV__ = true;

  const PLAYER_SELECTOR = '.soundtrack';
  const MUSIC_PLAYER_ID = 'villageSoundtrack';
  const MARK = 'data-village-page-style';

  function markStyles() {
    document.head.querySelectorAll('style:not([' + MARK + '])').forEach(s => s.setAttribute(MARK, 'true'));
  }

  function sameSite(url) {
    return url.origin === location.origin && (url.protocol === 'http:' || url.protocol === 'https:');
  }

  function shouldHandle(a, url) {
    // The dedicated village-music navigation must own page changes while
    // its persistent SoundCloud player is present. Competing navigation
    // destroys the live iframe and stops playback.
    if (document.getElementById(MUSIC_PLAYER_ID)) return false;
    return a && sameSite(url) && !a.hasAttribute('download') && !a.target &&
      url.pathname.endsWith('.html') && url.pathname !== location.pathname;
  }

  async function navigate(url, push) {
    const response = await fetch(url.href, { credentials: 'same-origin' });
    if (!response.ok) throw new Error('Navigation failed: ' + response.status);
    const html = await response.text();
    const parser = new DOMParser();
    const next = parser.parseFromString(html, 'text/html');
    const player = document.querySelector(PLAYER_SELECTOR);

    document.head.querySelectorAll('style[' + MARK + ']').forEach(s => s.remove());
    next.head.querySelectorAll('style').forEach(s => {
      const clone = document.importNode(s, true);
      clone.setAttribute(MARK, 'true');
      document.head.appendChild(clone);
    });
    next.head.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      if (![...document.head.querySelectorAll('link[rel="stylesheet"]')].some(x => x.href === link.href)) {
        document.head.appendChild(document.importNode(link, true));
      }
    });

    document.title = next.title || document.title;
    const incoming = [...next.body.children].filter(el => !el.matches(PLAYER_SELECTOR));
    document.body.replaceChildren(...incoming, ...(player ? [player] : []));

    next.body.querySelectorAll('script').forEach(oldScript => {
      if (oldScript.src && oldScript.src.includes('village-persistence.js')) return;
      const script = document.createElement('script');
      [...oldScript.attributes].forEach(attr => script.setAttribute(attr.name, attr.value));
      if (!oldScript.src) script.textContent = oldScript.textContent;
      document.body.appendChild(script);
    });

    if (push) history.pushState({ village: true }, '', url.href);
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.dispatchEvent(new CustomEvent('village:pagechange', { detail: { url: url.href } }));
  }

  document.addEventListener('click', function (event) {
    const a = event.target.closest && event.target.closest('a');
    if (!a) return;
    const url = new URL(a.href, location.href);
    if (!shouldHandle(a, url)) return;
    event.preventDefault();
    navigate(url, true).catch(() => { location.href = url.href; });
  });

  window.addEventListener('popstate', function () {
    if (document.getElementById(MUSIC_PLAYER_ID)) return;
    navigate(new URL(location.href), false).catch(() => {});
  });

  markStyles();
})();
