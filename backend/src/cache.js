const { createClient } = require('redis');

let redis = null;

if (process.env.REDIS_URL && process.env.REDIS_URL !== 'placeholder') {
  redis = createClient({ url: process.env.REDIS_URL });
  redis.on('error', (err) => console.error('Redis error', err));
  redis.connect().catch(console.error);
} else {
  console.log('Redis disabled (no REDIS_URL)');
  redis = {
    get: async () => null,
    setEx: async () => {},
    del: async () => {},
  };
}

async function cached(key, ttlSec, fetchFn) {
  try {
    if (redis.get) {
      const hit = await redis.get(key);
      if (hit) return JSON.parse(hit);
    }
  } catch (e) {}
  const data = await fetchFn();
  try {
    if (redis.setEx) await redis.setEx(key, ttlSec, JSON.stringify(data));
  } catch (e) {}
  return data;
}

module.exports = { redis, cached };
