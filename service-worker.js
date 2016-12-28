var dataCacheName = 'motree-v1';
var cacheName = 'motree-cache-v1';
var filesToCache = [
  'index.html',
  'lib/ionic/js/ionic.bundle.min.js',
  'lib/ionic/css/ionic.min.css',
  'lib/ionic/fonts/ionicons.woff',
  'lib/localforage.min.js',
  'lib/lodash.min.js',
  'lib/vivus.min.js',
  'js/app.js',
  'js/controllers.js',
  'js/data.js',
  'img/splash.svg',
  'img/icon.svg',
  'img/favicon-96x96.png',
  'img/favicon-32x32.png',
  'img/favicon-16x16.png',
  'css/style.css'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        console.log('[ServiceWorker] Removing old cache', key);
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function (event) {
  console.log('[ServiceWorker] Fetch', event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('push', function (event) {
  console.log('[ServiceWorker] Push');
});
