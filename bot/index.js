require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const fetch = require('node-fetch');

const bot = new Telegraf(process.env.BOT_TOKEN);
const APP_URL   = process.env.MINI_APP_URL || 'https://koreysapp-qql1.vercel.app';
const API_URL   = process.env.API_URL      || 'https://koreysapp-production.up.railway.app';
const ADMIN_IDS = (process.env.ADMIN_IDS || '').split(',').map(id => parseInt(id.trim())).filter(Boolean);

// /start
bot.start(async (ctx) => {
  const name = ctx.from.first_name;
  const startParam = ctx.startPayload;

  if (startParam && startParam.startsWith('ref_')) {
    const referrerId = parseInt(startParam.replace('ref_', ''));
    if (referrerId && referrerId !== ctx.from.id) {
      try {
        await fetch(API_URL + '/api/referral/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newUserId: ctx.from.id, referrerId }),
        });
      } catch (e) {}
    }
  }

  return ctx.reply(
    'Salom, ' + name + '!\n\nKoreys tilini organishni boshlaymizmi?',
    Markup.keyboard([
      [Markup.button.webApp('KoreysApp ni ochish', APP_URL)],
      ['Premium', "Do'stlarni taklif qil"],
    ]).resize()
  );
});

// Premium menu
bot.command('premium', (ctx) => showPremiumMenu(ctx));
bot.hears('Premium', (ctx) => showPremiumMenu(ctx));

function showPremiumMenu(ctx) {
  return ctx.reply(
    'Premium imkoniyatlari:\n\n' +
    '- Barcha 127+ dars\n' +
    '- Audio va grammatika\n' +
    '- Streak Freeze 10 kun\n\n' +
    "To'lov usullari:\n" +
    "1. Karta/Click/Payme - 29,000 so'm / 7 oy\n" +
    '2. Telegram Stars - 150 Stars\n' +
    "3. 3 do'st taklif qil - bepul Premium!\n\n" +
    'Qaysi usulni tanlaysiz?',
    Markup.inlineKeyboard([
      [Markup.button.callback("Karta orqali to'lash", 'pay_card')],
      [Markup.button.callback('150 Telegram Stars', 'pay_stars')],
      [Markup.button.callback("Do'stlarni taklif qil", 'pay_referral')],
    ])
  );
}

// Karta to'lov
bot.action('pay_card', (ctx) => {
  ctx.answerCbQuery();
  return ctx.reply(
    "Karta orqali to'lash:\n\n" +
    "Summa: 29,000 so'm\n" +
    'Click: 9860 1234 5678 9012\n' +
    'Payme: 9860 1234 5678 9012\n' +
    'Karta egasi: Valiev M.\n\n' +
    "To'lovdan keyin screenshot shu yerga yuboring.\n" +
    'Admin 5-30 daqiqa ichida Premium ochadi!'
  );
});

// Screenshot qabul qilish
bot.on('photo', async (ctx) => {
  const userId = ctx.from.id;
  const username = ctx.from.username ? '@' + ctx.from.username : ctx.from.first_name;
  const caption = ctx.message.caption || '';

  if (ADMIN_IDS.length === 0) {
    return ctx.reply('Admin hali sozlanmagan. Keyinroq urinib koring.');
  }

  const photoId = ctx.message.photo[ctx.message.photo.length - 1].file_id;

  for (const adminId of ADMIN_IDS) {
    try {
      await bot.telegram.sendPhoto(adminId, photoId, {
        caption:
          "Yangi to'lov screenshot!\n\n" +
          'User: ' + username + '\n' +
          'Telegram ID: ' + userId + '\n' +
          'Izoh: ' + (caption || "yo'q"),
        ...Markup.inlineKeyboard([
          [Markup.button.callback('Premium Ochish', 'approve_' + userId)],
          [Markup.button.callback('Rad etish', 'reject_' + userId)],
        ]),
      });
    } catch (e) {
      console.error('Admin ga xabar jonatolmadi:', e.message);
    }
  }

  return ctx.reply(
    'Screenshot qabul qilindi!\n\n' +
    'Admin tez orada Premium ni ochadi (5-30 daqiqa).\n' +
    'Agar 1 soat ichida ochilmasa, /support yozing.'
  );
});

