/* The Still Becoming Village Circle — shared page enhancements */
(function () {
    'use strict';

    if (window.__TSBVC_MUSIC_BOOTSTRAP__) return;
    window.__TSBVC_MUSIC_BOOTSTRAP__ = true;

    function normalizeVillageNavigation() {
        const navList = document.querySelector('nav ul');
        if (!navList) return;

        const links = Array.from(navList.querySelectorAll('a'));
        let seenWebspace = false;
        let seenSupport = false;

        links.forEach(link => {
            const text = (link.textContent || '').trim();
            const href = link.getAttribute('href') || '';
            const item = link.closest('li');

            if (/^(Webspace|Website Design)$/i.test(text) || /web-design\.html(?:$|#)/i.test(href)) {
                if (seenWebspace) {
                    if (item) item.remove();
                    return;
                }
                seenWebspace = true;
                link.href = 'web-design.html';
                link.textContent = 'Webspace';
                link.setAttribute('aria-label', 'Webspace for Intentional Becoming');
                return;
            }

            // Support is the single visitor-facing contact destination.
            // Remove redundant Connect and Contact navigation items.
            if (/^(Connect|Contact)$/i.test(text)) {
                if (item) item.remove();
                return;
            }

            if (/^Support$/i.test(text) || /contact\.html(?:$|#)/i.test(href)) {
                if (seenSupport) {
                    if (item) item.remove();
                    return;
                }
                seenSupport = true;
                link.href = 'contact.html';
                link.textContent = 'Support';
                link.setAttribute('aria-label', 'Contact The Still Becoming Village Circle for support');
            }
        });

        if (!seenWebspace) {
            const item = document.createElement('li');
            const link = document.createElement('a');
            link.href = 'web-design.html';
            link.textContent = 'Webspace';
            link.setAttribute('aria-label', 'Webspace for Intentional Becoming');
            item.appendChild(link);

            const experienceLink = Array.from(navList.querySelectorAll('a')).find(a => /Experiences/i.test(a.textContent));
            if (experienceLink && experienceLink.parentElement) {
                experienceLink.parentElement.insertAdjacentElement('afterend', item);
            } else {
                navList.appendChild(item);
            }
        }

        if (!seenSupport) {
            const item = document.createElement('li');
            const link = document.createElement('a');
            link.href = 'contact.html';
            link.textContent = 'Support';
            link.setAttribute('aria-label', 'Contact The Still Becoming Village Circle for support');
            item.appendChild(link);
            navList.appendChild(item);
        }
    }

    window.TSBVCNormalizeNavigation = normalizeVillageNavigation;

    function watchNavigationChanges() {
        if (window.__TSBVC_NAV_WATCHER__) return;
        window.__TSBVC_NAV_WATCHER__ = true;
        const observer = new MutationObserver(() => normalizeVillageNavigation());
        observer.observe(document.body, { childList: true, subtree: true });
    }

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

    function addLaunchExperienceVerification() {
        if (!/coaching\.html$/.test(location.pathname)) return;
        const cards = document.querySelectorAll('.price-card');
        const card = cards[1];
        if (!card || card.dataset.launchExperienceUpdated === 'true') return;
        card.dataset.launchExperienceUpdated = 'true';
        const oldEmailButton = card.querySelector('.launch-email');
        if (oldEmailButton) oldEmailButton.remove();
        const catalystParagraph = Array.from(card.querySelectorAll('p')).find(p => /Catalyze My Embrace of Becoming/i.test(p.textContent));
        if (catalystParagraph) {
            const bubble = document.createElement('a');
            bubble.className = 'catalyze-bubble';
            bubble.href = 'mailto:thestillbecomingvillagecircle@gmail.com?subject=The%20Audacity%20of%20You%20-%20Welcome%20Session%20Verification&body=Hello%20The%20Still%20Becoming%20Village%20Circle%2C%0A%0AI%20purchased%20The%20Audacity%20of%20You%20through%20Amazon%20Kindle.%20I%20have%20attached%20my%20Amazon%20purchase%20confirmation%20for%20verification.%0A%0AThank%20you!';
            bubble.textContent = '🌱 Catalyze My Embrace of Becoming';
            bubble.setAttribute('aria-label', 'Catalyze my embrace of becoming and email my Amazon purchase confirmation');
            bubble.style.display = 'flex';
            bubble.style.alignItems = 'center';
            bubble.style.justifyContent = 'center';
            bubble.style.maxWidth = '340px';
            bubble.style.minHeight = '88px';
            bubble.style.margin = '18px auto 6px';
            bubble.style.padding = '18px 28px';
            bubble.style.textAlign = 'center';
            bubble.style.borderRadius = '50%';
            bubble.style.background = 'radial-gradient(circle at 30% 25%,rgba(255,255,255,.96),rgba(210,251,246,.76) 55%,rgba(170,239,232,.28))';
            bubble.style.border = '2px solid rgba(255,255,255,.92)';
            bubble.style.boxShadow = 'inset 8px 8px 18px rgba(255,255,255,.82), inset -8px -8px 18px rgba(78,190,194,.08), 0 14px 30px rgba(40,120,120,.10)';
            bubble.style.backdropFilter = 'blur(5px)';
            bubble.style.webkitBackdropFilter = 'blur(5px)';
            bubble.style.color = '#285f61';
            bubble.style.fontSize = '18px';
            bubble.style.fontWeight = '700';
            bubble.style.lineHeight = '1.35';
            bubble.style.textDecoration = 'none';
            bubble.style.transition = 'transform .25s ease, box-shadow .25s ease';
            bubble.addEventListener('mouseenter', () => { bubble.style.transform = 'translateY(-3px)'; });
            bubble.addEventListener('mouseleave', () => { bubble.style.transform = 'translateY(0)'; });
            catalystParagraph.replaceWith(bubble);
        }
    }

    function addHomeCoachingCTA() {
        const isHome = location.pathname === '/' || /index\.html$/.test(location.pathname);
        if (!isHome) return;
        const hero = document.querySelector('.hero');
        if (!hero || hero.querySelector('.home-coaching-cta')) return;
        const description = hero.querySelector('.description');
        const existingButton = hero.querySelector('.welcome-button');
        if (!description) return;
        const cta = document.createElement('a');
        cta.className = 'home-coaching-cta';
        cta.href = 'https://calendly.com/thestillbecomingvillagecircle/30min';
        cta.target = '_blank';
        cta.rel = 'noopener noreferrer';
        cta.setAttribute('aria-label', 'Schedule a 30-minute coaching session with The Still Becoming Village Circle');
        cta.innerHTML = '<span>🌱 Enter Your Becoming</span><small>Schedule a 30-minute coaching session</small>';
        Object.assign(cta.style, { display:'inline-flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'2px', minWidth:'min(360px, 88vw)', margin:'6px auto 16px', padding:'16px 28px', borderRadius:'38px', background:'#16aaa9', color:'#ffffff', textDecoration:'none', fontSize:'18px', fontWeight:'700', lineHeight:'1.25', border:'2px solid rgba(255,255,255,.82)', boxShadow:'0 14px 32px rgba(22,170,169,.24)', transition:'transform .25s ease, box-shadow .25s ease' });
        const subtext = cta.querySelector('small');
        Object.assign(subtext.style, { fontSize:'13px', fontWeight:'600', opacity:'0.92' });
        cta.addEventListener('mouseenter', () => { cta.style.transform='translateY(-3px)'; cta.style.boxShadow='0 18px 38px rgba(22,170,169,.30)'; });
        cta.addEventListener('mouseleave', () => { cta.style.transform='translateY(0)'; cta.style.boxShadow='0 14px 32px rgba(22,170,169,.24)'; });
        description.insertAdjacentElement('afterend', cta);
        if (existingButton) existingButton.style.marginTop = '4px';
    }

    function init() {
        normalizeVillageNavigation();
        watchNavigationChanges();
        if (!document.getElementById('villageSoundtrack') && !document.querySelector('script[src*="village-music.js"]')) {
            const script = document.createElement('script');
            script.src = 'village-music.js';
            script.async = false;
            document.body.appendChild(script);
        }
        addMetanoiaBookResource();
        addLaunchExperienceVerification();
        addHomeCoachingCTA();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
