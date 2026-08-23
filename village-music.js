/* The Still Becoming Village Circle — persistent soundtrack + shared navigation */
(function () {
    'use strict';

    if (window.__TSBVC_MUSIC__) return;
    window.__TSBVC_MUSIC__ = true;

    const PLAYER_ID = 'villageSoundtrack';
    const NAV_PAGES = new Set(['index.html','about.html','LearningtheUnknown.html','experiences.html','events.html','contact.html','coaching.html','kitta.html']);
    const CANONICAL_PAGES = { 'events.html': 'experiences.html' };
    const BOOKING_URL = 'https://calendly.com/thestillbecomingvillagecircle/30min';
    const MUSIC_SRC = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1935974870&color=%2316aaa9&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false';

    let soundtrackWidget = null;
    let soundtrackReady = false;
    let soundtrackPlaying = false;

    function removeLegacyPlayers() {
        document.querySelectorAll('#soundtrack, .soundtrack, #musicBubble, .music-bubble').forEach(function (el) { el.remove(); });
    }

    function addStyles() {
        if (document.getElementById('village-music-styles')) return;
        const style = document.createElement('style');
        style.id = 'village-music-styles';
        style.textContent = `
            #${PLAYER_ID}{position:fixed;right:24px;bottom:24px;width:92px;height:92px;background:transparent;border:0;box-shadow:none;z-index:99999;display:flex;align-items:center;justify-content:center;cursor:pointer;overflow:visible}
            #${PLAYER_ID} .closed{position:relative;width:92px;height:92px;display:flex;align-items:center;justify-content:center;cursor:pointer;background:transparent;border:0;box-shadow:none}
            #${PLAYER_ID} .music-orb{width:88px;height:88px;display:flex;align-items:center;justify-content:center;background:transparent;border:0;box-shadow:none}
            #${PLAYER_ID} .sax{width:86px;height:86px;display:flex;align-items:center;justify-content:center;filter:drop-shadow(0 5px 10px rgba(40,120,120,.12));position:relative}
            .sax-bubble{width:86px;height:86px;display:block;overflow:visible}
            .sax-bubble .body{fill:url(#saxGlass);stroke:rgba(255,255,255,.90);stroke-width:1.4}
            .sax-bubble .edge{fill:none;stroke:rgba(40,120,120,.24);stroke-width:1.3}
            .sax-bubble .shine{fill:none;stroke:rgba(255,255,255,.94);stroke-width:2.1;stroke-linecap:round}
            .sax-bubble .key{fill:rgba(255,255,255,.46);stroke:rgba(40,120,120,.20);stroke-width:1}
            .sax-bubble .bubble-highlight{fill:rgba(255,255,255,.30);stroke:rgba(255,255,255,.70);stroke-width:1}
            #${PLAYER_ID} .play{position:absolute;left:40%;top:67%;right:auto;bottom:auto;transform:translate(-50%,-50%);width:29px;height:29px;border-radius:50%;border:1.5px solid rgba(255,255,255,.95);background:rgba(22,170,169,.82);color:white;display:flex;align-items:center;justify-content:center;font:13px Arial,sans-serif;box-shadow:0 4px 10px rgba(40,120,120,.14)}
            #${PLAYER_ID}.playing .play::after{content:'❚❚';font-size:10px;letter-spacing:-1px}
            #${PLAYER_ID}.playing .play{font-size:0}
            #${PLAYER_ID} .content{position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;overflow:hidden}
            #${PLAYER_ID}.open .content{position:fixed;left:auto;top:auto;right:20px;bottom:20px;width:min(390px,calc(100vw - 40px));height:auto;opacity:1;pointer-events:auto;overflow:visible;background:rgba(235,255,252,.94);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:16px;box-shadow:0 18px 45px rgba(40,120,120,.18);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
            #${PLAYER_ID} .title{text-align:center;color:#285f61;font:700 17px Arial,sans-serif;margin-bottom:2px}
            #${PLAYER_ID} .song{text-align:center;color:#16aaa9;font:14px Arial,sans-serif;margin-bottom:10px}
            #${PLAYER_ID} iframe{width:100%;height:166px;border:0;border-radius:16px;overflow:hidden}
            #${PLAYER_ID} .close{display:block;margin:9px auto 0;border:0;background:rgba(255,255,255,.9);color:#285f61;padding:7px 20px;border-radius:25px;font-weight:700;cursor:pointer}
            .conversation-link,.becoming-journey-link{margin-top:10px!important;padding:13px 24px;border:0;border-radius:52% 48% 45% 55% / 48% 55% 45% 52%;background:rgba(22,170,169,.10);color:#16aaa9;font-family:inherit;font-size:inherit;font-weight:700;line-height:1.4;cursor:pointer;appearance:none;-webkit-appearance:none;box-shadow:0 10px 24px rgba(40,120,120,.08);transition:transform .25s ease,background .25s ease}
            .conversation-link:hover,.becoming-journey-link:hover{background:rgba(22,170,169,.16);text-decoration:none!important;transform:translateY(-2px)}
            @media(max-width:600px){#${PLAYER_ID}{width:84px;height:84px;right:8px;bottom:10px}#${PLAYER_ID} .closed{width:84px;height:84px}#${PLAYER_ID} .music-orb{width:80px;height:80px}#${PLAYER_ID} .sax{width:80px;height:80px}.sax-bubble{width:80px;height:80px}#${PLAYER_ID} .play{width:27px;height:27px;left:40%;top:67%;right:auto;bottom:auto;transform:translate(-50%,-50%)}}
        `;
        document.head.appendChild(style);
    }

    function setPlayingState(isPlaying) {
        soundtrackPlaying = !!isPlaying;
        const player = document.getElementById(PLAYER_ID);
        if (player) player.classList.toggle('playing', soundtrackPlaying);
    }

    function playSoundtrack() {
        if (!soundtrackWidget || !soundtrackReady) return false;
        try { soundtrackWidget.play(); return true; } catch (error) { return false; }
    }

    function playFromUserGesture() {
        if (playSoundtrack()) return;
        const iframe = document.querySelector(`#${PLAYER_ID} .soundcloud-frame`);
        if (!iframe) return;
        try {
            const src = new URL(iframe.src);
            src.searchParams.set('auto_play', 'true');
            iframe.src = src.toString();
        } catch (error) {}
    }

    function pauseSoundtrack() {
        if (!soundtrackWidget || !soundtrackReady) return;
        try { soundtrackWidget.pause(); } catch (error) {}
    }

    function setupSoundtrackLoop() {
        const iframe = document.querySelector(`#${PLAYER_ID} .soundcloud-frame`);
        if (!iframe || iframe.dataset.loopBound === 'true') return;

        function bindWidget() {
            if (!window.SC || !window.SC.Widget) return;
            soundtrackWidget = window.SC.Widget(iframe);

            soundtrackWidget.bind(window.SC.Widget.Events.READY, function () {
                soundtrackReady = true;
                iframe.dataset.loopBound = 'true';
                soundtrackWidget.bind(window.SC.Widget.Events.PLAY, function () { setPlayingState(true); });
                soundtrackWidget.bind(window.SC.Widget.Events.PAUSE, function () { setPlayingState(false); });
                soundtrackWidget.bind(window.SC.Widget.Events.FINISH, function () {
                    soundtrackWidget.seekTo(0);
                    soundtrackWidget.play();
                });
            });
        }

        if (window.SC && window.SC.Widget) { bindWidget(); return; }
        let api = document.getElementById('soundcloud-widget-api');
        if (!api) {
            api = document.createElement('script');
            api.id = 'soundcloud-widget-api';
            api.src = 'https://w.soundcloud.com/player/api.js';
            api.async = false;
            api.onload = bindWidget;
            document.head.appendChild(api);
        } else {
            api.addEventListener('load', bindWidget, { once:true });
        }
    }

    function initializeScrollPlayback() {
        if (window.__TSBVC_SCROLL_MUSIC__) return;
        window.__TSBVC_SCROLL_MUSIC__ = true;
        let attempted = false;

        function startFromFirstGesture() {
            if (attempted) return;
            attempted = true;
            playFromUserGesture();
            window.removeEventListener('touchstart', startFromFirstGesture);
            window.removeEventListener('pointerdown', startFromFirstGesture);
            window.removeEventListener('wheel', startFromFirstGesture);
            window.removeEventListener('touchmove', startFromFirstGesture);
            window.removeEventListener('pointermove', startFromFirstGesture);
            window.removeEventListener('scroll', startFromFirstGesture);
        }

        window.addEventListener('touchstart', startFromFirstGesture, { passive:true });
        window.addEventListener('pointerdown', startFromFirstGesture, { passive:true });
        window.addEventListener('wheel', startFromFirstGesture, { passive:true });
        window.addEventListener('touchmove', startFromFirstGesture, { passive:true });
        window.addEventListener('pointermove', startFromFirstGesture, { passive:true });
        window.addEventListener('scroll', startFromFirstGesture, { passive:true });
    }

    function createPlayer() {
        if (document.getElementById(PLAYER_ID)) return;
        const el = document.createElement('div');
        el.id = PLAYER_ID;
        el.innerHTML = `<div class="closed" aria-label="The Village Soundtrack"><div class="music-orb"><span class="sax" aria-hidden="true"><svg class="sax-bubble" viewBox="0 0 80 80" role="img" aria-label="Translucent bubble saxophone"><defs><radialGradient id="saxGlass" cx="28%" cy="18%" r="92%"><stop offset="0" stop-color="rgba(255,255,255,.82)"/><stop offset=".38" stop-color="rgba(213,255,250,.46)"/><stop offset=".75" stop-color="rgba(142,225,220,.22)"/><stop offset="1" stop-color="rgba(255,255,255,.05)"/></radialGradient></defs><path class="body" d="M48 10c-3 7-5 14-5 22v19c0 9-5 17-14 17-7 0-12-4-12-10 0-6 5-10 11-10h10V30c0-9 3-15 8-20z"/><path class="edge" d="M48 10c7 1 13 6 16 12M17 58c-3 2-5 6-5 10 0 7 6 12 14 12 10 0 18-9 18-19"/><circle class="key" cx="37" cy="33" r="3"/><circle class="key" cx="37" cy="42" r="3"/><circle class="key" cx="37" cy="51" r="3"/><path class="shine" d="M23 22c4-8 10-12 18-14"/><path class="shine" d="M55 56c5-5 8-11 9-17"/><circle class="bubble-highlight" cx="60" cy="17" r="5"/><circle class="bubble-highlight" cx="67" cy="26" r="2.5"/></svg></span><div class="play" aria-hidden="true">▶</div></div></div><div class="content" onclick="event.stopPropagation()"><div class="title">The Village Soundtrack</div><div class="song">Bricks — Andra Day</div><iframe class="soundcloud-frame" scrolling="no" frameborder="no" allow="autoplay; encrypted-media" title="The Village Soundtrack" src="${MUSIC_SRC}"></iframe><button class="close" type="button">Close</button></div>`;
        document.body.appendChild(el);

        el.querySelector('.closed').addEventListener('click', function () {
            if (soundtrackPlaying) pauseSoundtrack();
            else playFromUserGesture();
        });
        el.querySelector('.close').addEventListener('click', function () { el.classList.remove('open'); });
        setupSoundtrackLoop();
        initializeScrollPlayback();
    }

    function initFloatingBubble(root) {
        const bubble = root.querySelector ? root.querySelector('#floatingBubble') : document.getElementById('floatingBubble');
        const message = root.querySelector ? root.querySelector('#floatingMessage') : document.getElementById('floatingMessage');
        if (!bubble || !message || bubble.dataset.villageBubbleInitialized === 'true') return;
        bubble.dataset.villageBubbleInitialized = 'true';
        const messages = ['🫧 You belong before you bloom.',"🫧 Healing isn't linear.",'🫧 Rest is productive.','🫧 Curiosity creates connection.','🫧 Becoming takes courage.',"🫧 It's okay to begin again.",'🫧 You are allowed to change.',"🫧 You don't have to rush becoming."];
        let index = 0, x = 12, y = 62, targetX = 12, targetY = 62;
        function choosePosition() { const maxX = window.innerWidth < 600 ? 68 : 78; const maxY = window.innerWidth < 600 ? 78 : 84; targetX = 8 + Math.random() * (maxX - 8); targetY = 14 + Math.random() * (maxY - 14); }
        function animate() { if (!document.body.contains(bubble)) return; x += (targetX - x) * 0.0028; y += (targetY - y) * 0.0028; bubble.style.left = x + '%'; bubble.style.top = y + '%'; requestAnimationFrame(animate); }
        function change() { if (!document.body.contains(bubble)) return; bubble.classList.remove('visible'); setTimeout(function () { if (!document.body.contains(bubble)) return; index = (index + 1) % messages.length; message.textContent = messages[index]; choosePosition(); bubble.classList.add('visible'); }, 1800); }
        choosePosition();
        setTimeout(function () { if (document.body.contains(bubble)) bubble.classList.add('visible'); }, 1200);
        setInterval(change, 9000);
        animate();
    }

    function normalizeNavigation() {
        document.querySelectorAll('a[href]').forEach(function (link) {
            const raw = link.getAttribute('href');
            if (!raw || raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:')) return;
            try {
                const target = new URL(raw, location.href);
                if (target.origin !== location.origin) return;
                const page = target.pathname.split('/').pop() || 'index.html';
                if (CANONICAL_PAGES[page]) { target.pathname = target.pathname.replace(page, CANONICAL_PAGES[page]); link.setAttribute('href', target.href); }
            } catch (error) {}
        });
    }

    function normalizeBookingLinks() {
        document.querySelectorAll('a[href*="calendly.com"]').forEach(function (link) { link.href = BOOKING_URL; link.target = '_blank'; link.rel = 'noopener noreferrer'; });
    }

    function cleanLegacyLanguage(root) {
        const replacements = [[/honest conversations/gi, 'honest reflection'],[/creative conversations/gi, 'creative exploration'],[/the conversation to begin/gi, 'the connection to begin'],[/start the conversation here/gi, 'start here'],[/A conversation\./g, 'An exploration.'],[/conversations/gi, 'exploration'],[/conversation/gi, 'exploration']];
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        const nodes = [];
        let node;
        while ((node = walker.nextNode())) nodes.push(node);
        nodes.forEach(function (textNode) { if (!textNode.nodeValue.trim()) return; let value = textNode.nodeValue; replacements.forEach(function (pair) { value = value.replace(pair[0], pair[1]); }); if (value !== textNode.nodeValue) textNode.nodeValue = value; });
    }

    function applyVillageFixes() {
        normalizeNavigation();
        normalizeBookingLinks();
        cleanLegacyLanguage(document.body);
        const journey = document.querySelector('.conversation-link');
        const footprints = document.getElementById('conversation');
        if (journey && footprints) {
            journey.textContent = '🌱 Let’s Take a Journey Into Your Becoming  →';
            journey.classList.remove('conversation-link');
            journey.classList.add('becoming-journey-link');
            journey.onclick = function (event) { event.preventDefault(); footprints.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
        }
        const footprintSection = document.getElementById('conversation');
        if (footprintSection) footprintSection.id = 'journey';
        const word = document.querySelector('.word-box h2');
        if (word && /Epistemic Humility/i.test(word.textContent)) {
            word.textContent = 'Liminality';
            const definition = document.querySelector('.word-definition');
            if (definition) definition.textContent = 'noun — the state of being between one stage, condition, identity, or place and another';
        }
    }

    function replacePageStyles(parsed) {
        document.head.querySelectorAll('style:not(#village-music-styles)').forEach(function (style) { style.remove(); });
        parsed.head.querySelectorAll('style').forEach(function (style) { document.head.insertBefore(document.importNode(style, true), document.getElementById('village-music-styles')); });
    }

    async function navigate(url, push) {
        const target = new URL(url, location.href);
        let page = target.pathname.split('/').pop() || 'index.html';
        if (CANONICAL_PAGES[page]) { page = CANONICAL_PAGES[page]; target.pathname = target.pathname.replace(target.pathname.split('/').pop(), page); }
        if (target.origin !== location.origin || !NAV_PAGES.has(page)) return false;
        const response = await fetch(target.href, { credentials: 'same-origin', cache: 'no-store' });
        if (!response.ok) throw new Error('Navigation failed: ' + response.status);
        const parsed = new DOMParser().parseFromString(await response.text(), 'text/html');
        const player = document.getElementById(PLAYER_ID);
        if (!player) return false;
        document.title = parsed.title || document.title;
        replacePageStyles(parsed);
        const incoming = [...parsed.body.children].filter(function (child) { return child.id !== PLAYER_ID && child.id !== 'soundtrack' && child.id !== 'musicBubble' && !child.classList.contains('soundtrack') && !child.classList.contains('music-bubble'); });
        [...document.body.children].forEach(function (child) { if (child !== player) child.remove(); });
        incoming.forEach(function (child) { document.body.insertBefore(document.importNode(child, true), player); });
        removeLegacyPlayers();
        applyVillageFixes();
        initFloatingBubble(document);
        if (push) history.pushState({ village: true }, '', target.href);
        window.scrollTo({ top: 0, behavior: 'instant' });
        window.dispatchEvent(new CustomEvent('village:pagechange', { detail: { url: target.href } }));
        return true;
    }

    document.addEventListener('click', function (event) {
        const link = event.target.closest && event.target.closest('a[href]');
        if (!link || link.target === '_blank' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const target = new URL(link.href, location.href);
        const page = target.pathname.split('/').pop() || 'index.html';
        if (target.origin !== location.origin || !NAV_PAGES.has(page) || target.pathname === location.pathname) return;
        event.preventDefault();
        navigate(target.href, true).catch(function () { location.href = target.href; });
    });

    window.addEventListener('popstate', function () { navigate(location.href, false).catch(function () {}); });

    function init() { removeLegacyPlayers(); addStyles(); createPlayer(); applyVillageFixes(); initFloatingBubble(document); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
    else init();
})();