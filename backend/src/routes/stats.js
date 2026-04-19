const router = require('express').Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.get('/admin', async (req, res) => {
  const key = req.headers['x-admin-key'] || req.headers['x-admin-secret'];
  if (key !== process.env.ADMIN_SECRET) return res.status(403).json({ error: 'Forbidden' });
  try {
    const [users, premium, todayNew, payments, todayPay, stars, card, lessons, todayLessons] = await Promise.all([
      db.query('SELECT COUNT(*) AS cnt FROM users'),
      db.query('SELECT COUNT(*) AS cnt FROM users WHERE is_premium = true'),
      db.query("SELECT COUNT(*) AS cnt FROM users WHERE created_at >= NOW() - INTERVAL '1 day'"),
      db.query('SELECT COUNT(*) AS cnt FROM payments'),
      db.query("SELECT COUNT(*) AS cnt FROM payments WHERE confirmed_at >= NOW() - INTERVAL '1 day'"),
      db.query("SELECT COUNT(*) AS cnt FROM payments WHERE method = 'stars'"),
      db.query("SELECT COUNT(*) AS cnt FROM payments WHERE method = 'card'"),
      db.query('SELECT COALESCE(SUM(lessons_done),0) AS cnt FROM user_stats'),
      db.query("SELECT COUNT(*) AS cnt FROM user_progress WHERE status = 'completed'"),
    ]);
    res.json({
      total_users: parseInt(users.rows[0].cnt),
      premium_users: parseInt(premium.rows[0].cnt),
      today_new: parseInt(todayNew.rows[0].cnt),
      today_active: 0,
      total_payments: parseInt(payments.rows[0].cnt),
      today_payments: parseInt(todayPay.rows[0].cnt),
      stars_payments: parseInt(stars.rows[0].cnt),
      card_payments: parseInt(card.rows[0].cnt),
      total_lessons_done: parseInt(lessons.rows[0].cnt),
      today_lessons: parseInt(todayLessons.rows[0].cnt),
    });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/admin/users', async (req, res) => {
  const key = req.headers['x-admin-key'] || req.headers['x-admin-secret'];
  if (key !== process.env.ADMIN_SECRET) return res.status(403).json({ error: 'Forbidden' });
  const limit = Math.min(parseInt(req.query.limit) || 10, 10000);
  try {
    const { rows } = await db.query(
      `SELECT u.id, u.telegram_id, u.name, u.username, u.is_premium, u.premium_until, u.created_at,
              COALESCE(s.lessons_done,0) AS lessons_done, COALESCE(s.xp,0) AS xp
       FROM users u LEFT JOIN user_stats s ON s.user_id=u.id ORDER BY u.created_at DESC LIMIT $1`, [limit]);
    res.json({ users: rows });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/admin/premium', async (req, res) => {
  const key = req.headers['x-admin-key'] || req.headers['x-admin-secret'];
  if (key !== process.env.ADMIN_SECRET) return res.status(403).json({ error: 'Forbidden' });
  try {
    const { rows } = await db.query(
      'SELECT u.telegram_id, u.name, u.username, u.premium_until, u.created_at FROM users u WHERE u.is_premium=true ORDER BY u.premium_until DESC');
    res.json({ users: rows });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/admin/payments', async (req, res) => {
  const key = req.headers['x-admin-key'] || req.headers['x-admin-secret'];
  if (key !== process.env.ADMIN_SECRET) return res.status(403).json({ error: 'Forbidden' });
  const limit = parseInt(req.query.limit) || 10;
  try {
    const { rows } = await db.query(
      `SELECT p.*, u.name, u.telegram_id FROM payments p LEFT JOIN users u ON u.id=p.user_id ORDER BY p.confirmed_at DESC NULLS LAST LIMIT $1`, [limit]);
    res.json({ payments: rows });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/admin/find', async (req, res) => {
  const key = req.headers['x-admin-key'] || req.headers['x-admin-secret'];
  if (key !== process.env.ADMIN_SECRET) return res.status(403).json({ error: 'Forbidden' });
  const q = req.query.q || '';
  try {
    const isId = /^\d+$/.test(q);
    const { rows } = await db.query(
      isId
        ? 'SELECT u.*, COALESCE(s.lessons_done,0) AS lessons_done FROM users u LEFT JOIN user_stats s ON s.user_id=u.id WHERE u.telegram_id=$1'
        : 'SELECT u.*, COALESCE(s.lessons_done,0) AS lessons_done FROM users u LEFT JOIN user_stats s ON s.user_id=u.id WHERE u.name ILIKE $1 OR u.username ILIKE $1',
      isId ? [parseInt(q)] : [`%${q}%`]);
    res.json({ user: rows[0] || null });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:userId', auth, async (req, res) => {
  const { userId } = req.params;
  if (userId === 'admin') return res.status(403).json({ error: 'Forbidden' });
  try {
    const { rows } = await db.query(
      `SELECT s.xp, s.streak, s.lessons_done, s.freeze_days,
              COALESCE(l.xp_total, s.xp) AS xp_total, 0 AS xp_today
       FROM user_stats s LEFT JOIN leaderboard l ON l.user_id=s.user_id WHERE s.user_id=$1`, [userId]);
    res.json(rows[0] || { xp:0, streak:0, lessons_done:0, freeze_days:0, xp_today:0, xp_total:0 });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
