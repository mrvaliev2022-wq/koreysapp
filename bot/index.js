require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
const APP_URL  = process.env.MINI_APP_URL || 'https://koreysapp.vercel.app';
const BOT_NAME = '@koreystili_topikkaBot';

// /start — open Mini App button
bot.start((ctx) => {
  const name = ctx.from.first_name;
  return ctx.reply(
    `Salom, ${name}! 🇰🇷\n\nKoreys tilini o'rganishni boshlaymizmi?`,
    Markup.keyboard([
      [Markup.button.webApp('🚀 KoreysApp ni ochish', APP_URL)],
    ]).resize()
  );
});

// /premium — premium info
bot.command('premium', (ctx) =>
  ctx.reply(
    '⭐ *Premium imkoniyatlari:*\n\n' +
    '• Barcha 127+ dars\n' +
    '• Kuniga 6 ta dars\n' +
    '• Streak Freeze 10 kun\n\n' +
    '💳 *Narx:* 29,000 so\'m / 4 oy\n' +
    '⭐ *Telegram Stars:* 150 Stars\n\n' +
    'To\'lovni app ichida amalga oshiring 👇',
    { parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([[Markup.button.webApp('💎 Premium olish', `${APP_URL}/premium`)]]) }
  )
);

// Telegram Stars payment handler
bot.on('pre_checkout_query', (ctx) => ctx.answerPreCheckoutQuery(true));

bot.on('successful_payment', async (ctx) => {
  const userId = ctx.from.id;
  const paymentId = ctx.message.successful_payment.telegram_payment_charge_id;

  // Notify backend
  try {
    await fetch(`${process.env.API_URL}/api/premium/stars`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telegramId: userId, telegramPaymentId: paymentId }),
    });
    ctx.reply('🎉 Premium faollashtirildi! Barcha darslar ochildi.');
  } catch {
    ctx.reply('Xatolik yuz berdi. Admin bilan bog\'laning.');
  }
});

// Webhook for Railway
if (process.env.WEBHOOK_URL) {
  bot.launch({ webhook: { domain: process.env.WEBHOOK_URL, port: process.env.PORT || 3002 } });
  console.log('Bot started (webhook)');
} else {
  bot.launch();
  console.log('Bot started (polling)');
}

process.once('SIGINT',  () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
