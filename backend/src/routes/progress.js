const router = require('express').Router();
const db = require('../db');
const { redis } = require('../cache');
const auth = require('../middleware/auth');
const { checkAndAwardBadges } = require('../services/badges');

const XP = { lesson: 20, perfect: 30 };

router.post('/complete', auth, async (req, res) => {
  const { userId, lessonId, score, isPerfect } = req.body;
  const client = await db.connect();

  try {
    await client.query('BEGIN');

    await client.query(
      INSERT INTO user_progress (user_id, lesson_id, status, score, completed_at)
       VALUES (\, \, 'completed', \, NOW())
       ON CONFLICT (user_id, lesson_id) DO UPDATE
         SET status = 'completed', score = EXCLUDED.score, completed_at = NOW(),
      [userId, lessonId, score]
    );

    const xpGain = isPerfect ? XP.perfect : XP.lesson;

    await client.query(
      UPDATE user_stats
       SET xp = xp + \,
           lessons_done = lessons_done + 1,
           last_study_date = CURRENT_DATE,
           streak = CASE
             WHEN last_study_date = CURRENT_DATE - 1 THEN streak + 1
             WHEN last_study_date = CURRENT_DATE THEN streak
             ELSE 1 END
       WHERE user_id = \,
      [xpGain, userId]
    );

    await client.query(
      UPDATE leaderboard
       SET xp_today = xp_today + \, xp_total = xp_total + \, updated_at = NOW()
       WHERE user_id = \,
      [xpGain, userId]
    );

    const { rows: [nextLesson] } = await client.query(
      SELECT id FROM lessons WHERE track = (
         SELECT track FROM lessons WHERE id = \
       ) AND level = (SELECT level FROM lessons WHERE id = \) + 1,
      [lessonId]
    );

    if (nextLesson) {
      await client.query(
        INSERT INTO user_progress (user_id, lesson_id, status)
         VALUES (\, \, 'unlocked')
         ON CONFLICT (user_id, lesson_id) DO NOTHING,
        [userId, nextLesson.id]
      );
    }

    await client.query('COMMIT');

    await redis.del(lessons:TOPIK:\);
    await redis.del(lessons:EPS-TOPIK:\);

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
