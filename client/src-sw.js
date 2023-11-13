// Import necessary modules from the Workbox library
const { warmStrategyCache } = require("workbox-recipes");
const { CacheFirst, StaleWhileRevalidate } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

// Precache and route the assets defined in the service worker manifest
precacheAndRoute(self.__WB_MANIFEST);

// Create a CacheFirst strategy for caching pages
const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    // Cache responses with status codes 0 and 200
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    // Set an expiration for the cached pages (30 days)
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Warm up the page cache by pre-caching specific URLs
warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});

// Register a route for navigation requests using the pageCache strategy
registerRoute(({ request }) => request.mode === "navigate", pageCache);

// TODO: Implement asset caching
// Register a route for caching style, script, and worker requests
registerRoute(
  // Filter requests that should be cached (styles, scripts, workers)
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  // Use the StaleWhileRevalidate strategy for assets
  new StaleWhileRevalidate({
    cacheName: "asset-cache",
    plugins: [
      // Cache responses with status codes 0 and 200
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
