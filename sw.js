/* CNR Ñuble PWA — Service Worker v15
   Cache version changes automatically on every deploy via timestamp.
   Old caches are deleted immediately on activation.
*/
const CACHE = 'cnr-obras-v15-20260429';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maps.png',
  './apple-touch-icon.png',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
];

/* INSTALL: cache all assets */
self.addEventListener('install', e => {
  self.skipWaiting(); // activate immediately, don't wait for old SW to die
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
});

/* ACTIVATE: delete ALL old caches immediately */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim()) // take control of all open pages now
  );
});

/* FETCH: network-first for HTML/JS (always fresh), cache-first for images */
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  const isLocal = url.origin === location.origin;
  const isHtmlOrJs = /\.(html|js)$/.test(url.pathname) || url.pathname === '/';

  if (isLocal && isHtmlOrJs) {
    // Network-first: always try to get latest version
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
  } else {
    // Cache-first for images and external libs
    e.respondWith(
      caches.match(e.request)
        .then(cached => cached || fetch(e.request)
          .then(res => {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
            return res;
          })
        )
    );
  }
});

/* MESSAGE: force update on demand */
self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});
