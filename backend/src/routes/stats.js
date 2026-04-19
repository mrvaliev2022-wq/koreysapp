const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// ─── ADMIN SECRET middleware ───────────────────────────────────────────────
function adminAuth(req, res, next) {
  const secret = req.headers['x-admin-secret'] || req.query.secret;
  if (secret !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
}

// ─── GET /api/stats/admin  (Bot /stats command calls this) ────────────────
router.get('/admin', adminAuth, async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'

    const [
      totalUsers,
      premiumUsers,
      todayNew,
      todayActive,
      totalLessons,
      todayLessons,
      totalPayments,
      todayPayments,
      starsPayments,
      cardPayments
    ] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM users'),
      pool.query("SELECT COUNT(*) FROM users WHERE subscription_type = 'premium'"),
      pool.query('SELECT COUNT(*) FROM users WHERE DATE(created_at) = $1', [today]),
      pool.query('SELECT COUNT(*) FROM user_stats WHERE last_study_date = $1', [today]),
      pool.query('SELECT COALESCE(SUM(lessons_done),0) FROM user_stats'),
      pool.query(
        "SELECT COUNT(*) FROM user_stats WHERE last_study_date = $1",
        [today]
      ),
      pool.query('SELECT COUNT(*) FROM payments'),
      pool.query('SELECT COUNT(*) FROM payments WHERE DATE(created_at) = $1', [today]),
      pool.query("SELECT COUNT(*) FROM payments WHERE payment_type = 'stars'"),
      pool.query("SELECT COUNT(*) FROM payments WHERE payment_type = 'card'")
    ]);

    res.json({
      users: {
        total: parseInt(totalUsers.rows[0].count),
        premium: parseInt(premiumUsers.rows[0].count),
        today_new: parseInt(todayNew.rows[0].count),
        today_active: parseInt(todayActive.rows[0].count)
      },
      lessons: {
        total: parseInt(totalLessons.rows[0].coalesce),
        today: parseInt(todayLessons.rows[0].count)
      },
      payments: {
        total: parseInt(totalPayments.rows[0].count),
        today: parseInt(todayPayments.rows[0].count),
        stars: parseInt(starsPayments.rows[0].count),
        card: parseInt(cardPayments.rows[0].count)
      }
    });
  } catch (err) {
    console.error('Stats admin error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ─── GET /api/stats/admin/users ───────────────────────────────────────────
router.get('/admin/users', adminAuth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;

    const result = await pool.query(
      `SELECT u.id, u.telegram_id, u.first_name, u.username,
              u.subscription_type, u.created_at,
              COALESCE(s.xp, 0) as xp,
              COALESCE(s.streak, 0) as streak,
              COALESCE(s.lessons_done, 0) as lessons_done,
              s.last_study_date
       FROM users u
       LEFT JOIN user_stats s ON s.user_id = u.id
       ORDER BY u.created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const total = await pool.query('SELECT COUNT(*) FROM users');

    res.json({
      users: result.rows,
      total: parseInt(total.rows[0].count),
      limit,
      offset
    });
  } catch (err) {
    console.error('Stats admin/users error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ─── GET /api/stats/admin/premium ────────────────────────────────────────
router.get('/admin/premium', adminAuth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT u.id, u.telegram_id, u.first_name, u.username,
              u.subscription_type, u.subscription_expires_at, u.created_at
       FROM users u
       WHERE u.subscription_type = 'premium'
       ORDER BY u.subscription_expires_at DESC`
    );
    res.json({ premium_users: result.rows, total: result.rows.length });
  } catch (err) {
    console.error('Stats admin/premium error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ─── GET /api/stats/admin/payments ───────────────────────────────────────
router.get('/admin/payments', adminAuth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;

    const result = await pool.query(
      `SELECT p.*, u.first_name, u.username, u.telegram_id
       FROM payments p
       LEFT JOIN users u ON u.id = p.user_id
       ORDER BY p.created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const total = await pool.query('SELECT COUNT(*) FROM payments');

    res.json({
      payments: result.rows,
      total: parseInt(total.rows[0].count),
      limit,
      offset
    });
  } catch (err) {
    console.error('Stats admin/payments error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ─── GET /api/stats/admin/find?q=username_or_id ──────────────────────────
router.get('/admin/find', adminAuth, async (req, res) => {
  try {
    const q = req.query.q || '';
    const result = await pool.query(
      `SELECT u.id, u.telegram_id, u.first_name, u.last_name, u.username,
              u.subscription_type, u.subscription_expires_at, u.created_at,
              COALESCE(s.xp, 0) as xp,
              COALESCE(s.streak, 0) as streak,
              COALESCE(s.lessons_done, 0) as lessons_done
       FROM users u
       LEFT JOIN user_stats s ON s.user_id = u.id
       WHERE u.username ILIKE $1
          OR u.first_name ILIKE $1
          OR u.telegram_id::text = $2
       LIMIT 10`,
      [`%${q}%`, q]
    );
    res.json({ users: result.rows });
  } catch (err) {
    console.error('Stats admin/find error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ─── GET /api/stats/:userId  (individual user stats — keep for app) ───────
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Prevent "admin" string being treated as userId
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid userId' });
    }

    const result = await pool.query(
      `SELECT s.user_id, s.xp, s.streak, s.freeze_days, s.level,
              s.lessons_done, s.last_study_date
       FROM user_stats s
       WHERE s.user_id = $1`,
      [parseInt(userId)]
    );

    if (result.rows.length === 0) {
      return res.json({ xp: 0, streak: 0, freeze_days: 0, level: 1, lessons_done: 0 });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Stats userId error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
