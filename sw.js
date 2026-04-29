/* CNR Ñuble PWA — Service Worker
   Version: 202604292221
   Network-first for HTML, cache-first for static assets.
*/
const CACHE = 'cnr-202604292221';
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

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  const isHTML = u.pathname.endsWith('.html') || u.pathname === '/' || u.pathname.endsWith('/');
  if (isHTML) {
    // Always fetch fresh HTML from network
    e.respondWith(
      fetch(e.request, {cache: 'no-store'})
        .then(r => { caches.open(CACHE).then(c => c.put(e.request, r.clone())); return r; })
        .catch(() => caches.match(e.request))
    );
  } else {
    e.respondWith(
      caches.match(e.request)
        .then(r => r || fetch(e.request)
          .then(nr => { caches.open(CACHE).then(c => c.put(e.request, nr.clone())); return nr; }))
    );
  }
});

self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});
