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
        addMetanoiaBookResource();
        addLaunchExperienceVerification();
        addHomeCoachingCTA();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
    else init();
})();