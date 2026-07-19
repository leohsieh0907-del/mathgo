var CACHE = 'mathgo-v23';
var CORE = ['./', 'index.html', 'manifest.json', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png',
  'gsat/111a/fig_q3.png','gsat/111a/fig_q11.png','gsat/111a/fig_q14_sys.png','gsat/111a/fig_q14_mat.png','gsat/111a/fig_q15.png','gsat/111a/fig_q18.png',
  'gsat/112a/fig_q2.png','gsat/112a/fig_q3.png','gsat/112a/fig_q5.png','gsat/112a/fig_q13.png','gsat/112a/fig_q17.png','gsat/112a/fig_q18.png',
  'gsat/113a/fig_q2.png','gsat/114a/fig_q1.png','gsat/114a/fig_q11.png','gsat/115a/fig_q18.png','gsat/115a/fig_q5.png','gsat/115a/fig_q8.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var isNav = e.request.mode === 'navigate' || (e.request.destination === 'document');
  if (isNav) {
    e.respondWith(
      fetch(e.request).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        return res;
      }).catch(function () { return caches.match(e.request).then(function (m) { return m || caches.match('index.html'); }); })
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(function (m) {
      if (m) return m;
      return fetch(e.request).then(function (res) {
        if (res.ok && (e.request.url.indexOf('http') === 0)) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        }
        return res;
      });
    })
  );
});
