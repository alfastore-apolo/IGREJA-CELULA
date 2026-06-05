const CACHE_NAME = 'celula-app-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Instala e faz cache dos arquivos principais
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Remove caches antigos ao ativar nova versão
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) { return key !== CACHE_NAME; })
            .map(function(key) { return caches.delete(key); })
      );
    })
  );
  self.clients.claim();
});

// Network first, fallback para cache (Firebase em tempo real sempre atualizado)
self.addEventListener('fetch', function(e) {
  // Ignora requisições do Firebase (sempre online)
  if (e.request.url.includes('firebaseio.com') ||
      e.request.url.includes('googleapis.com') ||
      e.request.url.includes('gstatic.com')) {
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then(function(response) {
        // Atualiza o cache com a versão mais recente
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(e.request, clone);
        });
        return response;
      })
      .catch(function() {
        // Offline: serve do cache
        return caches.match(e.request).then(function(cached) {
          return cached || caches.match('/index.html');
        });
      })
  );
});
