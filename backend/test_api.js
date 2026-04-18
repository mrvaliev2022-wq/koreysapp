const https = require('https');

const API_URL = 'https://koreysapp-production.up.railway.app';
const ADMIN_SECRET = 'koreysapp_admin_2026';

function apiPost(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const url = new URL(API_URL + path);
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'x-admin-key': ADMIN_SECRET,
      }
    };
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        console.log('Status:', res.statusCode);
        console.log('Response:', body);
        resolve(JSON.parse(body));
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function test() {
  console.log('Testing /api/premium/admin-activate...');
  try {
    const result = await apiPost('/api/premium/admin-activate', {
      telegramId: 387075431,
      method: 'card',
      months: 4
    });
    console.log('Result:', result);
  } catch(e) {
    console.log('Error:', e.message);
  }
}

test();
