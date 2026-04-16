// backend/src/routes/referral.js
const router = require('express').Router();
const db = require('../db');

// POST /api/referral/register — yangi user referral link orqali keldi
router.post('/register', async (req, res) => {
  const { newUserId, referrerId } = req.body;
  if (!newUserId || !referrerId || newUserId === referrerId) {
    return res.json({ ok: false });
  }

  try {
    // referrals jadvaliga yozish (agar yo'q bo'lsa)
    await db.query(
      'INSERT INTO referrals (referrer_telegram_id, referred_telegram_id, status) ' +
      'VALUES ($1, $2, \'pending\') ON CONFLICT DO NOTHING',
      [referrerId, newUserId]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.json({ ok: false });
  }
});

// GET /api/referral/status — referral holati
router.get('/status', async (req, res) => {
  const { telegramId } = req.query;
  if (!telegramId) return res.status(400).json({ error: 'telegramId kerak' });

  try {
    const { rows } = await db.query(
      'SELECT COUNT(*) as confirmed_referrals FROM referrals ' +
      'WHERE referrer_telegram_id = $1 AND status = \'confirmed\'',
      [parseInt(telegramId)]
    );
    res.json({ confirmed_referrals: parseInt(rows[0].confirmed_referrals) });
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
});

// POST /api/referral/confirm — user Premium sotib olganda chaqiriladi
// Bu premium/stars va premium/admin-activate dan chaqiriladi
async function confirmReferral(telegramId, bot) {
  try {
    // Bu user kimning referrali?
    const { rows } = await db.query(
      'UPDATE referrals SET status = \'confirmed\', confirmed_at = NOW() ' +
      'WHERE referred_telegram_id = $1 AND status = \'pending\' ' +
      'RETURNING referrer_telegram_id',
      [telegramId]
    );

    if (!rows.length) return;

    const referrerId = rows[0].referrer_telegram_id;

    // Referrer da nechta confirmed referral bor?
    const { rows: countRows } = await db.query(
      'SELECT COUNT(*) as total FROM referrals ' +
      'WHERE referrer_telegram_id = $1 AND status = \'confirmed\'',
      [referrerId]
    );

    const total = parseInt(countRows[0].total);

    // 3 ta to'ldi → referrer ga bepul Premium
    if (total >= 3) {
      // Oldin berilganmi tekshir
      const { rows: alreadyGiven } = await db.query(
        'SELECT id FROM referral_rewards WHERE referrer_telegram_id = $1',
        [referrerId]
      );

      if (!alreadyGiven.length) {
        // Premium ber
        await db.query(
          'UPDATE users SET is_premium = true, ' +
          'premium_until = NOW() + INTERVAL \'7 months\' ' +
          'WHERE telegram_id = $1',
          [referrerId]
        );

        await db.query(
          'INSERT INTO referral_rewards (referrer_telegram_id, given_at) VALUES ($1, NOW())',
          [referrerId]
        );

        // Botga xabar jo'natish (agar bot instance bo'lsa)
        if (bot) {
          try {
            await bot.telegram.sendMessage(
              referrerId,
              '🎉 *Tabriklaymiz!*\n\n' +
              '3 ta do\'stingiz Premium oldi!\n' +
              '✅ Sizga *7 oylik Premium* bepul berildi!\n\n' +
              'Barcha darslar ochildi! Koreys tilini o\'rganing! 🇰🇷',
              { parse_mode: 'Markdown' }
            );
          } catch (e) {}
        }
      }
    } else if (bot) {
      // Referrer ga progress xabari
      try {
        await bot.telegram.sendMessage(
          referrerId,
          '👥 Do\'stingiz Premium oldi!\n\n' +
          '📊 Holat: ' + total + '/3 do\'st Premium oldi\n' +
          (3 - total) + ' ta qoldi — bepul Premium uchun!'
        );
      } catch (e) {}
    }
  } catch (err) {
    console.error('Referral confirm error:', err.message);
  }
}

router.confirmReferral = confirmReferral;
module.exports = router;
