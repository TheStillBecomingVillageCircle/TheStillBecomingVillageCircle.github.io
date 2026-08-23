/* =========================================================
   THE STILL BECOMING VILLAGE CIRCLE
   Shared Site Script
========================================================= */

/* =========================================================
   FIRST-LOAD LAYOUT STABILIZATION
========================================================= */
function stabilizePageLayout() {
    void document.documentElement.offsetHeight;
    void document.body.offsetHeight;
    window.dispatchEvent(new Event("resize"));
    requestAnimationFrame(function () {
        void document.documentElement.offsetHeight;
        void document.body.offsetHeight;
    });
}

window.addEventListener("load", function () {
    stabilizePageLayout();
    setTimeout(stabilizePageLayout, 150);
});

/* =========================================================
   FLOATING BECOMING MESSAGES

   This initializer is deliberately reusable because the Village
   navigation swaps page content without a full browser reload.
========================================================= */
(function () {
    'use strict';

    const messages = [
        "🫧 You belong before you bloom.",
        "🫧 Healing isn't linear.",
        "🫧 Rest is productive.",
        "🫧 Curiosity creates connection.",
        "🫧 Becoming takes courage.",
        "🫧 It's okay to begin again.",
        "🫧 You are allowed to change.",
        "🫧 You don't have to rush becoming.",
        "🫧 Your next step is enough.",
        "🫧 Curiosity can lead somewhere beautiful.",
        "🫧 You are allowed to learn yourself again.",
        "🫧 There is room for who you're becoming."
    ];

    function initFloatingMessageBubble() {
        const bubble = document.getElementById("floatingMessageBubble");
        const messageText = document.getElementById("floatingMessageText");

        if (!bubble || !messageText) return;
        if (bubble.dataset.floatingInitialized === "true") return;

        bubble.dataset.floatingInitialized = "true";

        let messageIndex = 0;
        let x = 12;
        let y = 62;
        let targetX = 12;
        let targetY = 62;
        let nextMoveTime = Date.now() + 3500;

        function chooseNewPosition() {
            const bubbleWidth = bubble.offsetWidth || 180;
            const bubbleHeight = bubble.offsetHeight || 55;
            const widthPercent = (bubbleWidth / window.innerWidth) * 100;
            const heightPercent = (bubbleHeight / window.innerHeight) * 100;
            const maxX = Math.max(20, 92 - widthPercent);
            const maxY = Math.max(25, 88 - heightPercent);

            targetX = 8 + Math.random() * (maxX - 8);
            targetY = 18 + Math.random() * (maxY - 18);
        }

        setTimeout(function () {
            bubble.classList.add("visible");
        }, 1200);

        setInterval(function () {
            if (!document.body.contains(bubble)) return;

            bubble.classList.remove("visible");

            setTimeout(function () {
                if (!document.body.contains(bubble)) return;
                messageIndex = (messageIndex + 1) % messages.length;
                messageText.textContent = messages[messageIndex];
                bubble.classList.add("visible");
            }, 1800);
        }, 9000);

        function animate() {
            if (!document.body.contains(bubble)) return;

            const ease = 0.0045;
            x += (targetX - x) * ease;
            y += (targetY - y) * ease;

            bubble.style.left = x + "%";
            bubble.style.top = y + "%";

            if (Date.now() > nextMoveTime) {
                chooseNewPosition();
                nextMoveTime = Date.now() + 9000 + Math.random() * 5000;
            }

            requestAnimationFrame(animate);
        }

        chooseNewPosition();
        animate();
    }

    window.TSBVCInitFloatingMessageBubble = initFloatingMessageBubble;

    function initialize() {
        initFloatingMessageBubble();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize, { once: true });
    } else {
        initialize();
    }

    window.addEventListener("village:pagechange", initialize);
})();

/* =========================================================
   GENERAL MUSIC BUBBLE SUPPORT
========================================================= */
function openMusic() {
    const bubble = document.getElementById("musicBubble");
    if (!bubble) return;
    bubble.classList.add("music-open");
}

function closeMusic() {
    const bubble = document.getElementById("musicBubble");
    if (!bubble) return;
    bubble.classList.remove("music-open");
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMusic();
});

document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("page-ready");
});

