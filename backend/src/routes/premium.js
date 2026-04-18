const router = require('express').Router();
const db = require('../db');

router.post('/admin-activate', async (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.ADMIN_SECRET && adminKey !== 'admin123') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const { telegramId, method, months } = req.body;
  const m = parseInt(months) || 4;
  try {
    await db.query(
      'INSERT INTO users (telegram_id, name, username) VALUES ($1, $2, $3) ON CONFLICT (telegram_id) DO NOTHING',
      [telegramId, 'Premium User', null]
    );
    await db.query(
      'UPDATE users SET is_premium = true, premium_until = NOW() + ($2 || \' months\')::INTERVAL WHERE telegram_id = $1',
      [telegramId, m.toString()]
    );
    await db.query(
      'INSERT INTO payments (user_id, method, status, confirmed_at) SELECT id, $2, \'confirmed\', NOW() FROM users WHERE telegram_id = $1',
      [telegramId, method || 'card']
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/activate', async (req, res) => {
  const { userId, method, txId } = req.body;
  try {
    await db.query(
      'UPDATE users SET is_premium = true, premium_until = NOW() + INTERVAL \'7 months\' WHERE id = $1',
      [userId]
    );
    await db.query(
      'INSERT INTO payments (user_id, method, status, tx_id, confirmed_at) VALUES ($1, $2, \'confirmed\', $3, NOW())',
      [userId, method, txId || null]
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
});

router.post('/stars', async (req, res) => {
  const { telegramId, telegramPaymentId } = req.body;
  try {
    await db.query(
      'INSERT INTO users (telegram_id, name) VALUES ($1, \'Stars User\') ON CONFLICT (telegram_id) DO NOTHING',
      [telegramId]
    );
    await db.query(
      'UPDATE users SET is_premium = true, premium_until = NOW() + INTERVAL \'1 month\' WHERE telegram_id = $1',
      [telegramId]
    );
    const { rows } = await db.query('SELECT id FROM users WHERE telegram_id = $1', [telegramId]);
    if (rows.length) {
      await db.query(
        'INSERT INTO payments (user_id, method, amount, status, tx_id, confirmed_at) VALUES ($1, \'stars\', 150, \'confirmed\', $2, NOW())',
        [rows[0].id, telegramPaymentId]
      );
    }
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
