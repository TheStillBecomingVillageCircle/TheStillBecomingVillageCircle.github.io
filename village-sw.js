const CACHE = "still-becoming-village-v6";
const APP_SHELL = [
  "/village-app.html",
  "/",
  "/index.html",
  "/village-app.webmanifest",
  "/village-icon.svg",
  "/village-music.js",
  "/village-polish.js",
  "/site-fixes.js",
  "/rich-nav.js",
  "/assets/B307A382-B6FC-4D8D-81C5-3047BDE8F4E3.png"
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

async function upgradeHtml(response) {
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/html")) return response;
  const html = await response.text();
  const scripts = `<script src="/rich-nav.js?v=20260828-4" defer></script>`;
  const upgraded = html.replace(/<\/body>/i, `${scripts}</body>`);
  return new Response(upgraded, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
}

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then(async response => {
        const upgraded = await upgradeHtml(response.clone());
        const copy = upgraded.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, copy));
        return upgraded;
      })
      .catch(() => caches.match(event.request).then(cached => cached || caches.match("/index.html")))
  );
});
