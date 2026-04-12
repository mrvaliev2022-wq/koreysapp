const db = require('../db');
const { redis } = require('../cache');

function msUntilMidnightTashkent() {
  const now = new Date();
  const tashkent = new Date(now.getTime() + 5 * 60 * 60 * 1000);
  const nextMidnight = new Date(tashkent);
  nextMidnight.setUTCHours(24, 0, 0, 0);
  return nextMidnight - tashkent;
}

async function resetDailyLeaderboard() {
  console.log('[CRON] Resetting daily leaderboard...');
  try {
    await db.query('UPDATE leaderboard SET xp_today = 0, updated_at = NOW()');
    const keys = await redis.keys('leaderboard:*');
    if (keys.length) await redis.del(keys);
    console.log('[CRON] Daily reset done');
  } catch (err) {
    console.error('[CRON] Reset failed:', err.message);
  }
  setTimeout(resetDailyLeaderboard, 24 * 60 * 60 * 1000);
}

const msToMidnight = msUntilMidnightTashkent();
console.log([CRON] Daily reset in \ minutes);
setTimeout(resetDailyLeaderboard, msToMidnight);

module.exports = {};
