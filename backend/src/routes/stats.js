const router = require('express').Router();
const db = require('../db');
const { cached } = require('../cache');
const auth = require('../middleware/auth');

router.get('/:userId', auth, async (req, res) => {
  const { userId } = req.params;

  try {
    const data = await cached(stats:\, 30, async () => {
      const { rows } = await db.query(
        SELECT s.*, l.xp_today, l.xp_total,
                (SELECT COUNT(*) FROM badges WHERE user_id = \) AS badge_count
         FROM user_stats s
         JOIN leaderboard l ON l.user_id = s.user_id
         WHERE s.user_id = \,
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
