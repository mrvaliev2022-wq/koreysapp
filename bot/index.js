require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const fetch = require('node-fetch');

const bot = new Telegraf(process.env.BOT_TOKEN);
const APP_URL   = process.env.MINI_APP_URL  || 'https://koreysapp-qql1.vercel.app';
const API_URL   = process.env.API_URL       || 'https://koreysapp-production.up.railway.app';
const ADMIN_IDS = (process.env.ADMIN_IDS || '').split(',').map(id => parseInt(id.trim())).filter(Boolean);

// ─── /start ──────────────────────────────────────────────────────────────────
bot.start(async (ctx) => {
  const name = ctx.from.first_name;
  const startParam = ctx.startPayload;

  // Referral link orqali kelgan bo'lsa
  if (startParam && startParam.startsWith('ref_')) {
    const referrerId = parseInt(startParam.replace('ref_', ''));
    if (referrerId && referrerId !== ctx.from.id) {
      try {
        await fetch(API_URL + '/api/referral/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            newUserId: ctx.from.id,
            referrerId: referrerId,
          }),
        });
      } catch (e) {}
    }
  }

  return ctx.reply(
    'Salom, ' + name + '! 🇰🇷\n\nKoreys tilini o\'rganishni boshlaymizmi?',
    Markup.keyboard([
      [Markup.button.webApp('🚀 KoreysApp ni ochish', APP_URL)],
      ['💎 Premium', '👥 Do\'stlarni taklif qil'],
    ]).resize()
  );
});

// ─── /premium ────────────────────────────────────────────────────────────────
bot.command('premium', (ctx) => showPremiumMenu(ctx));
bot.hears('💎 Premium', (ctx) => showPremiumMenu(ctx));

function showPremiumMenu(ctx) {
  return ctx.reply(
    '💎 *Premium imkoniyatlari:*\n\n' +
    '• Barcha 127+ dars\n' +
    '• Audio va grammatika\n' +
    '• Streak Freeze 10 kun\n\n' +
    '💳 *To\'lov usullari:*\n' +
    '1️⃣ Karta/Click/Payme — 29,000 so\'m / 7 oy\n' +
    '2️⃣ Telegram Stars — 150 ⭐\n' +
    '3️⃣ 3 do\'st taklif qil — bepul Premium!\n\n' +
    'Qaysi usulni tanlaysiz?',
    {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('💳 Karta orqali to\'lash', 'pay_card')],
        [Markup.button.callback('⭐ 150 Telegram Stars', 'pay_stars')],
        [Markup.button.callback('👥 Do\'stlarni taklif qil', 'pay_referral')],
      ]),
    }
  );
}

// ─── KARTA TO'LOV ─────────────────────────────────────────────────────────────
bot.action('pay_card', (ctx) => {
  ctx.answerCbQuery();
  return ctx.reply(
    '💳 *Karta orqali to\'lash:*\n\n' +
    '📌 Summa: *29,000 so\'m*\n' +
    '🏦 Click: *9860 1234 5678 9012*\n' +
    '🏦 Payme: *9860 1234 5678 9012*\n' +
    '👤 Karta egasi: *Valiev M.*\n\n' +
    '✅ To\'lovdan keyin *screenshot* shu yerga yuboring.\n' +
    'Admin 5-30 daqiqa ichida Premium ochadi!',
    { parse_mode: 'Markdown' }
  );
});

// Screenshot qabul qilish
bot.on('photo', async (ctx) => {
  const userId = ctx.from.id;
  const username = ctx.from.username ? '@' + ctx.from.username : ctx.from.first_name;
  const caption = ctx.message.caption || '';

  // Admin ga xabar jo'natish
  if (ADMIN_IDS.length === 0) {
    return ctx.reply('⚠️ Admin hali sozlanmagan. Keyinroq urinib ko\'ring.');
  }

  const photoId = ctx.message.photo[ctx.message.photo.length - 1].file_id;

  for (const adminId of ADMIN_IDS) {
    try {
      await bot.telegram.sendPhoto(adminId, photoId, {
        caption:
          '💳 *Yangi to\'lov screenshot!*\n\n' +
          '👤 User: ' + username + '\n' +
          '🆔 Telegram ID: `' + userId + '`\n' +
          '💬 Izoh: ' + (caption || 'yo\'q'),
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
          [Markup.button.callback('✅ Premium Ochish', 'approve_' + userId)],
          [Markup.button.callback('❌ Rad etish', 'reject_' + userId)],
        ]),
      });
    } catch (e) {
      console.error('Admin ga xabar jo\'natolmadi:', e.message);
    }
  }

  return ctx.reply(
    '✅ Screenshot qabul qilindi!\n\n' +
    '⏳ Admin tez orada Premium ni ochadi (5-30 daqiqa).\n' +
    'Agar 1 soat ichida ochilmasa, /support yozing.'
  );
});

// Admin: Premium tasdiqlash
bot.action(/^approve_(\d+)$/, async (ctx) => {
  if (!ADMIN_IDS.includes(ctx.from.id)) return ctx.answerCbQuery('Ruxsat yo\'q!');

  const targetUserId = parseInt(ctx.match[1]);
  ctx.answerCbQuery('Ochilmoqda...');

  try {
    const res = await fetch(API_URL + '/api/premium/admin-activate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key': process.env.ADMIN_SECRET || 'admin123',
      },
      body: JSON.stringify({ telegramId: targetUserId, method: 'card', months: 7 }),
    });

    if (res.ok) {
      await ctx.editMessageCaption(
        ctx.callbackQuery.message.caption + '\n\n✅ PREMIUM OCHILDI!',
        { parse_mode: 'Markdown' }
      );
      await bot.telegram.sendMessage(
        targetUserId,
        '🎉 *Premium faollashtirildi!*\n\n' +
        '✅ Barcha 127+ dars ochildi!\n' +
        '⏳ Muddat: 7 oy\n\n' +
        'KoreysApp ni oching va o\'rganishni boshlang! 🚀',
        {
          parse_mode: 'Markdown',
          ...Markup.inlineKeyboard([[Markup.button.webApp('📚 Darslarni ko\'rish', APP_URL)]]),
        }
      );
    } else {
      ctx.reply('❌ Xatolik: ' + (await res.text()));
    }
  } catch (e) {
    ctx.reply('❌ Server xatosi: ' + e.message);
  }
});