/* =========================================================
   VILLAGE SOUNDTRACK — SCROLL-TO-START

   Start the existing page audio after the visitor begins
   scrolling. Browsers may block audible autoplay; that is
   handled quietly so the site never throws an error.

   The soundtrack bubble itself remains the manual fallback:
   a visitor can tap/click the music control to start playback.
========================================================= */
(function () {
    'use strict';

    let soundtrackStarted = false;
    let soundtrackInitialized = false;

    function getSoundtrackAudio() {
        const selectors = [
            '#villageSoundtrack',
            '#soundtrackAudio',
            '#backgroundMusic',
            '.soundtrack audio',
            'audio[data-village-soundtrack]'
        ];

        for (const selector of selectors) {
            const audio = document.querySelector(selector);
            if (audio && typeof audio.play === 'function') {
                return audio;
            }
        }

        return null;
    }

    function tryStartSoundtrack() {
        if (soundtrackStarted) return true;

        const audio = getSoundtrackAudio();
        if (!audio) return false;

        audio.volume = Number.isFinite(audio.volume) ? audio.volume : 0.35;

        const playPromise = audio.play();

        if (playPromise && typeof playPromise.then === 'function') {
            playPromise.then(function () {
                soundtrackStarted = true;
            }).catch(function () {
                // Safari/iOS and other browsers may require a direct tap.
                // The manual soundtrack control remains available.
            });
        } else {
            soundtrackStarted = true;
        }

        return true;
    }

    function initializeSoundtrack() {
        if (soundtrackInitialized) return;
        soundtrackInitialized = true;

        const startOnScroll = function () {
            if (window.scrollY <= 0) return;
            tryStartSoundtrack();

            if (soundtrackStarted) {
                window.removeEventListener('scroll', startOnScroll);
                window.removeEventListener('wheel', startOnScroll);
                window.removeEventListener('touchmove', startOnScroll);
            }
        };

        window.addEventListener('scroll', startOnScroll, { passive: true });
        window.addEventListener('wheel', startOnScroll, { passive: true });
        window.addEventListener('touchmove', startOnScroll, { passive: true });

        // If the visitor has already scrolled when a page is swapped in,
        // give the soundtrack one immediate chance to begin.
        if (window.scrollY > 0) {
            tryStartSoundtrack();
        }
    }

    function initialize() {
        initializeSoundtrack();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize, { once: true });
    } else {
        initialize();
    }

    window.addEventListener('village:pagechange', function () {
        // A page swap can replace the audio element, so allow the
        // initializer to look for the new element once more.
        soundtrackInitialized = false;
        soundtrackStarted = false;
        initializeSoundtrack();
    });
})();

/* =========================================================
   HOME BOOKING LINK

   The home page's "Find Your Moment" button should always
   lead directly to the Village Calendly booking page.
   This intentionally changes only that booking destination.
========================================================= */
(function () {
    'use strict';

    const calendlyUrl = "https://calendly.com/thestillbecomingvillagecircle/new-meeting";

    function restoreHomeCalendlyLink() {
        const links = document.querySelectorAll("a, button");

        links.forEach(function (element) {
            const text = (element.textContent || "").trim();

            if (text.includes("Find Your Moment")) {
                if (element.tagName.toLowerCase() === "a") {
                    element.href = calendlyUrl;
                    element.target = "_blank";
                    element.rel = "noopener";
                } else {
                    element.addEventListener("click", function () {
                        window.location.href = calendlyUrl;
                    }, { once: true });
                }
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", restoreHomeCalendlyLink, { once: true });
    } else {
        restoreHomeCalendlyLink();
    }

    window.addEventListener("village:pagechange", restoreHomeCalendlyLink);
})();

/* =========================================================
   HOME DISCOVERY CARD LINKS

   Keep the existing card design and wording intact.
   Only make the discovery cards clickable destinations.
========================================================= */
(function () {
    'use strict';

    const destinations = {
        "Learning the Unknown": "LearningtheUnknown.html",
        "Real Conversations": "coaching.html",
        "Real Exploration": "coaching.html",
        "Growing Together": "experiences.html"
    };

    function linkDiscoveryCards() {
        document.querySelectorAll(".cards .card").forEach(function (card) {
            if (card.dataset.discoveryLinked === "true") return;

            const heading = card.querySelector("h3");
            if (!heading) return;

            const title = (heading.textContent || "")
                .replace(/^[^A-Za-z]+/, "")
                .trim();

            const destination = destinations[title];
            if (!destination) return;

            card.dataset.discoveryLinked = "true";
            card.setAttribute("role", "link");
            card.setAttribute("tabindex", "0");
            card.style.cursor = "pointer";

            function goToDestination() {
                window.location.href = destination;
            }

            card.addEventListener("click", goToDestination);
            card.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    goToDestination();
                }
            });
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", linkDiscoveryCards, { once: true });
    } else {
        linkDiscoveryCards();
    }

    window.addEventListener("village:pagechange", linkDiscoveryCards);
})();
