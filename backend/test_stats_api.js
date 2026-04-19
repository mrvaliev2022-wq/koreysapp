const https = require('https');

const API_URL = 'https://koreysapp-production.up.railway.app';
const ADMIN_SECRET = 'koreysapp_admin_2026';

function get(path) {
  return new Promise((resolve, reject) => {
    const url = new URL(API_URL + path);
    https.get({
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: { 'x-admin-key': ADMIN_SECRET }
    }, (res) => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        console.log('Status:', res.statusCode);
        try { resolve(JSON.parse(body)); }
        catch(e) { resolve(body); }
      });
    }).on('error', reject);
  });
}

async function test() {
  console.log('Testing /api/stats/admin...\n');
  const data = await get('/api/stats/admin');
  console.log(JSON.stringify(data, null, 2));
}

test().catch(console.error);
