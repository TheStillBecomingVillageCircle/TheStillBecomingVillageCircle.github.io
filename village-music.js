/* The Still Becoming Village Circle — persistent soundtrack + shared navigation */
(function () {
    'use strict';

    if (window.__TSBVC_MUSIC__) return;
    window.__TSBVC_MUSIC__ = true;

    const PLAYER_ID = 'villageSoundtrack';
    const NAV_PAGES = new Set(['index.html','about.html','LearningtheUnknown.html','experiences.html','events.html','contact.html','coaching.html','kitta.html']);
    const MUSIC_SRC = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1935974870&color=%2316aaa9&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false';

    function removeLegacyPlayers() {
        document.querySelectorAll('#soundtrack, .soundtrack, #musicBubble, .music-bubble').forEach(function (el) { el.remove(); });
    }

    function addStyles() {
        if (document.getElementById('village-music-styles')) return;
        const style = document.createElement('style');
        style.id = 'village-music-styles';
        style.textContent = `
            #${PLAYER_ID}{position:fixed;right:22px;bottom:22px;width:185px;height:185px;border-radius:50%;background:radial-gradient(circle at 30% 25%,rgba(255,255,255,.98),rgba(220,255,251,.92) 48%,rgba(177,239,233,.78));border:2px solid rgba(255,255,255,.95);box-shadow:0 18px 45px rgba(40,120,120,.20),inset 8px 8px 18px rgba(255,255,255,.90);z-index:99999;display:flex;align-items:center;justify-content:center;animation:villageFloat 5s ease-in-out infinite}
            #${PLAYER_ID}.open{width:min(390px,calc(100vw - 24px));height:auto;min-height:245px;border-radius:32px;animation:none;padding:16px}
            #${PLAYER_ID} .closed{display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;cursor:pointer}
            #${PLAYER_ID}.open .closed{display:none}
            #${PLAYER_ID} .label{text-align:center;font:700 12px Arial,sans-serif;color:#285f61;margin-bottom:8px}
            #${PLAYER_ID} .deck{width:130px;height:88px;background:linear-gradient(145deg,#ded6ca,#b7aa99);border-radius:13px;box-shadow:0 8px 16px rgba(0,0,0,.18);position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden}
            #${PLAYER_ID} .record{width:70px;height:70px;border-radius:50%;background:url('bricks-cover.jpeg') center/cover;position:relative;z-index:2;border:5px solid #171717;box-shadow:0 3px 10px rgba(0,0,0,.35)}
            #${PLAYER_ID} .record:after{content:'';position:absolute;width:8px;height:8px;border-radius:50%;background:#d7c6a4;border:2px solid #111;left:50%;top:50%;transform:translate(-50%,-50%)}
            #${PLAYER_ID} .play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:36px;height:36px;border-radius:50%;border:2px solid white;background:rgba(22,170,169,.94);color:white;display:flex;align-items:center;justify-content:center;font:16px Arial;z-index:5}
            #${PLAYER_ID} .arm{width:42px;height:5px;background:#4e4942;position:absolute;right:7px;top:17px;transform:rotate(28deg);transform-origin:right center;border-radius:5px;z-index:3}
            #${PLAYER_ID} .tap{text-align:center;font:11px Arial,sans-serif;color:#527779;margin-top:7px}
            #${PLAYER_ID} .content{position:absolute;left:1px;top:1px;width:1px;height:1px;opacity:0;pointer-events:none;overflow:hidden}
            #${PLAYER_ID}.open .content{position:static;width:100%;height:auto;opacity:1;pointer-events:auto;overflow:visible}
            #${PLAYER_ID} .title{text-align:center;color:#285f61;font:700 17px Arial,sans-serif;margin-bottom:2px}
            #${PLAYER_ID} .song{text-align:center;color:#16aaa9;font:14px Arial,sans-serif;margin-bottom:10px}
            #${PLAYER_ID} iframe{width:100%;height:166px;border:0;border-radius:16px;overflow:hidden}
            #${PLAYER_ID} .close{display:block;margin:9px auto 0;border:0;background:rgba(255,255,255,.9);color:#285f61;padding:7px 20px;border-radius:25px;font-weight:700;cursor:pointer}
            .conversation-link{border-radius:52% 48% 45% 55% / 48% 55% 45% 52%!important}
            @keyframes villageFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
            @media(max-width:600px){#${PLAYER_ID}{width:155px;height:155px;right:10px;bottom:10px}#${PLAYER_ID}.open{width:calc(100vw - 20px);min-height:240px;right:10px;bottom:10px}#${PLAYER_ID} .deck{transform:scale(.78)}}
        `;
        document.head.appendChild(style);
    }

    function createPlayer() {
        if (document.getElementById(PLAYER_ID)) return;
        const el = document.createElement('div');
        el.id = PLAYER_ID;
        el.innerHTML = `<div class="closed"><div class="label">🫧 The Village Soundtrack</div><div class="deck"><div class="record"><div class="play">▶</div></div><div class="arm"></div></div><div class="tap">Tap the record to listen</div></div><div class="content" onclick="event.stopPropagation()"><div class="title">🫧 The Village Soundtrack</div><div class="song">Bricks — Andra Day</div><iframe class="soundcloud-frame" scrolling="no" frameborder="no" allow="autoplay; encrypted-media" title="The Village Soundtrack" src="${MUSIC_SRC}"></iframe><button class="close" type="button">Close</button></div>`;
        document.body.appendChild(el);
        el.querySelector('.closed').addEventListener('click', function () { el.classList.add('open'); });
        el.querySelector('.close').addEventListener('click', function () { el.classList.remove('open'); });
    }

    function initFloatingBubble(root) {
        const bubble = root.querySelector ? root.querySelector('#floatingBubble') : document.getElementById('floatingBubble');
        const message = root.querySelector ? root.querySelector('#floatingMessage') : document.getElementById('floatingMessage');
        if (!bubble || !message || bubble.dataset.villageBubbleInitialized === 'true') return;
        bubble.dataset.villageBubbleInitialized = 'true';

        const messages = ['🫧 You belong before you bloom.',"🫧 Healing isn't linear.",'🫧 Rest is productive.','🫧 Curiosity creates connection.','🫧 Becoming takes courage.',"🫧 It's okay to begin again.",'🫧 You are allowed to change.',"🫧 You don't have to rush becoming."];
        let index = 0, x = 12, y = 62, targetX = 12, targetY = 62;

        function choosePosition() {
            const maxX = window.innerWidth < 600 ? 68 : 78;
            const maxY = window.innerWidth < 600 ? 78 : 84;
            targetX = 8 + Math.random() * (maxX - 8);
            targetY = 14 + Math.random() * (maxY - 14);
        }
        function animate() {
            if (!document.body.contains(bubble)) return;
            x += (targetX - x) * 0.0028;
            y += (targetY - y) * 0.0028;
            bubble.style.left = x + '%';
            bubble.style.top = y + '%';
            requestAnimationFrame(animate);
        }
        function change() {
            if (!document.body.contains(bubble)) return;
            bubble.classList.remove('visible');
            setTimeout(function () {
                if (!document.body.contains(bubble)) return;
                index = (index + 1) % messages.length;
                message.textContent = messages[index];
                choosePosition();
                bubble.classList.add('visible');
            }, 1800);
        }
        choosePosition();
        setTimeout(function () { if (document.body.contains(bubble)) bubble.classList.add('visible'); }, 1200);
        setInterval(change, 9000);
        animate();
    }

    function applyVillageFixes() {
        const journey = document.querySelector('.conversation-link');
        const footprints = document.getElementById('conversation');
        if (journey && footprints) {
            journey.textContent = '🌱 Let’s Take a Journey Into Your Becoming  →';
            journey.onclick = function (event) {
                event.preventDefault();
                footprints.scrollIntoView({ behavior: 'smooth', block: 'start' });
            };
        }

        const word = document.querySelector('.word-box h2');
        if (word && /Epistemic Humility/i.test(word.textContent)) {
            word.textContent = 'Liminality';
            const definition = document.querySelector('.word-definition');
            if (definition) definition.textContent = 'noun — the state of being between one stage, condition, identity, or place and another';
        }
    }

    function replacePageStyles(parsed) {
        document.head.querySelectorAll('style:not(#village-music-styles)').forEach(function (style) { style.remove(); });
        parsed.head.querySelectorAll('style').forEach(function (style) {
            document.head.insertBefore(document.importNode(style, true), document.getElementById('village-music-styles'));
        });
    }

    async function navigate(url, push) {
        const target = new URL(url, location.href);
        const page = target.pathname.split('/').pop() || 'index.html';
        if (target.origin !== location.origin || !NAV_PAGES.has(page)) return false;

        const response = await fetch(target.href, { credentials: 'same-origin' });
        if (!response.ok) throw new Error('Navigation failed: ' + response.status);

        const parsed = new DOMParser().parseFromString(await response.text(), 'text/html');
        const player = document.getElementById(PLAYER_ID);
        if (!player) return false;

        document.title = parsed.title || document.title;
        replacePageStyles(parsed);

        const incoming = [...parsed.body.children].filter(function (child) {
            return child.id !== PLAYER_ID && child.id !== 'soundtrack' && child.id !== 'musicBubble' && !child.classList.contains('soundtrack') && !child.classList.contains('music-bubble');
        });

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

    function init() {
        removeLegacyPlayers();
        addStyles();
        createPlayer();
        applyVillageFixes();
        initFloatingBubble(document);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
    else init();
})();
