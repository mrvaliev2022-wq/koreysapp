const db = require('../db');

const BADGE_RULES = [
  { type: 'first_lesson',  check: (s) => s.lessons_done >= 1 },
  { type: '10_lessons',    check: (s) => s.lessons_done >= 10 },
  { type: '50_lessons',    check: (s) => s.lessons_done >= 50 },
  { type: 'streak_7',      check: (s) => s.streak >= 7 },
  { type: 'streak_30',     check: (s) => s.streak >= 30 },
  { type: 'perfect_score', check: (s, e) => e && e.isPerfect },
  { type: 'top_10',        check: (s, e) => e && e.rank <= 10 },
  { type: 'early_bird',    check: () => { const h = new Date().getHours(); return h >= 5 && h <= 8; } },
  { type: 'night_owl',     check: () => { const h = new Date().getHours(); return h >= 22 || h <= 2; } },
];

async function checkAndAwardBadges(userId, extra) {
  if (!extra) extra = {};
  const r1 = await db.query('SELECT * FROM user_stats WHERE user_id = $1', [userId]);
  const r2 = await db.query('SELECT badge_type FROM badges WHERE user_id = $1', [userId]);
  const stats = r1.rows[0];
  const existing = r2.rows;
  if (!stats) return [];
  const earned = new Set(existing.map(function(b) { return b.badge_type; }));
  const newBadges = BADGE_RULES
    .filter(function(r) { return !earned.has(r.type) && r.check(stats, extra); })
    .map(function(r) { return r.type; });
  if (newBadges.length) {
    await db.query(
      'INSERT INTO badges (user_id, badge_type) SELECT $1, unnest($2::text[]) ON CONFLICT DO NOTHING',
      [userId, newBadges]
    );
  }
  return newBadges;
}

module.exports = { checkAndAwardBadges };