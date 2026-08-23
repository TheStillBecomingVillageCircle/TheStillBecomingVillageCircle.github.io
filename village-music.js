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
    let pendingScrollPlay = false;
    let soundtrackPlaying = false;

    function removeLegacyPlayers() {
        document.querySelectorAll('#soundtrack, .soundtrack, #musicBubble, .music-bubble').forEach(function (el) { el.remove(); });
    }

    function addStyles() {
        if (document.getElementById('village-music-styles')) return;
        const style = document.createElement('style');
        style.id = 'village-music-styles';
        style.textContent = `
            #${PLAYER_ID}{position:fixed;right:22px;bottom:22px;width:178px;height:178px;border-radius:50%;background:radial-gradient(circle at 30% 24%,rgba(255,255,255,.96),rgba(225,255,251,.58) 42%,rgba(173,238,232,.28) 70%,rgba(143,226,220,.16));border:2px solid rgba(255,255,255,.82);box-shadow:0 18px 45px rgba(40,120,120,.16),inset 10px 10px 24px rgba(255,255,255,.82),inset -8px -8px 22px rgba(68,180,187,.10);z-index:99999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);animation:villageFloat 5s ease-in-out infinite;cursor:pointer;overflow:hidden}
            #${PLAYER_ID}::before,#${PLAYER_ID}::after{content:'';position:absolute;border-radius:50%;border:1px solid rgba(255,255,255,.62);pointer-events:none}
            #${PLAYER_ID}::before{width:28px;height:28px;left:18px;top:24px;background:rgba(255,255,255,.20)}
            #${PLAYER_ID}::after{width:13px;height:13px;right:24px;top:36px;background:rgba(255,255,255,.28)}
            #${PLAYER_ID}.open{width:min(390px,calc(100vw - 24px));height:auto;min-height:245px;border-radius:32px;animation:none;padding:16px;cursor:default}
            #${PLAYER_ID} .closed{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%;cursor:pointer;text-align:center}
            #${PLAYER_ID}.open .closed{display:none}
            #${PLAYER_ID} .label{text-align:center;font:700 12px Arial,sans-serif;color:#285f61;margin-bottom:5px;text-shadow:0 1px 1px rgba(255,255,255,.75)}
            #${PLAYER_ID} .music-orb{width:104px;height:104px;display:flex;align-items:center;justify-content:center;position:relative;background:transparent;border:0;box-shadow:none}
            #${PLAYER_ID} .sax{width:72px;height:72px;display:flex;align-items:center;justify-content:center;filter:drop-shadow(0 4px 8px rgba(40,120,120,.12));transform:none;position:relative}
            .sax-bubble{width:70px;height:70px;display:block;overflow:visible}
            .sax-bubble .body{fill:url(#saxGlass);stroke:rgba(255,255,255,.86);stroke-width:1.5}
            .sax-bubble .edge{fill:none;stroke:rgba(40,120,120,.28);stroke-width:1.5}
            .sax-bubble .shine{fill:none;stroke:rgba(255,255,255,.92);stroke-width:2.2;stroke-linecap:round}
            .sax-bubble .key{fill:rgba(255,255,255,.48);stroke:rgba(40,120,120,.22);stroke-width:1}
            .sax-bubble .bubble-highlight{fill:rgba(255,255,255,.34);stroke:rgba(255,255,255,.72);stroke-width:1}
            #${PLAYER_ID} .play{position:absolute;right:-2px;bottom:-2px;width:34px;height:34px;border-radius:50%;border:2px solid rgba(255,255,255,.95);background:rgba(22,170,169,.92);color:white;display:flex;align-items:center;justify-content:center;font:15px Arial,sans-serif;box-shadow:0 5px 12px rgba(40,120,120,.18)}
            #${PLAYER_ID}.playing .play::after{content:'❚❚';font-size:12px;letter-spacing:-1px}
            #${PLAYER_ID}.playing .play{font-size:0}
            #${PLAYER_ID} .tap{text-align:center;font:11px Arial,sans-serif;color:#527779;margin-top:6px}
            #${PLAYER_ID} .tap::after{content:' • Tap to pause';display:none}
            #${PLAYER_ID}.playing .tap::after{display:inline}
            #${PLAYER_ID}.playing .tap{font-weight:600}
            #${PLAYER_ID}.open .tap{display:none}
            #${PLAYER_ID} .content{position:absolute;left:1px;top:1px;width:1px;height:1px;opacity:0;pointer-events:none;overflow:hidden}
            #${PLAYER_ID}.open .content{position:static;width:100%;height:auto;opacity:1;pointer-events:auto;overflow:visible}
            #${PLAYER_ID} .title{text-align:center;color:#285f61;font:700 17px Arial,sans-serif;margin-bottom:2px}
            #${PLAYER_ID} .song{text-align:center;color:#16aaa9;font:14px Arial,sans-serif;margin-bottom:10px}
            #${PLAYER_ID} iframe{width:100%;height:166px;border:0;border-radius:16px;overflow:hidden}
            #${PLAYER_ID} .close{display:block;margin:9px auto 0;border:0;background:rgba(255,255,255,.9);color:#285f61;padding:7px 20px;border-radius:25px;font-weight:700;cursor:pointer}
            .conversation-link,.becoming-journey-link{margin-top:10px!important;padding:13px 24px;border:0;border-radius:52% 48% 45% 55% / 48% 55% 45% 52%;background:rgba(22,170,169,.10);color:#16aaa9;font-family:inherit;font-size:inherit;font-weight:700;line-height:1.4;cursor:pointer;appearance:none;-webkit-appearance:none;box-shadow:0 10px 24px rgba(40,120,120,.08);transition:transform .25s ease,background .25s ease}
            .conversation-link:hover,.becoming-journey-link:hover{background:rgba(22,170,169,.16);text-decoration:none!important;transform:translateY(-2px)}
            @keyframes villageFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
            @media(max-width:600px){#${PLAYER_ID}{width:150px;height:150px;right:10px;bottom:10px}#${PLAYER_ID}.open{width:calc(100vw - 20px);min-height:240px;right:10px;bottom:10px}#${PLAYER_ID} .music-orb{width:90px;height:90px}#${PLAYER_ID} .sax{width:64px;height:64px}.sax-bubble{width:62px;height:62px}}
        `;
        document.head.appendChild(style);
    }

    function setPlayingState(isPlaying) {
        soundtrackPlaying = !!isPlaying;
        const player = document.getElementById(PLAYER_ID);
        if (player) player.classList.toggle('playing', soundtrackPlaying);
    }

    function playSoundtrack() {
        if (!soundtrackWidget || !soundtrackReady) {
            pendingScrollPlay = true;
            return;
        }
        try { soundtrackWidget.play(); } catch (error) {}
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

                if (pendingScrollPlay) {
                    pendingScrollPlay = false;
                    playSoundtrack();
                }
            });
        }

        if (window.SC && window.SC.Widget) { bindWidget(); return; }

        let api = document.getElementById('soundcloud-widget-api');
        if (!api) {
            api = document.createElement('script');
            api.id = 'soundcloud-widget-api';
            api.src = 'https://w.soundcloud.com/player/api.js';
            api.async = true;
            api.onload = bindWidget;
            document.head.appendChild(api);
        } else {
            api.addEventListener('load', bindWidget, { once:true });
        }
    }

    function initializeScrollPlayback() {
        if (window.__TSBVC_SCROLL_MUSIC__) return;
        window.__TSBVC_SCROLL_MUSIC__ = true;

        let startedByScroll = false;

        function startFromUserScroll() {
            if (startedByScroll) return;
            startedByScroll = true;
            pendingScrollPlay = true;
            playSoundtrack();
            window.removeEventListener('scroll', startFromUserScroll);
            window.removeEventListener('wheel', startFromUserScroll);
            window.removeEventListener('touchmove', startFromUserScroll);
            window.removeEventListener('pointermove', startFromUserScroll);
        }

        window.addEventListener('touchmove', startFromUserScroll, { passive:true, once:true });
        window.addEventListener('wheel', startFromUserScroll, { passive:true, once:true });
        window.addEventListener('pointermove', startFromUserScroll, { passive:true, once:true });
        window.addEventListener('scroll', startFromUserScroll, { passive:true, once:true });
    }

    function createPlayer() {
        if (document.getElementById(PLAYER_ID)) return;
        const el = document.createElement('div');
        el.id = PLAYER_ID;
        el.innerHTML = `<div class="closed" aria-label="The Village Soundtrack"><div class="label">🫧 The Village Soundtrack</div><div class="music-orb"><span class="sax" aria-hidden="true"><svg class="sax-bubble" viewBox="0 0 80 80" role="img" aria-label="Translucent bubble saxophone"><defs><radialGradient id="saxGlass" cx="28%" cy="18%" r="92%"><stop offset="0" stop-color="rgba(255,255,255,.78)"/><stop offset=".38" stop-color="rgba(213,255,250,.42)"/><stop offset=".75" stop-color="rgba(142,225,220,.20)"/><stop offset="1" stop-color="rgba(255,255,255,.06)"/></radialGradient></defs><path class="body" d="M48 10c-3 7-5 14-5 22v19c0 9-5 17-14 17-7 0-12-4-12-10 0-6 5-10 11-10h10V30c0-9 3-15 8-20z"/><path class="edge" d="M48 10c7 1 13 6 16 12M17 58c-3 2-5 6-5 10 0 7 6 12 14 12 10 0 18-9 18-19"/><circle class="key" cx="37" cy="33" r="3"/><circle class="key" cx="37" cy="42" r="3"/><circle class="key" cx="37" cy="51" r="3"/><path class="shine" d="M23 22c4-8 10-12 18-14"/><path class="shine" d="M55 56c5-5 8-11 9-17"/><circle class="bubble-highlight" cx="60" cy="17" r="5"/><circle class="bubble-highlight" cx="67" cy="26" r="2.5"/></svg></span><div class="play" aria-hidden="true">▶</div></div><div class="tap">Tap to listen</div></div><div class="content" onclick="event.stopPropagation()"><div class="title">🫧 The Village Soundtrack</div><div class="song">Bricks — Andra Day</div><iframe class="soundcloud-frame" scrolling="no" frameborder="no" allow="autoplay; encrypted-media" title="The Village Soundtrack" src="${MUSIC_SRC}"></iframe><button class="close" type="button">Close</button></div>`;
        document.body.appendChild(el);

        el.querySelector('.closed').addEventListener('click', function () {
            if (soundtrackPlaying) { pauseSoundtrack(); }
            else { pendingScrollPlay = false; playSoundtrack(); }
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
        const replacements = [
            [/honest conversations/gi, 'honest reflection'],
            [/creative conversations/gi, 'creative exploration'],
            [/the conversation to begin/gi, 'the connection to begin'],
            [/start the conversation here/gi, 'start here'],
            [/A conversation\./g, 'An exploration.'],
            [/conversations/gi, 'exploration'],
            [/conversation/gi, 'exploration']
        ];
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        const nodes = [];
        let node;
        while ((node = walker.nextNode())) nodes.push(node);
        nodes.forEach(function (textNode) {
            if (!textNode.nodeValue.trim()) return;
            let value = textNode.nodeValue;
            replacements.forEach(function (pair) { value = value.replace(pair[0], pair[1]); });
            if (value !== textNode.nodeValue) textNode.nodeValue = value;
        });
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