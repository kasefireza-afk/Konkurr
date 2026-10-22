const C='kd-v2',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET')return;
if(r.mode=='navigate'){e.respondWith(fetch(r).then(n=>{const c=n.clone();caches.open(C).then(x=>x.put('index.html',c));return n}).catch(()=>caches.match('index.html')));return}
e.respondWith(caches.match(r).then(x=>x||fetch(r).then(n=>{const c=n.clone();caches.open(C).then(y=>y.put(r,c));return n}).catch(()=>caches.match('index.html'))))});
