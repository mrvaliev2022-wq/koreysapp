const router = require('express').Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.post('/login', auth, async (req, res) => {
  const { id, first_name, last_name, username } = req.telegramUser;
  const name = [first_name, last_name].filter(Boolean).join(' ');

  try {
    const { rows } = await db.query(
      INSERT INTO users (telegram_id, name, username)
       VALUES (\, \, \)
       ON CONFLICT (telegram_id) DO UPDATE
         SET name = EXCLUDED.name, username = EXCLUDED.username
       RETURNING id, telegram_id, name, username, is_premium, premium_until,
      [id, name, username || null]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;
