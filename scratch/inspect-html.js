const fs = require('fs');

async function check() {
  const res = await fetch('http://127.0.0.1:3005');
  const html = await res.text();
  const preloads = [...html.matchAll(/<link[^>]*rel="preload"[^>]*>/g)].map(m => m[0]);
  console.log('Preload tags count:', preloads.length);
  preloads.forEach(p => console.log(' ', p));

  const scripts = [...html.matchAll(/<script[^>]*src="([^"]+)"[^>]*>/g)].map(m => m[1]);
  console.log('\nScript tags count:', scripts.length);
  scripts.forEach(s => console.log(' ', s));
}

check();
