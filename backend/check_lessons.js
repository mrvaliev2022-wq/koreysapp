const db = require('./src/db');

async function check() {
  console.log('=== TOPIK L1 darslar ===');
  const t = await db.query("SELECT id, level, title_uz, is_free FROM lessons WHERE track='TOPIK' AND level=1 ORDER BY id");
  t.rows.forEach((r, i) => console.log((i+1) + '. ID:' + r.id, r.title_uz, 'free:' + r.is_free));

  console.log('\n=== EPS-TOPIK L1 darslar ===');
  const e = await db.query("SELECT id, level, title_uz, is_free FROM lessons WHERE track='EPS-TOPIK' AND level=1 ORDER BY id");
  e.rows.forEach((r, i) => console.log((i+1) + '. ID:' + r.id, r.title_uz, 'free:' + r.is_free));

  console.log('\n=== Barcha free darslar ===');
  const f = await db.query("SELECT id, track, level, title_uz, is_free FROM lessons WHERE is_free=true ORDER BY track, level, id");
  f.rows.forEach(r => console.log(r.track, 'L'+r.level, 'ID:'+r.id, r.title_uz));

  await db.end();
}

check().catch(console.error);
