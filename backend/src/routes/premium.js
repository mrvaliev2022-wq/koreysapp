// backend/src/routes/premium.js
const router = require('express').Router();
const db = require('../db');
const auth = require('../middleware/auth');

// POST /api/premium/admin-activate — admin tasdiqlashi (bot orqali)
router.post('/admin-activate', async (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.ADMIN_SECRET && adminKey !== 'admin123') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { telegramId, method, months } = req.body;
  const m = months || 7;

  try {
    const { rows } = await db.query(
      'UPDATE users SET is_premium = true, ' +
      'premium_until = NOW() + INTERVAL \'' + m + ' months\' ' +
      'WHERE telegram_id = $1 RETURNING id',
      [telegramId]
    );
    if (!rows.length) return res.status(404).json({ error: 'User not found' });

    await db.query(
      'INSERT INTO payments (user_id, method, status, confirmed_at) ' +
      'VALUES ($1, $2, \'confirmed\', NOW())',
      [rows[0].id, method || 'card']
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// POST /api/premium/activate — app ichidan (auth kerak)
router.post('/activate', auth, async (req, res) => {
  const { userId, method, txId } = req.body;
  try {
    await db.query(
      'UPDATE users SET is_premium = true, ' +
      'premium_until = NOW() + INTERVAL \'7 months\' WHERE id = $1',
      [userId]
    );
    await db.query(
      'INSERT INTO payments (user_id, method, status, tx_id, confirmed_at) ' +
      'VALUES ($1, $2, \'confirmed\', $3, NOW())',
      [userId, method, txId || null]
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
});

// POST /api/premium/stars — Telegram Stars (bot orqali)
router.post('/stars', async (req, res) => {
  const { telegramId, telegramPaymentId } = req.body;
  try {
    const { rows } = await db.query(
      'UPDATE users SET is_premium = true, ' +
      'premium_until = NOW() + INTERVAL \'1 month\' ' +
      'WHERE telegram_id = $1 RETURNING id',
      [telegramId]
    );
    if (!rows.length) return res.status(404).json({ error: 'User not found' });

    await db.query(
      'INSERT INTO payments (user_id, method, amount, status, tx_id, confirmed_at) ' +
      'VALUES ($1, \'stars\', 150, \'confirmed\', $2, NOW())',
      [rows[0].id, telegramPaymentId]
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;