// Admin: Rad etish
bot.action(/^reject_(\d+)$/, async (ctx) => {
  if (!ADMIN_IDS.includes(ctx.from.id)) return ctx.answerCbQuery('Ruxsat yo\'q!');

  const targetUserId = parseInt(ctx.match[1]);
  ctx.answerCbQuery('Rad etildi');

  await ctx.editMessageCaption(
    ctx.callbackQuery.message.caption + '\n\n❌ RAD ETILDI',
    { parse_mode: 'Markdown' }
  );

  await bot.telegram.sendMessage(
    targetUserId,
    '❌ To\'lov tasdiqlanmadi.\n\n' +
    'Sabab: Screenshot noto\'g\'ri yoki to\'lov topilmadi.\n\n' +
    'Qaytadan urinib ko\'ring yoki /support yozing.'
  );
});

// ─── TELEGRAM STARS ───────────────────────────────────────────────────────────
bot.action('pay_stars', async (ctx) => {
  ctx.answerCbQuery();
  try {
    await ctx.replyWithInvoice({
      title: 'KoreysApp Premium — 1 oy',
      description: 'Barcha 127+ dars, audio, grammatika. 1 oylik Premium.',
      payload: 'premium_stars_' + ctx.from.id,
      currency: 'XTR',
      prices: [{ label: 'Premium 1 oy', amount: 150 }],
    });
  } catch (e) {
    ctx.reply('Stars to\'lov hozircha mavjud emas. Karta orqali to\'lang.');
  }
});

bot.on('pre_checkout_query', (ctx) => ctx.answerPreCheckoutQuery(true));

bot.on('successful_payment', async (ctx) => {
  const telegramId = ctx.from.id;
  const paymentId = ctx.message.successful_payment.telegram_payment_charge_id;

  try {
    await fetch(API_URL + '/api/premium/stars', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telegramId, telegramPaymentId: paymentId }),
    });

    ctx.reply(
      '🎉 *150 Stars qabul qilindi!*\n\n' +
      '✅ Premium 1 oyga faollashtirildi!\n' +
      'Barcha darslar ochildi!',
      {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([[Markup.button.webApp('📚 Boshlash', APP_URL)]]),
      }
    );
  } catch {
    ctx.reply('Xatolik yuz berdi. /support yozing.');
  }
});

// ─── REFERRAL ─────────────────────────────────────────────────────────────────
bot.action('pay_referral', (ctx) => {
  ctx.answerCbQuery();
  showReferralInfo(ctx);
});

bot.hears('👥 Do\'stlarni taklif qil', (ctx) => showReferralInfo(ctx));
bot.command('referral', (ctx) => showReferralInfo(ctx));

async function showReferralInfo(ctx) {
  const telegramId = ctx.from.id;
  const refLink = 'https://t.me/koreystili_topikkaBot?start=ref_' + telegramId;

  // Referral statusni tekshirish
  try {
    const res = await fetch(API_URL + '/api/referral/status?telegramId=' + telegramId);
    const data = await res.json();
    const count = data.confirmed_referrals || 0;
    const needed = 3;
    const remaining = Math.max(0, needed - count);

    return ctx.reply(
      '👥 *Do\'stlarni taklif qiling — Bepul Premium!*\n\n' +
      '📋 *Qoida:*\n' +
      '• 3 ta do\'stingiz ham Premium sotib olsa\n' +
      '• Sizga 7 oylik Premium BEPUL beriladi!\n\n' +
      '📊 *Holat:* ' + count + '/3 do\'st Premium oldi\n' +
      (remaining > 0 ? '⏳ Yana ' + remaining + ' ta kerak' : '🎉 Siz Premium oldingiz!') + '\n\n' +
      '🔗 *Sizning link:*\n`' + refLink + '`\n\n' +
      'Do\'stlaringizga yuboring! Ular shu link orqali ro\'yxatdan o\'tib Premium sotib olsa hisoblanadi.',
      { parse_mode: 'Markdown' }
    );
  } catch (e) {
    return ctx.reply(
      '👥 *Do\'stlarni taklif qiling!*\n\n' +
      '3 ta do\'stingiz Premium olsa → Siz ham bepul Premium olasiz!\n\n' +
      '🔗 Sizning link:\n`' + refLink + '`',
      { parse_mode: 'Markdown' }
    );
  }
}

// ─── SUPPORT ──────────────────────────────────────────────────────────────────
bot.command('support', (ctx) => {
  ctx.reply(
    '🆘 *Yordam kerakmi?*\n\n' +
    'Admin bilan bog\'laning: @mrvaliev2022\n\n' +
    'Yoki muammoni yozing — tez orada javob beramiz.',
    { parse_mode: 'Markdown' }
  );
});

// ─── Launch ───────────────────────────────────────────────────────────────────
if (process.env.WEBHOOK_URL) {
  bot.launch({ webhook: { domain: process.env.WEBHOOK_URL, port: process.env.PORT || 3002 } });
  console.log('Bot started (webhook)');
} else {
  bot.launch();
  console.log('Bot started (polling)');
}

process.once('SIGINT',  () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
