/* The Still Becoming Village Circle — persistent soundtrack + shared navigation */
(function () {
  'use strict';
  if (window.__TSBVC_MUSIC__) return;
  window.__TSBVC_MUSIC__ = true;
  const PLAYER_ID='villageSoundtrack';
  const NAV_PAGES=new Set(['index.html','about.html','LearningtheUnknown.html','experiences.html','events.html','contact.html','coaching.html','kitta.html']);
  const CANONICAL_PAGES={'events.html':'experiences.html'};
  const BOOKING_URL='https://calendly.com/thestillbecomingvillagecircle/30min';
  const COVER='data:image/jpeg;base64,/9j/4AAQSkZJRgABA