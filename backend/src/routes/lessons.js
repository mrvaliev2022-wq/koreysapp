const router = require('express').Router();
const db = require('../db');
const { cached } = require('../cache');
const auth = require('../middleware/auth');

// GET /api/lessons?track=TOPIK
router.get('/', auth, async (req, res) => {
  const { track = 'TOPIK' } = req.query;
  const userId = req.user?.id;

  try {
    const lessons = await cached(`lessons:${track}:${userId}`, 60, async () => {
      const { rows } = await db.query(
        `SELECT l.id, l.level, l.title_kr, l.title_uz, l.is_free,
                COALESCE(p.status, 'locked') AS status,
                p.score
         FROM lessons l
         LEFT JOIN user_progress p ON p.lesson_id = l.id AND p.user_id = $1
         WHERE l.track = $2
         ORDER BY l.level`,
        [userId, track]
      );
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

    // Get next lesson
    const { rows: [next] } = await db.query(
      'SELECT id, title_kr, title_uz, is_free FROM lessons WHERE track = $1 AND level = $2 ORDER BY id LIMIT 1',
      [current.track, current.level + 1]
    );
    if (!next) return res.json({ next: null });

    // Check if user can access next lesson
    const { rows: [user] } = await db.query(
      'SELECT is_premium FROM users WHERE id = $1',
      [userId]
    );
    const isPremium = user?.is_premium || false;

    if (!next.is_free && !isPremium) {
      // User is not premium and next lesson is locked
      return res.json({ next: null, locked: true, requiresPremium: true });
    }

    return res.json({ next });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;
