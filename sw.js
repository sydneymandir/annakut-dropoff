// Annakut 2026 drop-off has finished. This replaces the old offline helper on visitors' phones:
// it deletes the saved guide and voice files, removes itself, and reloads open pages
// so they show the thank-you page (which then goes to the BAPS Sydney page).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter(k => k.startsWith('annakut-dropoff-')).map(k => caches.delete(k)));
  await self.registration.unregister();
  const wins = await self.clients.matchAll({ type: 'window' });
  wins.forEach(w => { try { w.navigate(w.url) } catch (err) {} });
})()));
