const CACHE="god-sim-v1";
const FILES=["./","./index.html","./style.css","./manifest.json",
"./js/map.js","./js/camera.js","./js/buildings.js","./js/inventory.js",
"./js/population.js","./js/economy.js","./js/simulation.js","./js/save.js",
"./js/god-powers.js","./js/online.js","./js/game.js"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener("fetch",e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));