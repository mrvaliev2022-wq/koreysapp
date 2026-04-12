const router = require('express').Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.post('/activate', auth, async (req, res) => {
  const { userId, method, txId } = req.body;
  try {
    await db.query(
      UPDATE users
       SET is_premium = true, premium_until = NOW() + INTERVAL '7 months'
       WHERE id = \,
      [userId]
    );
    await db.query(
      INSERT INTO payments (user_id, method, status, tx_id, confirmed_at)
       VALUES (\, \, 'confirmed', \, NOW()),
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
      UPDATE users SET is_premium = true, premium_until = NOW() + INTERVAL '1 month'
       WHERE telegram_id = \,
      [telegramId]
    );
    await db.query(
      INSERT INTO payments (user_id, method, amount, status, tx_id, confirmed_at)
       SELECT id, 'stars', 150, 'confirmed', \, NOW() FROM users WHERE telegram_id = \,
      [telegramId, telegramPaymentId]
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;
