const router = require('express').Router();
const db     = require('../db');
const auth   = require('../middleware/auth');

// Admin secret check
function adminAuth(req, res, next) {
  const key = req.headers['x-admin-key'] || req.body?.adminKey;
  if (key === process.env.ADMIN_SECRET) return next();
  // Also allow if req.user is admin
  if (process.env.ADMIN_IDS && process.env.ADMIN_IDS.includes(String(req.user?.telegram_id))) return next();
  return res.status(403).json({ error: 'Forbidden' });
}

// POST /api/premium/admin-activate — bot calls this with telegramId
router.post('/admin-activate', async (req, res) => {
  const key = req.headers['x-admin-key'];
  if (key !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { telegramId, method, months } = req.body;
  const m = parseInt(months) || 4;

  if (!telegramId) return res.status(400).json({ error: 'telegramId required' });

  try {
    const { rows } = await db.query(
      `UPDATE users
       SET is_premium = true,
           premium_until = NOW() + INTERVAL '${m} months'
       WHERE telegram_id = $1
       RETURNING id, telegram_id, is_premium, premium_until`,
      [telegramId]
    );

    if (!rows.length) return res.status(404).json({ error: 'User not found' });

    // Log payment
    await db.query(
      `INSERT INTO payments (user_id, method, amount, status, confirmed_at)
       VALUES ($1, $2, 29000, 'confirmed', NOW())
       ON CONFLICT DO NOTHING`,
      [rows[0].id, method || 'card']
    ).catch(() => {});

    res.json({ ok: true, user: rows[0] });
  } catch (err) {
    console.error('admin-activate error:', err.message);
    res.status(500).json({ error: 'DB error: ' + err.message });
  }
});

// POST /api/premium/revoke — bot calls this to revoke premium
router.post('/revoke', async (req, res) => {
  const key = req.headers['x-admin-key'];
  if (key !== process.env.ADMIN_SECRET) return res.status(403).json({ error: 'Forbidden' });

  const { telegramId } = req.body;
  if (!telegramId) return res.status(400).json({ error: 'telegramId required' });

  try {
    const { rows } = await db.query(
      `UPDATE users SET is_premium = false, premium_until = NULL
       WHERE telegram_id = $1 RETURNING id, telegram_id`,
      [telegramId]
    );
    if (!rows.length) return res.status(404).json({ error: 'User not found' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
});

// POST /api/premium/activate — frontend calls this (auth middleware)
router.post('/activate', auth, async (req, res) => {
  const { userId, method, txId } = req.body;
  const PREMIUM_MONTHS = 4;
  try {
    await db.query(
      `UPDATE users SET is_premium = true, premium_until = NOW() + INTERVAL '${PREMIUM_MONTHS} months' WHERE id = $1`,
      [userId]
    );
    await db.query(
      `INSERT INTO payments (user_id, method, status, tx_id, confirmed_at) VALUES ($1, $2, 'confirmed', $3, NOW())`,
      [userId, method, txId || null]
    ).catch(() => {});
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
});

// POST /api/premium/stars
router.post('/stars', auth, async (req, res) => {
  const { userId, telegramPaymentId } = req.body;
  try {
    await db.query(
      `UPDATE users SET is_premium = true, premium_until = NOW() + INTERVAL '4 months' WHERE id = $1`,
      [userId]
    );
    await db.query(
      `INSERT INTO payments (user_id, method, amount, status, tx_id, confirmed_at) VALUES ($1, 'stars', 150, 'confirmed', $2, NOW())`,
      [userId, telegramPaymentId]
    ).catch(() => {});
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;
