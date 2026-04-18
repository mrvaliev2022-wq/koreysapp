const db = require('./src/db');

async function test() {
  // Simulate what bot does when admin approves
  const targetId = 387075431; // Oybek telegram_id

  console.log('Testing premium activate for TG:', targetId);

  // Find user
  const { rows: [user] } = await db.query(
    'SELECT id, name, is_premium FROM users WHERE telegram_id = $1',
    [targetId]
  );

  if (!user) {
    console.log('USER NOT FOUND in DB!');
    await db.end();
    return;
  }

  console.log('User found:', user.id, user.name, 'premium:', user.is_premium);

  // Check what admin-activate route does
  const months = 4;
  const { rows: [updated] } = await db.query(
    `UPDATE users 
     SET is_premium = true, 
         premium_until = NOW() + INTERVAL '${months} months'
     WHERE telegram_id = $1
     RETURNING id, telegram_id, is_premium, premium_until`,
    [targetId]
  );

  console.log('After activate:', updated.telegram_id, 'premium:', updated.is_premium, 'until:', updated.premium_until);

  // Also check payments table exists
  try {
    await db.query(
      `INSERT INTO payments (user_id, method, amount, status, confirmed_at)
       VALUES ($1, 'test', 29000, 'confirmed', NOW())`,
      [user.id]
    );
    console.log('Payment record created OK');
  } catch(e) {
    console.log('Payment insert error:', e.message);
  }

  await db.end();
}

test().catch(console.error);
