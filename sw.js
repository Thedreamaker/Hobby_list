// This tells the browser to listen for background events so it qualifies as an app
self.addEventListener('install', (event) => {
  console.log('Service Worker installed!');
});

self.addEventListener('fetch', (event) => {
  // This allows the app to load content when offline or online
  event.respondWith(fetch(event.request));
});
