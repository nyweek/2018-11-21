'use strict';

var cacheVersion = 35;
var currentCache = {
  offline: 'offline-cache' + cacheVersion
};
const offlineUrl = 'index.html';
const indexUrl = 'index.html';
const catpowerUrl = 'catpower.html';
const elvisUrl = 'elvis.html';
const datestimesUrl = 'datestimes.html';
const subwayUrl = 'subway.html';

const cacheList = [
  './index.html',
  './datestimes.html',
  './elvis.html',
  './catpower.html',
  './subway.html',

  './media/cat-cover.jpg',
  './media/lovepersonals.png',
  './media/ragandbone.jpg',
  './media/watch.jpg',
  './media/elviscover.png',
  './media/eats.jpg',

  './favicon-32x32.png',
  './favicon-16x16.png',
  './android-chrome-192x192.png',
  './media/subway.scg',
  './media/nyweek.png',
  './media/ad3.jpg',
  './media/beacon.jpg',
  './media/bottom.jpg',
  './media/bottom1.jpg',
  './media/cover-back.jpg',
  './media/watch',
  './media/cat-back.jpg',

  './media/cat-power-0.jpg',
  './media/cat-power-1.png',
  './media/cat-power-2.png',
  './media/cat-power2.jpg',
 
  './media/cat.jpg',
  './media/cover-back.jpg',
  './media/datestimes.png',

  './media/elvis1.png',

  './media/elvisback.jpg',
  './media/elvistop.jpg',
  './media/guide.jpg',
  './media/io.jpg',

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
  './fonts/hinted-Ingeborg-Block.woff2'
];

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache.offline).then(function(cache) {
      return cache.addAll([
        './media/nyweek.png',
        './media/cover-back.jpg',
        './media/cat-cover.jpg',
        './media/lovepersonals.png',
        './media/ragandbone.jpg',
        './media/watch.jpg',
        './media/elviscover.png',
        './media/eats.jpg',
        './media/guide.jpg',
        './media/io.jpg',
        './media/subway.svg',
        './android-chrome-192x192.png',
        './media/datesandtimes.png',
        './media/cat-power4.png',
        './media/cat.jpg',
        './media/cat-power-1.png',
        './media/cat-power2.jpg',
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

        indexUrl,
        catpowerUrl,
        elvisUrl,
        datestimesUrl,
        subwayUrl
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
        let datestimesregex = /datestimes/g;
        let elvisregex = /elvis/g;
        let subwayregex = /subway/g;

        let catpower = event.request.url.match(catpowerregex);
        let datestimes = event.request.url.match(datestimesregex);
        let elvis = event.request.url.match(elvisregex);
        let subway = event.request.url.match(subwayregex);

        if (catpower && catpower.length > 0) {
          return caches.match(catpowerUrl);
        }

        if (datestimes && datestimes.length > 0) {
          return caches.match(datestimesUrl);
        }

        if (elvis && elvis.length > 0) {
          return caches.match(elvisUrl);
        }

        if (subway && subway.length > 0) {
          return caches.match(subwayUrl);
        }

        return caches.match(indexUrl);
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
