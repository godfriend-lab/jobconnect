// Service Worker pour ProKorb PWA
const CACHE_NAME = 'prokorb-v1'
const urlsToCache = [
  '/',
  '/dashboard/client',
  '/marketplace',
  '/login',
  '/register'
]

// Installation du Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert')
        return cache.addAll(urlsToCache)
      })
      .catch(error => {
        console.error('Erreur cache:', error)
      })
  )
})

// Activation et nettoyage
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      )
    })
  )
})

// Interception des requêtes
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response
        }
        return fetch(event.request)
      })
      .catch(error => {
        console.error('Erreur fetch:', error)
        return fetch(event.request)
      })
  )
})