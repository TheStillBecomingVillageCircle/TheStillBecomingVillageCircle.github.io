const CACHE = "still-becoming-village-v3";
const APP_SHELL = ["/village-app.html", "/", "/index.html", "/village-app.webmanifest", "/village-icon.svg", "/village-music.js", "/village-polish.js"];
const GRACE = "/still-becoming-app/grace-village.svg";

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
  const graceImg = `<img src="${GRACE}" alt="Grace" class="grace-art" />`;
  const style = `<style>.grace-icon{overflow:hidden!important;padding:0!important}.grace-art{display:block;width:100%;height:100%;object-fit:contain}.bubble-icon.grace-icon{background:radial-gradient(circle at 50% 35%,#fff,#dff9f3 60%,#bdeee5);}.bubble.grace-icon{display:flex;align-items:center;justify-content:center;}</style>`;
  const scripts = `<script src="/village-music.js" defer></script><script src="/village-polish.js" defer></script>`;

  const upgraded = html
    .replace(/<div class="bubble-icon">🫧<\/div>/g, `<div class="bubble-icon grace-icon">${graceImg}</div>`)
    .replace(/<div class="bubble">🌱<\/div>/g, `<div class="bubble grace-icon">${graceImg}</div>`)
    .replace(/<div class="bubble">🫧<\/div>/g, `<div class="bubble grace-icon">${graceImg}</div>`)
    .replace(/<head>/i, `<head>${style}`)
    .replace(/<\/body>/i, `${scripts}</body>`);

  return new Response(upgraded, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
}

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request).then(async response => {
      const upgraded = await upgradeHtml(response.clone());
      const copy = upgraded.clone();
      caches.open(CACHE).then(cache => cache.put(event.request, copy));
      return upgraded;
    }).catch(() => caches.match(event.request).then(cached => cached || caches.match("/index.html")))
  );
});
