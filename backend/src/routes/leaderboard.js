const router = require('express').Router();
const db = require('../db');
const { cached } = require('../cache');

router.get('/', async (req, res) => {
  const { type = 'daily', limit = 100 } = req.query;
  const xpCol = type === 'daily' ? 'xp_today' : 'xp_total';

  try {
    const data = await cached(leaderboard:\, 30, async () => {
      const { rows } = await db.query(
        SELECT u.name, u.username, l.\ AS xp,
                RANK() OVER (ORDER BY l.\ DESC) AS rank
         FROM leaderboard l
         JOIN users u ON u.id = l.user_id
         ORDER BY l.\ DESC
         LIMIT \,
        [limit]
      );
      return rows;
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;
