/* The Still Becoming Village Circle — persistent soundtrack */
(function () {
    const MUSIC_SRC = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1935974870&color=%2316aaa9&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false';
    const PLAYER_ID = 'villageSoundtrack';
    const NAV_PAGES = new Set(['index.html','about.html','LearningtheUnknown.html','experiences.html','contact.html','coaching.html','kitta.html']);

    function addStyles() {
        if (document.getElementById('village-music-styles')) return;
        const style = document.createElement('style');
        style.id = 'village-music-styles';
        style.textContent = `
            #${PLAYER_ID}{position:fixed;right:22px;bottom:22px;width:185px;height:185px;border-radius:50%;background:radial-gradient(circle at 30% 25%,rgba(255,255,255,.98),rgba(220,255,251,.92) 48%,rgba(177,239,233,.78));border:2px solid rgba(255,255,255,.95);box-shadow:0 18px 45px rgba(40,120,120,.20),inset 8px 8px 18px rgba(255,255,255,.90);z-index:99999;display:flex;align-items:center;justify-content:center;animation:villageFloat 5s ease-in-out infinite;}
            #${PLAYER_ID}.open{width:min(390px,calc(100vw - 24px));height:auto;min-height:245px;border-radius:32px;animation:none;padding:16px;}
            #${PLAYER_ID} .closed{display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;cursor:pointer}
            #${PLAYER_ID}.open .closed{display:none}
            #${PLAYER_ID} .label{text-align:center;font:700 12px Arial,sans-serif;color:#285f61;margin-bottom:8px}
            #${PLAYER_ID} .deck{width:130px;height:88px;background:linear-gradient(145deg,#ded6ca,#b7aa99);border-radius:13px;box-shadow:0 8px 16px rgba(0,0,0,.18);position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden}
            #${PLAYER_ID} .record{width:70px;height:70px;border-radius:50%;background:url('bricks-cover.jpeg') center/cover;position:relative;z-index:2;border:5px solid #171717;box-shadow:0 3px 10px rgba(0,0,0,.35)}
            #${PLAYER_ID} .record:after{content:'';position:absolute;width:8px;height:8px;border-radius:50%;background:#d7c6a4;border:2px solid #111;left:50%;top:50%;transform:translate(-50%,-50%)}
            #${PLAYER_ID} .play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:36px;height:36px;border-radius:50%;border:2px solid white;background:rgba(22,170,169,.94);color:white;display:flex;align-items:center;justify-content:center;font:16px Arial;z-index:5}
            #${PLAYER_ID} .arm{width:42px;height:5px;background:#4e4942;position:absolute;right:7px;top:17px;transform:rotate(28deg);transform-origin:right center;border-radius:5px;z-index:3}
            #${PLAYER_ID} .tap{text-align:center;font:11px Arial,sans-serif;color:#527779;margin-top:7px}
            #${PLAYER_ID} .content{display:none;width:100%}
            #${PLAYER_ID}.open .content{display:block}
            #${PLAYER_ID} .title{text-align:center;color:#285f61;font:700 17px Arial,sans-serif;margin-bottom:2px}
            #${PLAYER_ID} .song{text-align:center;color:#16aaa9;font:14px Arial,sans-serif;margin-bottom:10px}
            #${PLAYER_ID} iframe{width:100%;height:166px;border:0;border-radius:16px;overflow:hidden}
            #${PLAYER_ID} .close{display:block;margin:9px auto 0;border:0;background:rgba(255,255,255,.9);color:#285f61;padding:7px 20px;border-radius:25px;font-weight:700;cursor:pointer}
            @keyframes villageFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
            @media(max-width:600px){#${PLAYER_ID}{width:155px;height:155px;right:10px;bottom:10px}#${PLAYER_ID}.open{width:calc(100vw - 20px);min-height:240px;right:10px;bottom:10px}#${PLAYER_ID} .deck{transform:scale(.78)}}
        `;
        document.head.appendChild(style);
    }

    function createPlayer() {
        if (document.getElementById(PLAYER_ID)) return;
        const el = document.createElement('div');
        el.id = PLAYER_ID;
        el.innerHTML = `<div class="closed"><div class="label">🫧 The Village Soundtrack</div><div class="deck"><div class="record"><div class="play">▶</div></div><div class="arm"></div></div><div class="tap">Tap the record to listen</div></div><div class="content" onclick="event.stopPropagation()"><div class="title">🫧 The Village Soundtrack</div><div class="song">Bricks — Andra Day</div><iframe class="soundcloud-frame" scrolling="no" frameborder="no" allow="autoplay; encrypted-media" src="${MUSIC_SRC}"></iframe><button class="close" type="button">Close</button></div>`;
        document.body.appendChild(el);
        el.querySelector('.closed').addEventListener('click', () => el.classList.add('open'));
        el.querySelector('.close').addEventListener('click', () => el.classList.remove('open'));
    }

    function runPageScripts(root) {
        root.querySelectorAll('script').forEach(oldScript => {
            if (oldScript.src && oldScript.src.endsWith('/village-music.js')) return;
            const s = document.createElement('script');
            if (oldScript.src) s.src = oldScript.src;
            else s.textContent = oldScript.textContent;
            oldScript.replaceWith(s);
        });
    }

    async function navigate(url, push) {
        const target = new URL(url, location.href);
        if (target.origin !== location.origin || !NAV_PAGES.has(target.pathname.split('/').pop())) return false;
        const response = await fetch(target.href, { credentials: 'same-origin' });
        if (!response.ok) return false;
        const parsed = new DOMParser().parseFromString(await response.text(), 'text/html');

        // Keep the SAME player element and live SoundCloud iframe.
        // Recreating the iframe causes SoundCloud to stop playback.
        const player = document.getElementById(PLAYER_ID);
        const wasOpen = !!(player && player.classList.contains('open'));

        document.head.innerHTML = parsed.head.innerHTML;
        document.body.innerHTML = parsed.body.innerHTML;
        document.body.className = parsed.body.className;
        addStyles();

        if (player) {
            document.body.appendChild(player);
            if (wasOpen) player.classList.add('open');
        } else {
            createPlayer();
        }

        runPageScripts(document.body);
        if (push) history.pushState({ village: true }, '', target.href);
        window.scrollTo(0, 0);
        window.dispatchEvent(new Event('resize'));
        return true;
    }

    document.addEventListener('click', function (event) {
        const link = event.target.closest('a[href]');
        if (!link || link.target === '_blank' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const target = new URL(link.href, location.href);
        if (!NAV_PAGES.has(target.pathname.split('/').pop()) || target.origin !== location.origin) return;
        event.preventDefault();
        navigate(target.href, true).catch(() => { location.href = target.href; });
    });

    window.addEventListener('popstate', function () { navigate(location.href, false).catch(() => {}); });

    function init() { addStyles(); createPlayer(); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
})();
