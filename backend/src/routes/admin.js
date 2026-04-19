// backend/src/routes/admin.js
const router = require('express').Router();
const db = require('../db');

function adminAuth(req, res, next) {
  const key = req.headers['x-admin-key'] || req.headers['x-admin-secret'];
  if (key !== process.env.ADMIN_SECRET && key !== 'koreysapp_admin_2026') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
}

// GET /api/stats/admin — umumiy statistika
router.get('/admin', adminAuth, async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);

    const [
      total,
      premium,
      todayNew,
      todayActive,
      totalPayments,
      todayPayments,
      starsPayments,
      cardPayments,
      totalLessons,
      todayLessons
    ] = await Promise.all([
      db.query('SELECT COUNT(*) FROM users'),
      db.query('SELECT COUNT(*) FROM users WHERE is_premium = true'),
      db.query('SELECT COUNT(*) FROM users WHERE DATE(created_at) = $1', [today]),
      db.query('SELECT COUNT(*) FROM user_stats WHERE last_study_date = $1', [today]),
      db.query("SELECT COUNT(*) FROM payments WHERE status = 'confirmed'"),
      db.query("SELECT COUNT(*) FROM payments WHERE status = 'confirmed' AND DATE(confirmed_at) = $1", [today]),
      db.query("SELECT COUNT(*) FROM payments WHERE method = 'stars' AND status = 'confirmed'"),
      db.query("SELECT COUNT(*) FROM payments WHERE method = 'card' AND status = 'confirmed'"),
      db.query("SELECT COALESCE(SUM(lessons_done), 0) FROM user_stats"),
      db.query("SELECT COUNT(*) FROM user_stats WHERE last_study_date = $1", [today]),
    ]);

    res.json({
      total_users:        parseInt(total.rows[0].count),
      premium_users:      parseInt(premium.rows[0].count),
      today_new:          parseInt(todayNew.rows[0].count),
      today_active:       parseInt(todayActive.rows[0].count),
      total_payments:     parseInt(totalPayments.rows[0].count),
      today_payments:     parseInt(todayPayments.rows[0].count),
      stars_payments:     parseInt(starsPayments.rows[0].count),
      card_payments:      parseInt(cardPayments.rows[0].count),
      total_lessons_done: parseInt(totalLessons.rows[0].coalesce),
      today_lessons:      parseInt(todayLessons.rows[0].count),
    });
  } catch (err) {
    console.error('Admin stats error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/stats/admin/users
router.get('/admin/users', adminAuth, async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 10, 10000);
  try {
    const { rows } = await db.query(
      `SELECT u.id, u.telegram_id, u.name, u.username,
              u.is_premium, u.premium_until, u.created_at,
              COALESCE(s.xp, 0) as xp,
              COALESCE(s.lessons_done, 0) as lessons_done,
              COALESCE(s.streak, 0) as streak
       FROM users u
       LEFT JOIN user_stats s ON s.user_id = u.id
       ORDER BY u.created_at DESC LIMIT $1`,
      [limit]
    );
    res.json({ users: rows });
  } catch (err) {
    console.error('Admin users error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/stats/admin/premium
router.get('/admin/premium', adminAuth, async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT id, telegram_id, name, username, premium_until
       FROM users WHERE is_premium = true
       ORDER BY premium_until DESC`
    );
    res.json({ users: rows });
  } catch (err) {
    console.error('Admin premium error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/stats/admin/payments
router.get('/admin/payments', adminAuth, async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  try {
    const { rows } = await db.query(
      `SELECT p.*, u.name, u.telegram_id
       FROM payments p
       LEFT JOIN users u ON u.id = p.user_id
       ORDER BY p.created_at DESC LIMIT $1`,
      [limit]
    );
    res.json({ payments: rows });
  } catch (err) {
    console.error('Admin payments error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/stats/admin/find
router.get('/admin/find', adminAuth, async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: 'q kerak' });
  try {
    const isId = !isNaN(parseInt(q));
    const { rows } = await db.query(
      isId
        ? `SELECT u.*,
                  COALESCE(s.lessons_done, 0) as lessons_done,
                  COALESCE(s.xp, 0) as xp,
                  COALESCE(s.streak, 0) as streak
           FROM users u
           LEFT JOIN user_stats s ON s.user_id = u.id
           WHERE u.telegram_id = $1`
        : `SELECT u.*,
                  COALESCE(s.lessons_done, 0) as lessons_done,
                  COALESCE(s.xp, 0) as xp
           FROM users u
           LEFT JOIN user_stats s ON s.user_id = u.id
           WHERE u.name ILIKE $1 OR u.username ILIKE $1 LIMIT 1`,
      [isId ? parseInt(q) : '%' + q + '%']
    );
    res.json({ user: rows[0] || null });
  } catch (err) {
    console.error('Admin find error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/premium/revoke
router.post('/revoke', adminAuth, async (req, res) => {
  const { telegramId } = req.body;
  try {
    await db.query(
      'UPDATE users SET is_premium = false, premium_until = NULL WHERE telegram_id = $1',
      [telegramId]
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
