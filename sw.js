/** Refer by
 * https://developers.google.com/web/fundamentals/primers/service-workers/
 * https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
 *
*/
const cacheName = 'restaurant-cache';
// Files to cache:
const cacheAssets = [
	'./',
	'./index.html',
	'./restaurant.html',
	'./css/styles.css',
	'./js/main.js',
	'./data/restaurants.json',
	'./js/dbhelper.js',
	'./js/restaurant_info.js',
	'./img/1.jpg',
	'./img/2.jpg',
	'./img/3.jpg',
	'./img/4.jpg',
	'./img/5.jpg',
	'./img/6.jpg',
	'./img/7.jpg',
	'./img/8.jpg',
	'./img/9.jpg',
	'./img/10.jpg'
];

/**
 * Install Event Listener
 */
self.addEventListener('install', function (event) {
	event.waitUntil(
		caches
		.open(cacheName)
		.then((cache) => {
			return cache.addAll(cacheAssets);
		})
	);
});

/**
 * activate caches
 */
self.addEventListener('activate', function (event) {
	event.waitUntil(
		caches
		.keys()
		.then((cacheNames) => {
			return Promise.all(
				cacheNames.filter(function (thisCacheName) {
					return cacheName.startsWith('restaurant-') &&
						thisCacheName != cacheName;
				})
				.map(function (cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});

/**
 * fetch requests
 */
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request)
		.then((response) => {
			// Return cached version or fetch
			return response || fetch(event.request);
		})
	);
})

