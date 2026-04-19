const router = require('express').Router();
const db     = require('../db');
const { cached } = require('../cache');
const auth   = require('../middleware/auth');

// GET /api/stats/admin — admin statistics (x-admin-key required)
router.get('/admin', async (req, res) => {
  const key = req.headers['x-admin-key'];
  if (key !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    const { rows: [stats] } = await db.query(`
      SELECT
        (SELECT COUNT(*) FROM users)                                      AS total_users,
        (SELECT COUNT(*) FROM users WHERE is_premium = true)             AS premium_users,
        (SELECT COUNT(*) FROM users WHERE created_at >= NOW() - INTERVAL '1 day') AS today_new,
        (SELECT COUNT(DISTINCT user_id) FROM user_stats
          WHERE updated_at >= NOW() - INTERVAL '1 day')                  AS today_active,
        (SELECT COUNT(*) FROM payments)                                  AS total_payments,
        (SELECT COUNT(*) FROM payments WHERE confirmed_at >= NOW() - INTERVAL '1 day') AS today_payments,
        (SELECT COUNT(*) FROM payments WHERE method = 'stars')           AS stars_payments,
        (SELECT COUNT(*) FROM payments WHERE method = 'card')            AS card_payments,
        (SELECT COALESCE(SUM(lessons_done), 0) FROM user_stats)         AS total_lessons_done,
        (SELECT COUNT(*) FROM user_progress
          WHERE updated_at >= NOW() - INTERVAL '1 day')                  AS today_lessons
    `);
    res.json(stats);
  } catch (err) {
    console.error('Admin stats error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/stats/admin/users?limit=10
router.get('/admin/users', async (req, res) => {
  const key = req.headers['x-admin-key'];
  if (key !== process.env.ADMIN_SECRET) return res.status(403).json({ error: 'Forbidden' });
  const limit = Math.min(parseInt(req.query.limit) || 10, 10000);
  try {
    const { rows } = await db.query(
      `SELECT u.id, u.telegram_id, u.name, u.username, u.is_premium, u.premium_until, u.created_at,
              COALESCE(s.lessons_done, 0) AS lessons_done,
              COALESCE(s.xp, 0) AS xp
       FROM users u
       LEFT JOIN user_stats s ON s.user_id = u.id
       ORDER BY u.created_at DESC
       LIMIT $1`,
      [limit]
    );
    res.json({ users: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/stats/admin/premium
router.get('/admin/premium', async (req, res) => {
  const key = req.headers['x-admin-key'];
  if (key !== process.env.ADMIN_SECRET) return res.status(403).json({ error: 'Forbidden' });
  try {
    const { rows } = await db.query(
      `SELECT u.telegram_id, u.name, u.username, u.premium_until, u.created_at
       FROM users u
       WHERE u.is_premium = true
       ORDER BY u.premium_until DESC`
    );
    res.json({ users: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/stats/admin/payments?limit=10
router.get('/admin/payments', async (req, res) => {
  const key = req.headers['x-admin-key'];
  if (key !== process.env.ADMIN_SECRET) return res.status(403).json({ error: 'Forbidden' });
  const limit = parseInt(req.query.limit) || 10;
  try {
    const { rows } = await db.query(
      `SELECT p.*, u.name, u.telegram_id
       FROM payments p
       LEFT JOIN users u ON u.id = p.user_id
       ORDER BY p.created_at DESC
       LIMIT $1`,
      [limit]
    );
    res.json({ payments: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/stats/admin/find?q=...
router.get('/admin/find', async (req, res) => {
  const key = req.headers['x-admin-key'];
  if (key !== process.env.ADMIN_SECRET) return res.status(403).json({ error: 'Forbidden' });
  const q = req.query.q || '';
  try {
    const isId = /^\d+$/.test(q);
    const { rows } = await db.query(
      isId
        ? `SELECT u.*, COALESCE(s.lessons_done,0) AS lessons_done FROM users u LEFT JOIN user_stats s ON s.user_id=u.id WHERE u.telegram_id=$1`
        : `SELECT u.*, COALESCE(s.lessons_done,0) AS lessons_done FROM users u LEFT JOIN user_stats s ON s.user_id=u.id WHERE u.name ILIKE $1 OR u.username ILIKE $1`,
      isId ? [parseInt(q)] : [`%${q}%`]
    );
    res.json({ user: rows[0] || null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/stats/:userId — user personal stats
router.get('/:userId', auth, async (req, res) => {
  const { userId } = req.params;
  if (userId === 'admin') return res.status(403).json({ error: 'Forbidden' });
  try {
    const data = await cached(`stats:${userId}`, 30, async () => {
      const { rows } = await db.query(
        `SELECT s.xp, s.streak, s.lessons_done, s.freeze_days,
                COALESCE(l.xp_today, 0) AS xp_today,
                COALESCE(l.xp_total, s.xp) AS xp_total
         FROM user_stats s
         LEFT JOIN leaderboard l ON l.user_id = s.user_id
         WHERE s.user_id = $1`,
        [userId]
      );
      return rows[0] || { xp: 0, streak: 0, lessons_done: 0, freeze_days: 0, xp_today: 0, xp_total: 0 };
    });
    res.json(data);
  } catch (err) {
    console.error('Stats error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
