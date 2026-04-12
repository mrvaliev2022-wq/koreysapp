const { createClient } = require('redis');

const redis = createClient({ url: process.env.REDIS_URL });

redis.on('error', (err) => console.error('Redis error', err));
redis.connect();

async function cached(key, ttlSec, fetchFn) {
  const hit = await redis.get(key);
  if (hit) return JSON.parse(hit);
  const data = await fetchFn();
  await redis.setEx(key, ttlSec, JSON.stringify(data));
  return data;
}

module.exports = { redis, cached };
