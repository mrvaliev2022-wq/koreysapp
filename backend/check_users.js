const db = require('./src/db');

async function check() {
  console.log('=== Oxirgi 5 user ===');
  const r = await db.query(
    "SELECT telegram_id, name, is_premium, premium_until FROM users ORDER BY id DESC LIMIT 5"
  );
  r.rows.forEach(row => {
    console.log(
      'TG:', row.telegram_id,
      '|', row.name,
      '| premium:', row.is_premium,
      '| until:', row.premium_until || 'null'
    );
  });

  console.log('\n=== Premium userlar ===');
  const p = await db.query(
    "SELECT telegram_id, name, premium_until FROM users WHERE is_premium = true"
  );
  if (p.rows.length === 0) {
    console.log('Hech kim premium emas!');
  } else {
    p.rows.forEach(row => console.log('TG:', row.telegram_id, row.name, row.premium_until));
  }

  await db.end();
}

check().catch(console.error);
