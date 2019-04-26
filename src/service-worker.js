/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */

// Precarga la app
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

// App Shell
workbox.routing.registerNavigationRoute('/index.html')

workbox.routing.registerRoute(/^https?.*/, workbox.strategies.networkFirst(), 'GET')