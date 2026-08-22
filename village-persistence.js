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

        card.innerHTML = `
            <h3>Launch Experience</h3>
            <p><strong>The Audacity of You + a complimentary private 30-minute Still Becoming Welcome Session.</strong></p>
            <p>Purchase <em>The Audacity of You</em> through Amazon Kindle.</p>
            <p><strong>To claim your complimentary session:</strong></p>
            <p>1. Save your Amazon purchase confirmation.<br>
            2. Send a screenshot of the purchase confirmation showing <em>The Audacity of You</em>, the purchase date, and the Amazon order number.<br>
            3. Email the screenshot to The Still Becoming Village Circle.<br>
            4. Once your purchase is verified, you'll receive instructions to schedule your complimentary 30-minute Welcome Session.</p>
            <p style="font-size:14px;color:#78908f;">Please hide any payment information or other sensitive information that isn't needed to verify your purchase.</p>
        `;

        const emailButton = document.createElement('a');
        emailButton.className = 'payment-button';
        emailButton.href = 'mailto:thestillbecomingvillagecircle@gmail.com?subject=The%20Audacity%20of%20You%20-%20Welcome%20Session%20Claim&body=Hello%20The%20Still%20Becoming%20Village%20Circle%2C%0A%0AI%27d%20like%20to%20claim%20my%20complimentary%20Still%20Becoming%20Welcome%20Session.%0A%0AName%3A%20%0AAmazon%20Order%20Number%3A%20%0APurchase%20Date%3A%20%0A%0AI%27ve%20attached%20my%20Amazon%20purchase%20confirmation.%0A%0AThank%20you!';
        emailButton.textContent = '📧 Send My Purchase Confirmation';
        card.appendChild(emailButton);
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
