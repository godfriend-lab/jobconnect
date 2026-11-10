// ==========================================================
// 🚀 PROKORB SERVICE WORKER (High-End PWA v5)
// Stratégies : Network-First (HTML), Cache-First (Assets)
// ==========================================================

const CACHE_VERSION = 'v5';
const CACHE_NAME = `prokorb-${CACHE_VERSION}`;

// Éléments critiques à mettre en cache immédiatement lors de l'installation
const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/favicon.png',
  '/apple-touch-icon.png',
  '/logo.png'
];

// ==========================================================
// 1. INSTALLATION : Mise en cache des éléments critiques
// ==========================================================
self.addEventListener('install', (event) => {
  console.log('[SW] Installation en cours...');
  // Force le nouveau SW à devenir actif immédiatement, sans attendre la fermeture des onglets
  self.skipWaiting(); 
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Mise en cache des éléments critiques');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .catch((error) => console.error('[SW] Échec du precache:', error))
  );
});

// ==========================================================
// 2. ACTIVATION : Nettoyage des anciens caches pour économiser l'espace
// ==========================================================
self.addEventListener('activate', (event) => {
  console.log('[SW] Activation et nettoyage...');
  // Prend le contrôle de toutes les pages ouvertes immédiatement
  self.clients.claim(); 
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('prokorb-') && name !== CACHE_NAME)
          .map((name) => {
            console.log(`[SW] Suppression de l'ancien cache : ${name}`);
            return caches.delete(name);
          })
      );
    })
  );
});

// ==========================================================
// 3. INTERCEPTION DES REQUÊTES (Le Cœur du Système)
// ==========================================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // --------------------------------------------------------
  // STRATÉGIE A : Navigation (Pages HTML) -> Network First avec Fallback Offline
  // On essaie toujours d'avoir la version la plus récente. Si échec, on sert offline.html
  // --------------------------------------------------------
  if (request.mode === 'navigate' || (request.method === 'GET' && request.headers.get('accept')?.includes('text/html'))) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Si la réponse est valide, on la met en cache pour la prochaine fois
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => {
          // 🚨 C'est ici que la magie opère : si aucune connexion, on sert la belle page offline
          console.log('[SW] Hors ligne -> Service de /offline.html');
          return caches.match('/offline.html');
        })
    );
    return;
  }

  // --------------------------------------------------------
  // STRATÉGIE B : Assets Statiques (Next.js, Images, Fonts, CSS) -> Cache First
  // Ces fichiers ont des hashes dans leur nom, ils ne changent pas. Le cache est instantané.
  // --------------------------------------------------------
  if (url.pathname.startsWith('/_next/') || url.pathname.match(/\.(png|jpg|jpeg|svg|webp|css|js|woff2?)$/i)) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse; // Retour immédiat depuis le cache (ultra-rapide)
        }
        // Sinon, on récupère du réseau et on met en cache pour la prochaine fois
        return fetch(request).then((networkResponse) => {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          return networkResponse;
        });
      })
    );
    return;
  }

  // --------------------------------------------------------
  // STRATÉGIE C : Appels API -> Network Only (Données dynamiques)
  // On ne met pas en cache les données de la marketplace pour éviter d'afficher de vieux prix/pros.
  // --------------------------------------------------------
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/_next/data/')) {
    event.respondWith(
      fetch(request).catch(() => {
        // Fallback JSON élégant si l'API est appelée hors ligne
        return new Response(JSON.stringify({ error: 'Vous êtes actuellement hors ligne.' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
  }
});

// ==========================================================
// 4. GESTION DES MISES À JOUR EN ARRIÈRE-PLAN
// ==========================================================
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});