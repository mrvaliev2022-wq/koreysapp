const router = require('express').Router();
const db = require('../db');
const { redis } = require('../cache');
const auth = require('../middleware/auth');
const { checkAndAwardBadges } = require('../services/badges');

const XP = { lesson: 20, perfect: 30, game: 10 };

// POST /api/progress/complete
router.post('/complete', auth, async (req, res) => {
  const { userId, lessonId, score, isPerfect } = req.body;

  const client = await db.connect();
  try {
    await client.query('BEGIN');

    // 1. Mark lesson completed
    await client.query(
      `INSERT INTO user_progress (user_id, lesson_id, status, score, completed_at)
       VALUES ($1, $2, 'completed', $3, NOW())
       ON CONFLICT (user_id, lesson_id) DO UPDATE
         SET status = 'completed', score = EXCLUDED.score, completed_at = NOW()`,
      [userId, lessonId, score]
    );

    // 2. Award XP
    const xpGain = isPerfect ? XP.perfect : XP.lesson;
    await client.query(
      `UPDATE user_stats
       SET xp = xp + $1,
           lessons_done = lessons_done + 1,
           last_study_date = CURRENT_DATE,
           streak = CASE
             WHEN last_study_date = CURRENT_DATE - 1 THEN streak + 1
             WHEN last_study_date = CURRENT_DATE THEN streak
             ELSE 1 END
       WHERE user_id = $2`,
      [xpGain, userId]
    );

    // 3. Update leaderboard
    await client.query(
      `UPDATE leaderboard
       SET xp_today = xp_today + $1, xp_total = xp_total + $1, updated_at = NOW()
       WHERE user_id = $2`,
      [xpGain, userId]
    );

    // 4. Unlock next lesson — ONLY if next lesson is_free OR user is premium
    const { rows: [nextLesson] } = await client.query(
      `SELECT l.id, l.is_free FROM lessons l
       WHERE l.track = (SELECT track FROM lessons WHERE id = $1)
         AND l.id = (
           SELECT id FROM lessons
           WHERE track = (SELECT track FROM lessons WHERE id = $1)
             AND level > (SELECT level FROM lessons WHERE id = $1)
           ORDER BY level ASC LIMIT 1
         )`,
      [lessonId]
    );

    // Check if user is premium
    const { rows: [userRow] } = await client.query(
      `SELECT is_premium FROM users WHERE id = $1`,
      [userId]
    );
    const isPremium = userRow?.is_premium || false;

    // STRICT: only unlock if next lesson is free OR user is premium
    if (nextLesson && (nextLesson.is_free === true || isPremium === true)) {
      await client.query(
        `INSERT INTO user_progress (user_id, lesson_id, status)
         VALUES ($1, $2, 'unlocked')
         ON CONFLICT (user_id, lesson_id) DO NOTHING`,
        [userId, nextLesson.id]
      );
    }
    // If not free and not premium — do NOT unlock. User must buy premium.

    await client.query('COMMIT');

    // Invalidate cache
    await redis.del(`lessons:TOPIK:${userId}`);
    await redis.del(`lessons:EPS-TOPIK:${userId}`);

    // Check badges (async, non-blocking)
    const newBadges = await checkAndAwardBadges(userId, { isPerfect });

    res.json({ xpGain, nextLessonId: nextLesson?.id, newBadges });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  } finally {
    client.release();
  }
});

module.exports = router;
