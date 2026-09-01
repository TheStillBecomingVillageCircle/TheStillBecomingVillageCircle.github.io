const CACHE = "still-becoming-village-v9";
const APP_SHELL = [
  "/village-app.html",
  "/",
  "/index.html",
  "/village-app.webmanifest",
  "/village-icon.svg",
  "/village-music.js",
  "/village-polish.js",
  "/village-persistence.js",
  "/nav-stable.js?v=stable-2"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  const isNavigation = event.request.mode === "navigate" ||
    event.request.destination === "document";

  if (isNavigation) {
    event.respondWith(
      fetch(new Request(event.request, { cache: "no-store" }))
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request).then(cached => cached || caches.match("/index.html")))
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
