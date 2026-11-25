// Federfuchs 0.35: network-first navigation; bounded cache for immutable game assets.
const CACHE='federfuchs-assets-v035';
const LIMIT=100;
self.addEventListener('install',event=>{self.skipWaiting();});
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  for(const name of await caches.keys())if(name.startsWith('federfuchs-assets-')&&name!==CACHE)await caches.delete(name);
  await self.clients.claim();
})()));
function permitted(url){
  if(url.origin===self.location.origin)return url.pathname.startsWith(new URL(self.registration.scope).pathname)&&/\.(js|mjs|glb|gltf|bin|ktx2|png|jpe?g|webp|wasm|css)$/i.test(url.pathname);
  return (url.hostname==='cdn.jsdelivr.net'&&/^\/npm\/(three@0\.164\.1|three-mesh-bvh@0\.7\.6)\//.test(url.pathname))||(url.hostname==='dl.polyhaven.org'&&url.pathname.startsWith('/file/ph-assets/'));
}
async function store(cache,request,response){
  if(!response.ok||response.type==='opaque')return;
  // Only static public assets; never cache API responses, private data or error pages.
  await cache.put(request,response.clone());
  const entries=await cache.keys();while(entries.length>LIMIT)await cache.delete(entries.shift());
}
self.addEventListener('fetch',event=>{
  const req=event.request,url=new URL(req.url);
  if(req.method!=='GET')return;
  if(req.mode==='navigate'&&url.origin===self.location.origin&&url.pathname.startsWith(new URL(self.registration.scope).pathname)){
    event.respondWith((async()=>{
      const cache=await caches.open(CACHE);
      try{const res=await fetch(req);if(res.ok)await cache.put(new Request(self.registration.scope),res.clone());return res;}
      catch(e){return await cache.match(new Request(self.registration.scope))||Response.error();}
    })());return;
  }
  if(!permitted(url))return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    // Project modules change with releases. Always prefer network for them.
    if(url.origin===self.location.origin&&!url.pathname.includes('/vendor/')&&/\.(js|mjs|css)$/i.test(url.pathname)){
      try{const res=await fetch(req,{cache:'no-cache'});if(res.ok){try{await store(cache,req,res);}catch(e){}}return res;}
      catch(e){return await cache.match(req)||Response.error();}
    }
    const saved=await cache.match(req);if(saved)return saved;
    const res=await fetch(req);try{await store(cache,req,res);}catch(e){}return res;
  })());
});
