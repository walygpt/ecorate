const CACHE_NAME = "ecorate-ai-v1"
const URLS_TO_CACHE = ["/", "/manifest.json"]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE).catch(() => {
        // Silently fail if resources aren't available during install
        console.log("Some resources failed to cache during install")
      })
    }),
  )
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  self.clients.claim()
})

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return
  }

  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (response) {
          return response
        }

        return fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200 || response.type === "error") {
              return response
            }

            const responseClone = response.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone)
            })
            return response
          })
          .catch(() => {
            // Return cached version if network fails
            return caches.match(event.request)
          })
      })
      .catch(() => {
        // Fallback for critical errors
        return new Response("Network error", { status: 408 })
      }),
  )
})
