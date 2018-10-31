'use strict';

var cacheVersion = '1bdad4b9-1238-3614-85fa-15afa2e3165c';
var currentCache = {
  offline: 'offline-cache' + cacheVersion
};

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache.offline).then(function(cache) {
      return cache.addAll([
        './datestimes.html',
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
        './media/beacon.jpg',
        './media/bottom.jpg',
        './media/bottom1.jpg',
        './media/cover-back.jpg',
        './media/datesandtimes.png',
        './media/eats.jpg',
        './media/guide.jpg',
        './media/io.jpg',
        './media/irving.jpg',
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
        
        let datestimesregex = /datestimes/g;
        let datestimes = event.request.url.match(datestimesregex);

        if (datestimes && datestimes.length > 0) {
          return caches.match('./datestimes.html');
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
