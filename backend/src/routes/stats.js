const router = require('express').Router();
const db     = require('../db');
const { cached } = require('../cache');
const auth   = require('../middleware/auth');

// ── Admin auth middleware ─────────────────────────────────────────────────────
function adminAuth(req, res, next) {
  const key = req.headers['x-admin-key'];
  if (!key || key !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
}

// ── GET /api/stats/admin — umumiy statistika ──────────────────────────────────
router.get('/admin', adminAuth, async (req, res) => {
  try {
    const [
      totalUsers,
      premiumUsers,
      todayNew,
      todayActive,
      totalPayments,
      todayPayments,
      starsPayments,
      cardPayments,
      totalLessons,
      todayLessons,
    ] = await Promise.all([
      db.query('SELECT COUNT(*) AS cnt FROM users'),
      db.query('SELECT COUNT(*) AS cnt FROM users WHERE is_premium = true'),
      db.query("SELECT COUNT(*) AS cnt FROM users WHERE created_at >= CURRENT_DATE"),
      db.query("SELECT COUNT(DISTINCT user_id) AS cnt FROM user_progress WHERE updated_at >= CURRENT_DATE"),
      db.query("SELECT COUNT(*) AS cnt FROM payments WHERE status = 'confirmed'"),
      db.query("SELECT COUNT(*) AS cnt FROM payments WHERE status = 'confirmed' AND confirmed_at >= CURRENT_DATE"),
      db.query("SELECT COUNT(*) AS cnt FROM payments WHERE method = 'stars' AND status = 'confirmed'"),
      db.query("SELECT COUNT(*) AS cnt FROM payments WHERE method = 'card' AND status = 'confirmed'"),
      db.query("SELECT COUNT(*) AS cnt FROM user_progress WHERE status = 'completed'"),
      db.query("SELECT COUNT(*) AS cnt FROM user_progress WHERE status = 'completed' AND updated_at >= CURRENT_DATE"),
    ]);

    res.json({
      total_users:        parseInt(totalUsers.rows[0].cnt),
      premium_users:      parseInt(premiumUsers.rows[0].cnt),
      today_new:          parseInt(todayNew.rows[0].cnt),
      today_active:       parseInt(todayActive.rows[0].cnt),
      total_payments:     parseInt(totalPayments.rows[0].cnt),
      today_payments:     parseInt(todayPayments.rows[0].cnt),
      stars_payments:     parseInt(starsPayments.rows[0].cnt),
      card_payments:      parseInt(cardPayments.rows[0].cnt),
      total_lessons_done: parseInt(totalLessons.rows[0].cnt),
      today_lessons:      parseInt(todayLessons.rows[0].cnt),
    });
  } catch (err) {
    console.error('admin stats error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/stats/admin/users ────────────────────────────────────────────────
router.get('/admin/users', adminAuth, async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 10, 10000);
  try {
    const { rows } = await db.query(
      `SELECT id, telegram_id, name, username, is_premium, premium_until, created_at
       FROM users ORDER BY created_at DESC LIMIT $1`,
      [limit]
    );
    res.json({ users: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/stats/admin/premium ──────────────────────────────────────────────
router.get('/admin/premium', adminAuth, async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT id, telegram_id, name, username, premium_until
       FROM users WHERE is_premium = true ORDER BY premium_until DESC`
    );
    res.json({ users: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/stats/admin/payments ─────────────────────────────────────────────
router.get('/admin/payments', adminAuth, async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  try {
    const { rows } = await db.query(
      `SELECT p.id, p.method, p.status, p.confirmed_at, p.created_at,
              u.name, u.telegram_id
       FROM payments p
       LEFT JOIN users u ON u.id = p.user_id
       ORDER BY COALESCE(p.confirmed_at, p.created_at) DESC
       LIMIT $1`,
      [limit]
    );
    res.json({ payments: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/stats/admin/find ─────────────────────────────────────────────────
router.get('/admin/find', adminAuth, async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: 'q param required' });

  try {
    const isId = !isNaN(parseInt(q));
    const { rows } = await db.query(
      isId
        ? `SELECT u.*,
             (SELECT COUNT(*) FROM user_progress WHERE user_id = u.id AND status = 'completed') AS lessons_done,
             (SELECT COALESCE(SUM(xp), 0) FROM user_stats WHERE user_id = u.id) AS xp
           FROM users u WHERE u.telegram_id = $1`
        : `SELECT u.*,
             (SELECT COUNT(*) FROM user_progress WHERE user_id = u.id AND status = 'completed') AS lessons_done
           FROM users u WHERE u.name ILIKE $1 OR u.username ILIKE $1 LIMIT 1`,
      [isId ? parseInt(q) : '%' + q + '%']
    );
    res.json({ user: rows[0] || null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/stats/:userId — user stats (existing) ────────────────────────────
router.get('/:userId', auth, async (req, res) => {
  const { userId } = req.params;

  // Skip if admin route accidentally hits here
  if (userId === 'admin') return res.status(400).json({ error: 'Use /api/stats/admin' });

  try {
    const data = await cached(`stats:${userId}`, 30, async () => {
      const { rows } = await db.query(
        `SELECT s.*, l.xp_today, l.xp_total,
                (SELECT COUNT(*) FROM badges WHERE user_id = $1) AS badge_count
         FROM user_stats s
         JOIN leaderboard l ON l.user_id = s.user_id
         WHERE s.user_id = $1`,
        [userId]
      );
      return rows[0] || null;
    });

    if (!data) return res.status(404).json({ error: 'Not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;
