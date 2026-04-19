const db = require('./src/db');

async function check() {
  console.log('=== DB TEKSHIRUVI ===\n');

  // Users
  const users = await db.query('SELECT COUNT(*) as cnt FROM users');
  console.log('Users jami:', users.rows[0].cnt);

  const premium = await db.query('SELECT COUNT(*) as cnt FROM users WHERE is_premium = true');
  console.log('Premium:', premium.rows[0].cnt);

  const today = await db.query("SELECT COUNT(*) as cnt FROM users WHERE created_at >= NOW() - INTERVAL '1 day'");
  console.log('Bugun yangi:', today.rows[0].cnt);

  // Payments table exists?
  try {
    const pay = await db.query('SELECT COUNT(*) as cnt FROM payments');
    console.log('Payments jami:', pay.rows[0].cnt);
  } catch(e) {
    console.log('payments jadvali YOQ:', e.message);
  }

  // user_stats table exists?
  try {
    const s = await db.query('SELECT COUNT(*) as cnt FROM user_stats');
    console.log('user_stats jami:', s.rows[0].cnt);
  } catch(e) {
    console.log('user_stats jadvali YOQ:', e.message);
  }

  // leaderboard table exists?
  try {
    const l = await db.query('SELECT COUNT(*) as cnt FROM leaderboard');
    console.log('leaderboard jami:', l.rows[0].cnt);
  } catch(e) {
    console.log('leaderboard jadvali YOQ:', e.message);
  }

  // user_progress table exists?
  try {
    const p = await db.query('SELECT COUNT(*) as cnt FROM user_progress');
    console.log('user_progress jami:', p.rows[0].cnt);
  } catch(e) {
    console.log('user_progress jadvali YOQ:', e.message);
  }

  // Show last 3 users
  console.log('\n=== Oxirgi 3 user ===');
  const last = await db.query('SELECT id, telegram_id, name, is_premium, created_at FROM users ORDER BY id DESC LIMIT 3');
  last.rows.forEach(r => console.log(r.id, r.telegram_id, r.name, 'premium:', r.is_premium));

  // Check updated_at column exists in user_stats
  try {
    const cols = await db.query("SELECT column_name FROM information_schema.columns WHERE table_name='user_stats'");
    console.log('\nuser_stats columns:', cols.rows.map(r => r.column_name).join(', '));
  } catch(e) {}

  await db.end();
}

check().catch(console.error);
