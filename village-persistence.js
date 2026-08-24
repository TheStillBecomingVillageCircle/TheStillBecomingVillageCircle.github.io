/* The Still Becoming Village Circle — shared page enhancements */
(function () {
    'use strict';

    function addWebspaceNavigation() {
        const navList = document.querySelector('nav ul');
        if (!navList || navList.querySelector('a[href="web-design.html"]')) return;

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

    function addMobileVillageNavigation() {
        const nav = document.querySelector('nav');
        const navList = nav ? nav.querySelector('ul') : null;
        if (!nav || !navList || nav.querySelector('.village-mobile-menu-button')) return;

        const style = document.createElement('style');
        style.id = 'village-responsive-navigation';
        style.textContent = `
            .village-mobile-menu-button { display: none !important; }
            @media (max-width: 768px) {
                header { position: sticky !important; top: 0 !important; z-index: 10000 !important; }
                nav { position: relative !important; width: 100% !important; max-width: none !important; margin: 0 !important; padding: 12px 16px !important; display: flex !important; flex-direction: row !important; align-items: center !important; justify-content: space-between !important; gap: 10px !important; }
                nav .logo { flex: 1 1 auto !important; min-width: 0 !important; max-width: calc(100% - 62px) !important; font-size: 17px !important; line-height: 1.25 !important; white-space: normal !important; }
                nav .logo a { white-space: normal !important; font-size: 17px !important; line-height: 1.25 !important; }
                .village-mobile-menu-button { display: inline-flex !important; flex: 0 0 46px !important; width: 46px !important; height: 46px !important; align-items: center !important; justify-content: center !important; border: 1px solid rgba(22,170,169,.18) !important; border-radius: 50% !important; background: rgba(255,255,255,.88) !important; color: #16aaa9 !important; box-shadow: 0 6px 18px rgba(40,120,120,.12) !important; font-size: 23px !important; line-height: 1 !important; cursor: pointer !important; padding: 0 !important; -webkit-tap-highlight-color: transparent !important; }
                nav ul, nav ul.village-mobile-menu { display: none !important; position: absolute !important; left: 12px !important; right: 12px !important; top: calc(100% + 8px) !important; margin: 0 !important; padding: 14px !important; flex-direction: column !important; align-items: stretch !important; justify-content: flex-start !important; gap: 2px !important; list-style: none !important; background: rgba(255,255,255,.97) !important; border: 1px solid rgba(22,170,169,.12) !important; border-radius: 24px !important; box-shadow: 0 18px 45px rgba(40,120,120,.16) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; z-index: 10001 !important; }
                nav.village-menu-open ul, nav.village-menu-open ul.village-mobile-menu { display: flex !important; }
                nav ul li { width: 100% !important; margin: 0 !important; text-align: left !important; }
                nav ul li a { display: block !important; width: 100% !important; padding: 12px 14px !important; border-radius: 14px !important; font-size: 16px !important; line-height: 1.3 !important; }
                nav ul li a:hover, nav ul li a:focus { background: rgba(22,170,169,.08) !important; }
            }
        `;
        document.head.appendChild(style);

        navList.classList.add('village-mobile-menu');
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'village-mobile-menu-button';
        button.setAttribute('aria-label', 'Open Village navigation');
        button.setAttribute('aria-expanded', 'false');
        button.textContent = '☰';

        button.addEventListener('click', () => {
            const open = nav.classList.toggle('village-menu-open');
            button.textContent = open ? '×' : '☰';
            button.setAttribute('aria-expanded', String(open));
            button.setAttribute('aria-label', open ? 'Close Village navigation' : 'Open Village navigation');
        });
        nav.appendChild(button);
        navList.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
            nav.classList.remove('village-menu-open');
            button.textContent = '☰';
            button.setAttribute('aria-expanded', 'false');
            button.setAttribute('aria-label', 'Open Village navigation');
        }));
    }

    function loadScriptOnce(src, id) {
        if (document.getElementById(id) || document.querySelector(`script[src*="${src}"]`)) return;
        const script = document.createElement('script');
        script.id = id;
        script.src = src;
        script.async = false;
        document.body.appendChild(script);
    }

    function replaceHomeDestinationIllustration() {
        const isHome = location.pathname === '/' || /index\.html$/.test(location.pathname);
        if (!isHome) return;
        const scene = document.querySelector('.home-scene');
        if (!scene || scene.dataset.homeIllustrationUpdated === 'true') return;
        scene.dataset.homeIllustrationUpdated = 'true';

        scene.innerHTML = `
            <svg viewBox="0 0 240 200" role="img" aria-label="An elegant little house floating gently above a cloud">
                <defs>
                    <linearGradient id="newHomeCloud" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stop-color="#ffffff"/>
                        <stop offset="1" stop-color="#dff5f0"/>
                    </linearGradient>
                    <linearGradient id="newHomeWall" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stop-color="#fffaf0"/>
                        <stop offset="1" stop-color="#ead9c3"/>
                    </linearGradient>
                    <linearGradient id="newHomeRoof" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stop-color="#88a9a0"/>
                        <stop offset="1" stop-color="#5f817a"/>
                    </linearGradient>
                    <filter id="newHomeShadow" x="-30%" y="-30%" width="160%" height="170%">
                        <feDropShadow dx="0" dy="9" stdDeviation="8" flood-color="#4f8d87" flood-opacity=".13"/>
                    </filter>
                </defs>
                <g class="new-home-float" filter="url(#newHomeShadow)">
                    <path d="M37 151c0-14 12-25 28-25 3-19 22-31 40-25 10-17 34-22 49-9 8-7 20-10 31-5 12 5 19 15 19 27 13 1 23 9 23 21 0 14-13 25-30 25H66c-17 0-29-4-29-9Z" fill="url(#newHomeCloud)" stroke="#ffffff" stroke-width="2.5"/>
                    <path d="M76 91 119 51l44 40v52H76Z" fill="url(#newHomeWall)" stroke="#cdbda8" stroke-width="1.3"/>
                    <path d="M65 92 119 42l55 50-10 7-45-41-45 41Z" fill="url(#newHomeRoof)"/>
                    <path d="M142 58h10v25h-10z" fill="#b89a7e"/>
                    <path d="M111 143v-28c0-8 6-14 14-14s14 6 14 14v28Z" fill="#6f8780"/>
                    <path d="M87 101h20v21H87zM144 101h20v21h-20z" fill="#d9f6f1" stroke="#ffffff" stroke-width="4"/>
                    <path d="M92 106h10v11H92zM149 106h10v11h-10z" fill="#bde8e0" opacity=".7"/>
                    <path d="M118 51 127 43l9 8" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity=".72"/>
                </g>
                <path d="M57 171c35-8 89-8 127 0" fill="none" stroke="#6fa9a0" stroke-opacity=".16" stroke-width="5" stroke-linecap="round"/>
            </svg>
        `;

        if (!document.getElementById('new-home-destination-style')) {
            const style = document.createElement('style');
            style.id = 'new-home-destination-style';
            style.textContent = `
                .home-scene .new-home-float { transform-origin: 50% 72%; animation: newHomeFloat 6.5s ease-in-out infinite; }
                @keyframes newHomeFloat {
                    0%,100% { transform: translateY(2px); }
                    50% { transform: translateY(-7px); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .home-scene .new-home-float { animation: none; }
                }
            `;
            document.head.appendChild(style);
        }
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
        button.textContent = 'Explore The Audacity of You';
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
            bubble.textContent = 'Catalyze My Embrace of Becoming';
            bubble.setAttribute('aria-label', 'Catalyze my embrace of becoming and email my Amazon purchase confirmation');
            Object.assign(bubble.style, {display:'flex',alignItems:'center',justifyContent:'center',maxWidth:'340px',minHeight:'88px',margin:'18px auto 6px',padding:'18px 28px',textAlign:'center',borderRadius:'50%',background:'radial-gradient(circle at 30% 25%,rgba(255,255,255,.96),rgba(210,251,246,.76) 55%,rgba(170,239,232,.28))',border:'2px solid rgba(255,255,255,.92)',boxShadow:'inset 8px 8px 18px rgba(255,255,255,.82), inset -8px -8px 18px rgba(78,190,194,.08), 0 14px 30px rgba(40,120,120,.10)',backdropFilter:'blur(5px)',webkitBackdropFilter:'blur(5px)',color:'#285f61',fontSize:'18px',fontWeight:'700',lineHeight:'1.35',textDecoration:'none',transition:'transform .25s ease, box-shadow .25s ease'});
            bubble.addEventListener('mouseenter', () => bubble.style.transform = 'translateY(-3px)');
            bubble.addEventListener('mouseleave', () => bubble.style.transform = 'translateY(0)');
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
        cta.innerHTML = '<span>Enter Your Becoming</span><small>Schedule a 30-minute coaching session</small>';
        Object.assign(cta.style,{display:'inline-flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'2px',minWidth:'min(360px,88vw)',margin:'6px auto 16px',padding:'16px 28px',borderRadius:'38px',background:'#16aaa9',color:'#fff',textDecoration:'none',fontSize:'18px',fontWeight:'700',lineHeight:'1.25',border:'2px solid rgba(255,255,255,.82)',boxShadow:'0 14px 32px rgba(22,170,169,.24)',transition:'transform .25s ease, box-shadow .25s ease'});
        const subtext=cta.querySelector('small');
        Object.assign(subtext.style,{fontSize:'13px',fontWeight:'600',opacity:'.92'});
        cta.addEventListener('mouseenter',()=>{cta.style.transform='translateY(-3px)';cta.style.boxShadow='0 18px 38px rgba(22,170,169,.30)'});
        cta.addEventListener('mouseleave',()=>{cta.style.transform='translateY(0)';cta.style.boxShadow='0 14px 32px rgba(22,170,169,.24)'});
        description.insertAdjacentElement('afterend',cta);
        if(existingButton) existingButton.style.marginTop='4px';
    }

    function init() {
        addWebspaceNavigation();
        addMobileVillageNavigation();
        loadScriptOnce('village-music.js','village-music-loader');
        loadScriptOnce('village-polish.js','village-polish-loader');
        replaceHomeDestinationIllustration();
        addMetanoiaBookResource();
        addLaunchExperienceVerification();
        addHomeCoachingCTA();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
    else init();
})();