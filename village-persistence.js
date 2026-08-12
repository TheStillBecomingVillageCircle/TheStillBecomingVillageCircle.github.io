/* The Still Becoming Village Circle — music bootstrap only */
(function () {
    'use strict';

    if (window.__TSBVC_MUSIC_BOOTSTRAP__) return;
    window.__TSBVC_MUSIC_BOOTSTRAP__ = true;

    if (document.getElementById('villageSoundtrack')) return;
    if (document.querySelector('script[src*="village-music.js"]')) return;

    const script = document.createElement('script');
    script.src = 'village-music.js';
    script.async = false;
    document.body.appendChild(script);
})();
