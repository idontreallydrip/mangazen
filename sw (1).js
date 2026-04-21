const CACHE = 'mangazen-v2';
const STATIC = ['/mangazen/', '/mangazen/index.html', '/mangazen/manifest.json'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC).catch(() => {})));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
});

self.addEventListener('fetch', e => {
  // Never intercept API or image calls — let them go straight to network
  const url = e.request.url;
  if (url.includes('mangadex.org') || url.includes('uploads.mangadex.org')) return;
  
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('/mangazen/index.html')))
  );
});
