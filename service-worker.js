var dataCacheName = 'motree';
var cacheName = 'motree-cache';
var filesToCache = [
  '/',
  '/index.html',
  '/lib/ionic/js/ionic.bundle.min.js',
  '/lib/ionic/css/ionic.min.css',
  '/lib/ionic/fonts/ionicons.woff',
  '/lib/localforage.min.js',
  '/lib/lodash.min.js',
  '/lib/vivus.min.js',
  '/js/app.js',
  '/js/controllers.js',
  '/js/data.js',
  '/img/splash.svg',
  '/img/icon.svg',
  '/css/style.css'
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

});

self.addEventListener('fetch', function (event) {

});

self.addEventListener('push', function (event) {

});
