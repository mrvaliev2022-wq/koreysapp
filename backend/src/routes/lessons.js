const router = require('express').Router();
const db = require('../db');
const { cached } = require('../cache');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const { track = 'TOPIK' } = req.query;
  const userId = req.telegramUser?.id;
  try {
    const { rows } = await db.query(
      'SELECT l.id, l.level, l.title_kr, l.title_uz, l.is_free, ' +
      'COALESCE(p.status, \'locked\') AS status, p.score ' +
      'FROM lessons l ' +
      'LEFT JOIN user_progress p ON p.lesson_id = l.id AND p.user_id = ' +
      '(SELECT id FROM users WHERE telegram_id = $1) ' +
      'WHERE l.track = $2 ORDER BY l.level',
      [userId, track]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

router.get('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const cacheKey = 'lesson:' + id;
    const lesson = await cached(cacheKey, 300, async () => {
      const { rows } = await db.query(
        'SELECT l.*, json_agg(row_to_json(q)) FILTER (WHERE q.id IS NOT NULL) AS quiz ' +
        'FROM lessons l ' +
        'LEFT JOIN quiz_questions q ON q.lesson_id = l.id ' +
        'WHERE l.id = $1 GROUP BY l.id',
        [id]
      );
      return rows[0] || null;
    });
    if (!lesson) return res.status(404).json({ error: 'Not found' });
    res.json(lesson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;
