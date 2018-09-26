let CACHE_VERSION = 'restaurant-app-static-v1';
let CACHE_FILES = [
    './',
    'service-worker/css/styles.css',
    'service-worker/index.html',
    'service-worker/restaurant.html',
          'service-worker/js/main.js',
          'service-worker/js/restaurant_info.js',
          'service-worker/js/dbhelper.js',
          'service-worker/js/sw_register.js',
          'service-worker/data/restaurants.json',
          'service-worker/img/1.jpg',
          'service-worker/img/2.jpg',
          'service-worker/img/3.jpg',
          'service-worker/img/4.jpg',
          'service-worker/img/5.jpg',
          'service-worker/img/6.jpg',
          'service-worker/img/7.jpg',
          'service-worker/img/8.jpg',
          'service-worker/img/9.jpg',
          'service-worker/img/10.jpg',
          ];



self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(CACHE_FILES);
            })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function(keys){
            return Promise.all(keys.map(function(key, i){
                if(key !== CACHE_VERSION){
                    return caches.delete(keys[i]);
                }
            }))
        })
    )
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function(response){
            if(response){
                return response;
            }
           return fetch(event.request);
        })
    )
});


