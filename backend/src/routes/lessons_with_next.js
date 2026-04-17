const router = require('express').Router();
const db = require('../db');
const { cached } = require('../cache');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  const { track = 'TOPIK' } = req.query;
  let userId = null;
  try {
    const initData = req.headers['x-telegram-init-data'];
    if (initData) {
      const params = new URLSearchParams(initData);
      const user = JSON.parse(params.get('user') || '{}');
      userId = user.id || null;
    }
  } catch (e) {}
  try {
    const { rows } = await db.query(
      'SELECT l.id, l.level, l.title_kr, l.title_uz, l.is_free, l.track, ' +
      'COALESCE(p.status, CASE WHEN l.is_free THEN \'unlocked\' ELSE \'locked\' END) AS status, p.score ' +
      'FROM lessons l ' +
      'LEFT JOIN user_progress p ON p.lesson_id = l.id AND p.user_id = (SELECT id FROM users WHERE telegram_id = $1) ' +
      'WHERE l.track = $2 ORDER BY l.level, l.id',
      [userId, track]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

router.get('/:id/next', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows: [current] } = await db.query(
      'SELECT track, level FROM lessons WHERE id = $1', [id]
    );
    if (!current) return res.json({ next: null });

    const { rows: [next] } = await db.query(
      'SELECT id, title_kr, title_uz, level FROM lessons ' +
      'WHERE track = $1 AND level != 0 AND (level > $2 OR (level = $2 AND id > $3)) ' +
      'ORDER BY level ASC, id ASC LIMIT 1',
      [current.track, current.level, id]
    );
    res.json({ next: next || null });
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
});

router.get('/:id', async (req, res) => {
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