// Admin: Premium tasdiqlash
bot.action(/^approve_(\d+)$/, async (ctx) => {
  if (!ADMIN_IDS.includes(ctx.from.id)) return ctx.answerCbQuery('Ruxsat yoq!');

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
        (ctx.callbackQuery.message.caption || '') + '\n\nPREMIUM OCHILDI!'
      );
      await bot.telegram.sendMessage(
        targetUserId,
        'Premium faollashtirildi!\n\n' +
        'Barcha 127+ dars ochildi!\n' +
        'Muddat: 7 oy\n\n' +
        'KoreysApp ni oching va organishni boshlang!',
        Markup.inlineKeyboard([[Markup.button.webApp('Darslarni korish', APP_URL)]])
      );
    } else {
      const errText = await res.text();
      ctx.reply('Xatolik: ' + errText);
    }
  } catch (e) {
    ctx.reply('Server xatosi: ' + e.message);
  }
});

// Admin: Rad etish
bot.action(/^reject_(\d+)$/, async (ctx) => {
  if (!ADMIN_IDS.includes(ctx.from.id)) return ctx.answerCbQuery('Ruxsat yoq!');

  const targetUserId = parseInt(ctx.match[1]);
  ctx.answerCbQuery('Rad etildi');

  await ctx.editMessageCaption(
    (ctx.callbackQuery.message.caption || '') + '\n\nRAD ETILDI'
  );

  await bot.telegram.sendMessage(
    targetUserId,
    "To'lov tasdiqlanmadi.\n\n" +
    "Sabab: Screenshot noto'gri yoki to'lov topilmadi.\n\n" +
    'Qaytadan urinib koring yoki /support yozing.'
  );
});

// Telegram Stars
bot.action('pay_stars', async (ctx) => {
  ctx.answerCbQuery();
  try {
    await ctx.replyWithInvoice({
      title: 'KoreysApp Premium - 1 oy',
      description: 'Barcha 127+ dars, audio, grammatika. 1 oylik Premium.',
      payload: 'premium_stars_' + ctx.from.id,
      currency: 'XTR',
      prices: [{ label: 'Premium 1 oy', amount: 150 }],
    });
  } catch (e) {
    ctx.reply("Stars to'lov hozircha mavjud emas. Karta orqali to'lang.");
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
      '150 Stars qabul qilindi!\n\n' +
      'Premium 1 oyga faollashtirildi!\n' +
      'Barcha darslar ochildi!',
      Markup.inlineKeyboard([[Markup.button.webApp('Boshlash', APP_URL)]])
    );
  } catch {
    ctx.reply('Xatolik yuz berdi. /support yozing.');
  }
});

// Referral
bot.action('pay_referral', (ctx) => { ctx.answerCbQuery(); showReferralInfo(ctx); });
bot.hears("Do'stlarni taklif qil", (ctx) => showReferralInfo(ctx));
bot.command('referral', (ctx) => showReferralInfo(ctx));

async function showReferralInfo(ctx) {
  const telegramId = ctx.from.id;
  const refLink = 'https://t.me/koreystili_topikkaBot?start=ref_' + telegramId;

  try {
    const res = await fetch(API_URL + '/api/referral/status?telegramId=' + telegramId);
    const data = await res.json();
    const count = data.confirmed_referrals || 0;
    const remaining = Math.max(0, 3 - count);

    return ctx.reply(
      "Do'stlarni taklif qiling - Bepul Premium!\n\n" +
      'Qoida:\n' +
      "3 ta do'stingiz ham Premium sotib olsa,\n" +
      'sizga 7 oylik Premium BEPUL beriladi!\n\n' +
      'Holat: ' + count + '/3 do\'st Premium oldi\n' +
      (remaining > 0 ? 'Yana ' + remaining + ' ta kerak' : 'Siz Premium oldingiz!') + '\n\n' +
      'Sizning link:\n' + refLink + '\n\n' +
      "Do'stlaringizga yuboring!"
    );
  } catch (e) {
    return ctx.reply(
      "Do'stlarni taklif qiling!\n\n" +
      "3 ta do'stingiz Premium olsa - Siz ham bepul Premium olasiz!\n\n" +
      'Sizning link:\n' + refLink
    );
  }
}

// Support
bot.command('support', (ctx) => {
  ctx.reply(
    'Yordam kerakmi?\n\n' +
    'Admin: @mrvaliev2022\n' +
    'Muammoni yozing - tez orada javob beramiz.'
  );
});

// Launch
if (process.env.WEBHOOK_URL) {
  bot.launch({ webhook: { domain: process.env.WEBHOOK_URL, port: process.env.PORT || 3002 } });
  console.log('Bot started (webhook)');
} else {
  bot.launch();
  console.log('Bot started (polling)');
}

process.once('SIGINT',  () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
