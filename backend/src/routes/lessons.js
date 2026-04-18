const router = require('express').Router();
const db = require('../db');
const { cached } = require('../cache');
const auth = require('../middleware/auth');

// GET /api/lessons?track=TOPIK
router.get('/', auth, async (req, res) => {
  const { track = 'TOPIK' } = req.query;
  const userId = req.user?.id;

  try {
    const cacheKey = userId ? `lessons:${track}:${userId}` : `lessons:${track}:guest`;
    const lessons = await cached(cacheKey, 60, async () => {
      let rows;
      if (userId) {
        const result = await db.query(
          `SELECT l.id, l.level, l.title_kr, l.title_uz, l.is_free,
                  COALESCE(p.status, CASE WHEN l.is_free THEN 'unlocked' ELSE 'locked' END) AS status,
                  p.score
           FROM lessons l
           LEFT JOIN user_progress p ON p.lesson_id = l.id AND p.user_id = $1
           WHERE l.track = $2
           ORDER BY l.level`,
          [userId, track]
        );
        rows = result.rows;
      } else {
        // Guest: show all lessons, free ones unlocked
        const result = await db.query(
          `SELECT id, level, title_kr, title_uz, is_free,
                  CASE WHEN is_free THEN 'unlocked' ELSE 'locked' END AS status,
                  NULL as score
           FROM lessons
           WHERE track = $1
           ORDER BY level`,
          [track]
        );
        rows = result.rows;
      }
      return rows;
    });
    res.json(lessons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// GET /api/lessons/:id — full lesson content
router.get('/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const lesson = await cached(`lesson:${id}`, 300, async () => {
      const { rows } = await db.query(
        `SELECT l.*, 
                array_agg(row_to_json(q)) FILTER (WHERE q.id IS NOT NULL) AS quiz
         FROM lessons l
         LEFT JOIN quiz_questions q ON q.lesson_id = l.id
         WHERE l.id = $1
         GROUP BY l.id`,
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

// GET /api/lessons/:id/next
router.get('/:id/next', auth, async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;

  try {
    // Get current lesson track and level
    const { rows: [current] } = await db.query(
      'SELECT track, level FROM lessons WHERE id = $1',
      [id]
    );
    if (!current) return res.json({ next: null });

    // Get next lesson (by level order)
    const { rows: [next] } = await db.query(
      `SELECT id, title_kr, title_uz, is_free FROM lessons
       WHERE track = $1 AND level > $2 ORDER BY level ASC LIMIT 1`,
      [current.track, current.level]
    );
    if (!next) return res.json({ next: null });

    // Check premium
    const isPremium = userId
      ? (await db.query('SELECT is_premium FROM users WHERE id = $1', [userId])).rows[0]?.is_premium || false
      : false;

    // STRICT: if next lesson is NOT free and user is NOT premium → block
    if (!next.is_free && !isPremium) {
      return res.json({ next: null, locked: true, requiresPremium: true });
    }

    return res.json({ next });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;
