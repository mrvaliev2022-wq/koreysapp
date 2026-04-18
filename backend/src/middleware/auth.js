const crypto = require('crypto');
const db = require('../db');

function verifyTelegramWebApp(initData, botToken) {
  try {
    const params = new URLSearchParams(initData);
    const hash = params.get('hash');
    if (!hash) return false;
    params.delete('hash');

    const dataCheckString = [...params.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join('\n');

    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();

    const expectedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    return expectedHash === hash;
  } catch (e) {
    return false;
  }
}

module.exports = async function authMiddleware(req, res, next) {
  const initData = req.headers['x-telegram-init-data'];

  if (!initData) {
    return res.status(401).json({ error: 'No auth' });
  }

  // In development, skip verification
  const isDev = process.env.NODE_ENV !== 'production';
  if (!isDev && !verifyTelegramWebApp(initData, process.env.BOT_TOKEN)) {
    return res.status(401).json({ error: 'Invalid Telegram auth' });
  }

  try {
    const params = new URLSearchParams(initData);
    const tgUser = JSON.parse(params.get('user') || '{}');
    req.telegramUser = tgUser;

    if (!tgUser.id) {
      return res.status(401).json({ error: 'No user in initData' });
    }

    // Upsert user in DB
    const name = [tgUser.first_name, tgUser.last_name].filter(Boolean).join(' ') || 'User';
    const { rows } = await db.query(
      `INSERT INTO users (telegram_id, name, username)
       VALUES ($1, $2, $3)
       ON CONFLICT (telegram_id) DO UPDATE
         SET name = EXCLUDED.name,
             username = EXCLUDED.username
       RETURNING id, telegram_id, name, username, is_premium, premium_until`,
      [tgUser.id, name, tgUser.username || null]
    );

    req.user = rows[0];

    // Ensure user_stats and leaderboard rows exist
    await db.query(
      `INSERT INTO user_stats (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING`,
      [rows[0].id]
    ).catch(() => {});

    await db.query(
      `INSERT INTO leaderboard (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING`,
      [rows[0].id]
    ).catch(() => {});

    next();
  } catch (e) {
    console.error('Auth middleware error:', e.message);
    return res.status(500).json({ error: 'Auth error: ' + e.message });
  }
};
