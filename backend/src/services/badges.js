const db = require('../db');

const BADGE_RULES = [
  { type: 'first_lesson',  check: (s) => s.lessons_done >= 1 },
  { type: '10_lessons',    check: (s) => s.lessons_done >= 10 },
  { type: '50_lessons',    check: (s) => s.lessons_done >= 50 },
  { type: 'streak_7',      check: (s) => s.streak >= 7 },
  { type: 'streak_30',     check: (s) => s.streak >= 30 },
  { type: 'perfect_score', check: (s, e) => e?.isPerfect },
  { type: 'top_10',        check: (s, e) => e?.rank <= 10 },
  { type: 'early_bird',    check: () => { const h = new Date().getHours(); return h >= 5 && h <= 8; } },
  { type: 'night_owl',     check: () => { const h = new Date().getHours(); return h >= 22 || h <= 2; } },
];

async function checkAndAwardBadges(userId, extra = {}) {
  const [{ rows: [stats] }, { rows: existing }] = await Promise.all([
    db.query('SELECT * FROM user_stats WHERE user_id = \', [userId]),
    db.query('SELECT badge_type FROM badges WHERE user_id = \', [userId]),
  ]);

  if (!stats) return [];

  const earned = new Set(existing.map((b) => b.badge_type));
  const newBadges = BADGE_RULES
    .filter((r) => !earned.has(r.type) && r.check(stats, extra))
    .map((r) => r.type);

  if (newBadges.length) {
    await db.query(
      INSERT INTO badges (user_id, badge_type)
       SELECT \, unnest(\::text[])
       ON CONFLICT DO NOTHING,
      [userId, newBadges]
    );
  }

  return newBadges;
}

module.exports = { checkAndAwardBadges };
