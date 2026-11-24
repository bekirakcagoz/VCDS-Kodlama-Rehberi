const CACHE="vcds-274a18e085";
const FILES=["./", "icons/apple-touch-icon.png", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "img/arka-halojen.jpg", "img/arka-led.png", "img/on-halojen.png", "img/on-led.png", "img/us-1.jpg", "img/us-2.jpg", "img/us-3.jpg", "img/us-4.jpg", "index.html", "manifest.webmanifest"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE&&k.startsWith("vcds-")).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
 const u=new URL(e.request.url); if(e.request.method!=="GET")return;
 if(u.origin===location.origin){
  if(e.request.mode==="navigate"){e.respondWith(fetch(e.request).then(r=>{caches.open(CACHE).then(c=>c.put("index.html",r.clone()));return r}).catch(()=>caches.match("index.html")));return;}
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request)));return;}
 if(u.host==="fonts.googleapis.com"||u.host==="fonts.gstatic.com"){
  e.respondWith(caches.open("vcds-fonts").then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(n=>{c.put(e.request,n.clone());return n}))));}
});
