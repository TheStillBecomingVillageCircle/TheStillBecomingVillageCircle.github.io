/* The Still Becoming Village Circle — music bootstrap + page-specific resource enhancement */
(function () {
    'use strict';

    if (window.__TSBVC_MUSIC_BOOTSTRAP__) return;
    window.__TSBVC_MUSIC_BOOTSTRAP__ = true;

    function addMetanoiaBookResource() {
        if (!/LearningtheUnknown\.html$/.test(location.pathname)) return;

        const cards = document.querySelectorAll('.learning-card');
        const card = cards[cards.length - 1];
        if (!card || card.dataset.metanoiaUpdated === 'true') return;

        card.dataset.metanoiaUpdated = 'true';

        const title = card.querySelector('h3');
        const paragraph = card.querySelector('p');
        if (title) title.textContent = 'Metanoia';
        if (paragraph) paragraph.textContent = 'A transformative change in the way you see, understand, question, and move through what you thought you already knew.';

        const button = document.createElement('a');
        button.className = 'resource-button';
        button.href = 'https://a.co/d/01fMrrkq';
        button.target = '_blank';
        button.rel = 'noopener noreferrer';
        button.textContent = '📖 Explore The Audacity of You';
        card.appendChild(button);
    }

    function init() {
        if (!document.getElementById('villageSoundtrack') && !document.querySelector('script[src*="village-music.js"]')) {
            const script = document.createElement('script');
            script.src = 'village-music.js';
            script.async = false;
            document.body.appendChild(script);
        }
        addMetanoiaBookResource();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
