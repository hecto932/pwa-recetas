/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */

// Precarga la app
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// App Shell
workbox.routing.registerNavigationRoute('/index.html');

// GA Offiline
workbox.googleAnalytics.initialize();

// La API usa Stale While Revalidate para mayor velocidad
workbox.routing.registerRoute(
  /^https?:\/\/www.themealdb.com\/api\/.*/,
  new workbox.strategies.StaleWhileRevalidate()
);

// Last fuentes van con Cache First y vencen al mes
workbox.routing.registerRoute(
  /^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 30 * 24 * 60 * 60
      })
    ]
  })
)

// https://www.themealdb.com/images/media/meals/1550442508.jpg
workbox.routing.registerRoute(
  /^https?:\/\/www.themealdb.com\/images\/.*/,
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 7 * 24 * 60 * 60,
        maxEntries: 20
      })
    ]
  })
)

// La API usa Stale While Revalidate para mayor velocidad
// Por defecto. Va al final de todo
workbox.routing.registerRoute(
  /^https?.*/,
  new workbox.strategies.NetworkFirst()
);
