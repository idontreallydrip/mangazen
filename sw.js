const CACHE = 'mangazen-v1';
const STATIC = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC)));
});

self.addEventListener('fetch', e => {
  if (e.request.url.includes('mangadex.org') || e.request.url.includes('uploads.mangadex.org')) return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
