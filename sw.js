let CACHE_VERSION = 'restaurant-app-static-v1';
let CACHE_FILES = [
    './',
    './css/styles.css',
          'js/main.js',
          'js/restaurant_info.js',
          'index.html',
          'js/dbhelper.js',
          'restaurant.html',
          'js/sw_register.js',
          '/js/',
          'data/restaurants.json',
          'img/1.jpg',
          'img/2.jpg',
          'img/3.jpg',
          'img/4.jpg',
          'img/5.jpg',
          'img/6.jpg',
          'img/7.jpg',
          'img/8.jpg',
          'img/9.jpg',
          'img/10.jpg',
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


