// This tells the browser to listen for background events so it qualifies as an app
//self.addEventListener('install', (event) => {
//  console.log('Service Worker installed!');
//});

//self.addEventListener('fetch', (event) => {
  // This allows the app to load content when offline or online
 // event.respondWith(fetch(event.request));
//});


const CACHE_NAME = 'hobby-space-cache-v1';

// List every single file you want available offline
const ASSETS_TO_CACHE = [
  'index.html',
  'manifest.json',
  'sw.js'
  // Add your other page names here exactly as they are spelled, for example:
  'about.html',
  'recipe_solver.html',
  'crochet.html',
  'gardening.html',
  'travel.html',
  'contact.html'
];

// 1. Install Event: Save all files into the phone's local cache right away
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching all web assets for offline use...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Fetch Event: Serve files straight from the cache if offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // If the file is in the cache, return it instantly without using internet
      if (cachedResponse) {
        return cachedResponse;
      }
      // Otherwise, go out to the internet to get it
      return fetch(event.request);
    })
  );
});

