# Fix all backend route files

# 1. middleware/auth.js
$auth = @'
const crypto = require('crypto');

function verifyTelegramWebApp(initData, botToken) {
  const params = new URLSearchParams(initData);
  const hash = params.get('hash');
  params.delete('hash');
  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join('\n');
  const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest();
  const expectedHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');
  return expectedHash === hash;
}

module.exports = async function authMiddleware(req, res, next) {
  const initData = req.headers['x-telegram-init-data'];
  if (!initData) return res.status(401).json({ error: 'No auth' });
  if (!verifyTelegramWebApp(initData, process.env.BOT_TOKEN)) {
    return res.status(401).json({ error: 'Invalid Telegram auth' });
  }
  const params = new URLSearchParams(initData);
  const user = JSON.parse(params.get('user') || '{}');
  req.telegramUser = user;
  next();
};
'@
Set-Content "D:\1KOREYSTILI_TG\backend\src\middleware\auth.js" -Value $auth -Encoding UTF8
Write-Host "OK middleware/auth.js" -ForegroundColor Green

# 2. routes/auth.js
$routeAuth = @'
const router = require('express').Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.post('/login', auth, async (req, res) => {
  const { id, first_name, last_name, username } = req.telegramUser;
  const name = [first_name, last_name].filter(Boolean).join(' ');
  try {
    const { rows } = await db.query(
      `INSERT INTO users (telegram_id, name, username)
       VALUES ($1, $2, $3)
       ON CONFLICT (telegram_id) DO UPDATE
         SET name = EXCLUDED.name, username = EXCLUDED.username
       RETURNING id, telegram_id, name, username, is_premium, premium_until`,
      [id, name, username || null]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;
'@
Set-Content "D:\1KOREYSTILI_TG\backend\src\routes\auth.js" -Value $routeAuth -Encoding UTF8
Write-Host "OK routes/auth.js" -ForegroundColor Green

# 3. routes/lessons.js
$lessons = @'
const router = require('express').Router();
const db = require('../db');
const { cached } = require('../cache');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const { track = 'TOPIK' } = req.query;
  const userId = req.telegramUser?.id;
  try {
    const { rows } = await db.query(
      `SELECT l.id, l.level, l.title_kr, l.title_uz, l.is_free,
              COALESCE(p.status, 'locked') AS status, p.score
       FROM lessons l
       LEFT JOIN user_progress p ON p.lesson_id = l.id AND p.user_id = (
         SELECT id FROM users WHERE telegram_id = $1
       )
       WHERE l.track = $2
       ORDER BY l.level`,
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
    const lesson = await cached(`lesson:${id}`, 300, async () => {
      const { rows } = await db.query(
        `SELECT l.*,
                json_agg(row_to_json(q)) FILTER (WHERE q.id IS NOT NULL) AS quiz
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

module.exports = router;
'@
Set-Content "D:\1KOREYSTILI_TG\backend\src\routes\lessons.js" -Value $lessons -Encoding UTF8
Write-Host "OK routes/lessons.js" -ForegroundColor Green

# 4. routes/progress.js
$progress = @'
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
      `INSERT INTO user_progress (user_id, lesson_id, status, score, completed_at)
       VALUES ($1, $2, 'completed', $3, NOW())
       ON CONFLICT (user_id, lesson_id) DO UPDATE
         SET status = 'completed', score = EXCLUDED.score, completed_at = NOW()`,
      [userId, lessonId, score]
    );
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
    await client.query(
      `UPDATE leaderboard
       SET xp_today = xp_today + $1, xp_total = xp_total + $1, updated_at = NOW()
       WHERE user_id = $2`,
      [xpGain, userId]
    );
    const { rows: [nextLesson] } = await client.query(
      `SELECT id FROM lessons WHERE track = (
         SELECT track FROM lessons WHERE id = $1
       ) AND level = (SELECT level FROM lessons WHERE id = $1) + 1`,
      [lessonId]
    );
    if (nextLesson) {
      await client.query(
        `INSERT INTO user_progress (user_id, lesson_id, status)
         VALUES ($1, $2, 'unlocked')
         ON CONFLICT (user_id, lesson_id) DO NOTHING`,
        [userId, nextLesson.id]
      );
    }
    await client.query('COMMIT');
    await redis.del(`lessons:TOPIK:${userId}`);
    await redis.del(`lessons:EPS-TOPIK:${userId}`);
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
'@
Set-Content "D:\1KOREYSTILI_TG\backend\src\routes\progress.js" -Value $progress -Encoding UTF8
Write-Host "OK routes/progress.js" -ForegroundColor Green

# 5. routes/leaderboard.js
$leaderboard = @'
const router = require('express').Router();
const db = require('../db');
const { cached } = require('../cache');

router.get('/', async (req, res) => {
  const { type = 'daily', limit = 100 } = req.query;
  const xpCol = type === 'daily' ? 'xp_today' : 'xp_total';
  try {
    const data = await cached(`leaderboard:${type}`, 30, async () => {
      const { rows } = await db.query(
        `SELECT u.name, u.username, l.${xpCol} AS xp,
                RANK() OVER (ORDER BY l.${xpCol} DESC) AS rank
         FROM leaderboard l
         JOIN users u ON u.id = l.user_id
         ORDER BY l.${xpCol} DESC
         LIMIT $1`,
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
'@
Set-Content "D:\1KOREYSTILI_TG\backend\src\routes\leaderboard.js" -Value $leaderboard -Encoding UTF8
Write-Host "OK routes/leaderboard.js" -ForegroundColor Green

# 6. routes/premium.js
$premium = @'
const router = require('express').Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.post('/activate', auth, async (req, res) => {
  const { userId, method, txId } = req.body;
  try {
    await db.query(
      `UPDATE users
       SET is_premium = true, premium_until = NOW() + INTERVAL '7 months'
       WHERE id = $1`,
      [userId]
    );
    await db.query(
      `INSERT INTO payments (user_id, method, status, tx_id, confirmed_at)
       VALUES ($1, $2, 'confirmed', $3, NOW())`,
      [userId, method, txId || null]
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
});

router.post('/stars', async (req, res) => {
  const { telegramId, telegramPaymentId } = req.body;
  try {
    await db.query(
      `UPDATE users SET is_premium = true, premium_until = NOW() + INTERVAL '1 month'
       WHERE telegram_id = $1`,
      [telegramId]
    );
    await db.query(
      `INSERT INTO payments (user_id, method, amount, status, tx_id, confirmed_at)
       SELECT id, 'stars', 150, 'confirmed', $1, NOW() FROM users WHERE telegram_id = $2`,
      [telegramPaymentId, telegramId]
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;
'@
Set-Content "D:\1KOREYSTILI_TG\backend\src\routes\premium.js" -Value $premium -Encoding UTF8
Write-Host "OK routes/premium.js" -ForegroundColor Green

# 7. routes/stats.js
$stats = @'
const router = require('express').Router();
const db = require('../db');
const { cached } = require('../cache');
const auth = require('../middleware/auth');

router.get('/:userId', auth, async (req, res) => {
  const { userId } = req.params;
  try {
    const data = await cached(`stats:${userId}`, 30, async () => {
      const { rows } = await db.query(
        `SELECT s.*, l.xp_today, l.xp_total,
                (SELECT COUNT(*) FROM badges WHERE user_id = $1) AS badge_count
         FROM user_stats s
         JOIN leaderboard l ON l.user_id = s.user_id
         WHERE s.user_id = $1`,
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
'@
Set-Content "D:\1KOREYSTILI_TG\backend\src\routes\stats.js" -Value $stats -Encoding UTF8
Write-Host "OK routes/stats.js" -ForegroundColor Green

Write-Host ""
Write-Host "Barcha fayllar to'g'rilandi!" -ForegroundColor Cyan
