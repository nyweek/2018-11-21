'use strict';

var cacheVersion = 'c82f1b6e-477f-32b4-90f7-e6a78e0a85f7';
var currentCache = {
  offline: 'offline-cache' + cacheVersion
};

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache.offline).then(function(cache) {
      return cache.addAll([
        './catpower.html',
        './datestimes.html',
        './elvis.html',
        './index.html',
        './subway.html',
        './fonts/hinted-AvenirNext-Bold.woff',
        './fonts/hinted-AvenirNext-Bold.woff2',
        './fonts/hinted-AvenirNext-Italic.woff',
        './fonts/hinted-AvenirNext-Italic.woff2',
        './fonts/hinted-AvenirNext-Regular.woff',
        './fonts/hinted-AvenirNext-Regular.woff2',
        './fonts/hinted-AvenirNext-UltraLight.woff',
        './fonts/hinted-AvenirNext-UltraLight.woff2',
        './fonts/hinted-Bungee-Regular.woff',
        './fonts/hinted-Bungee-Regular.woff2',
        './fonts/hinted-Ingeborg-Block.woff',
        './fonts/hinted-Ingeborg-Block.woff2',
        './media/cat-cover.jpg',
        './media/cat-power-1.png',
        './media/cat-power-2.png',
        './media/cat-power2.jpg',
        './media/cat-power4.png',
        './media/cat.jpg',
        './media/cover-back.jpg',
        './media/datesandtimes.png',
        './media/eats.jpg',
        './media/elviscover.png',
        './media/guide.jpg',
        './media/io.jpg',
        './media/lovepersonals.png',
        './media/nyweek.png',
        './media/ragandbone.jpg',
        './media/subwaymap.png',
        './media/watch.jpg',
        ]);
    })
  );
});

this.addEventListener('fetch', event => {
  // request.mode = navigate isn't supported in all browsers
  // so include a check for Accept: text/html header.
  if (
    event.request.mode === 'navigate' ||
    (event.request.method === 'GET' &&
      event.request.headers.get('accept').includes('text/html'))
  ) {
    event.respondWith(
      fetch(event.request.url).catch(error => {
        // Return the offline page
        
        let catpowerregex = /catpower/g;
        let catpower = event.request.url.match(catpowerregex);

        if (catpower && catpower.length > 0) {
          return caches.match('./catpower.html');
        }
        
        let datestimesregex = /datestimes/g;
        let datestimes = event.request.url.match(datestimesregex);

        if (datestimes && datestimes.length > 0) {
          return caches.match('./datestimes.html');
        }
        
        let elvisregex = /elvis/g;
        let elvis = event.request.url.match(elvisregex);

        if (elvis && elvis.length > 0) {
          return caches.match('./elvis.html');
        }
        
        let indexregex = /index/g;
        let index = event.request.url.match(indexregex);

        if (index && index.length > 0) {
          return caches.match('./index.html');
        }
        
        let subwayregex = /subway/g;
        let subway = event.request.url.match(subwayregex);

        if (subway && subway.length > 0) {
          return caches.match('./subway.html');
        }
        
        return caches.match('./index.html');
      })
    );
  } else {
    // Respond with everything else if we can
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  }
});
