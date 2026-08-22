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

    function addLaunchExperienceVerification() {
        if (!/coaching\.html$/.test(location.pathname)) return;

        const cards = document.querySelectorAll('.price-card');
        const card = cards[1];
        if (!card || card.dataset.launchExperienceUpdated === 'true') return;

        card.dataset.launchExperienceUpdated = 'true';

        const emailButton = document.createElement('a');
        emailButton.className = 'payment-button';
        emailButton.href = 'mailto:thestillbecomingvillagecircle@gmail.com?subject=The%20Audacity%20of%20You%20-%20Welcome%20Session%20Verification&body=Hello%20The%20Still%20Becoming%20Village%20Circle%2C%0A%0AI%27d%20like%20to%20verify%20my%20purchase%20of%20The%20Audacity%20of%20You%20and%20begin%20the%20process%20of%20accessing%20my%20complimentary%20Still%20Becoming%20Welcome%20Session.%0A%0AName%3A%20%0AAmazon%20Order%20Number%3A%20%0APurchase%20Date%3A%20%0A%0AI%27ve%20attached%20my%20Amazon%20purchase%20confirmation.%0A%0AThank%20you!';
        emailButton.textContent = '📧 Email My Purchase Confirmation';
        emailButton.setAttribute('aria-label', 'Email my Amazon purchase confirmation to begin the process of accessing the complimentary Welcome Session');

        const instruction = document.createElement('p');
        instruction.textContent = 'After you purchase, tap the button below, attach your Amazon purchase confirmation, and send it. That’s it. 🫶🏾';
        instruction.style.fontSize = '15px';
        instruction.style.color = '#5d565f';
        instruction.style.marginTop = '18px';

        const catalystHeading = document.createElement('h3');
        catalystHeading.textContent = '🌱 Ready to Catalyze Your Embrace of Becoming?';
        catalystHeading.style.color = '#16aaa9';
        catalystHeading.style.fontSize = '24px';
        catalystHeading.style.marginTop = '28px';
        catalystHeading.style.marginBottom = '10px';

        const catalystText = document.createElement('p');
        catalystText.textContent = 'Once your purchase has been verified, you’ll receive instructions to begin your complimentary Still Becoming Welcome Session.';
        catalystText.style.fontSize = '16px';
        catalystText.style.color = '#5d565f';
        catalystText.style.marginBottom = '12px';

        const purchaseLink = card.querySelector('a[href*="a.co"]');
        if (purchaseLink) {
            purchaseLink.insertAdjacentElement('afterend', instruction);
            instruction.insertAdjacentElement('afterend', emailButton);
            emailButton.insertAdjacentElement('afterend', catalystHeading);
            catalystHeading.insertAdjacentElement('afterend', catalystText);
        } else {
            card.appendChild(instruction);
            card.appendChild(emailButton);
            card.appendChild(catalystHeading);
            card.appendChild(catalystText);
        }
    }

    function init() {
        if (!document.getElementById('villageSoundtrack') && !document.querySelector('script[src*="village-music.js"]')) {
            const script = document.createElement('script');
            script.src = 'village-music.js';
            script.async = false;
            document.body.appendChild(script);
        }
        addMetanoiaBookResource();
        addLaunchExperienceVerification();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
