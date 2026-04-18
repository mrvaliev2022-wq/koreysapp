require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const fetch = require('node-fetch');

const bot = new Telegraf(process.env.BOT_TOKEN);
const APP_URL    = process.env.MINI_APP_URL || 'https://koreysapp-qql1.vercel.app';
const API_URL    = process.env.API_URL      || 'https://koreysapp-production.up.railway.app';
const ADMIN_IDS  = (process.env.ADMIN_IDS || '').split(',').map(id => parseInt(id.trim())).filter(Boolean);
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'koreysapp_admin_2026';

function isAdmin(ctx) {
  return ADMIN_IDS.includes(ctx.from?.id);
}

function adminOnly(ctx, next) {
  if (!isAdmin(ctx)) return;
  return next();
}

async function apiGet(path) {
  const res = await fetch(API_URL + path, { headers: { 'x-admin-key': ADMIN_SECRET } });
  return res.json();
}

async function apiPost(path, body) {
  const res = await fetch(API_URL + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-admin-key': ADMIN_SECRET },
    body: JSON.stringify(body),
  });
  return res.json();
}

// /start
bot.start(async (ctx) => {
  const name = ctx.from.first_name;
  const startParam = ctx.startPayload;

  // ADMIN
  if (isAdmin(ctx)) {
    return ctx.reply(
      'Admin paneliga xush kelibsiz!\n\n' +
      'Buyruqlar:\n' +
      '/stats — statistika\n' +
      '/users — oxirgi userlar\n' +
      '/premium_list — premium userlar\n' +
      '/payments — oxirgi tolovlar\n' +
      '/give_premium [id] [oy] — premium berish\n' +
      '/revoke [id] — premium olish\n' +
      '/broadcast [matn] — xabar yuborish\n' +
      '/health — tizim holati\n' +
      '/find [id/ism] — user topish',
      Markup.keyboard([
        ['\uD83D\uDCCA Statistika', '\uD83D\uDC65 Userlar'],
        ['\uD83D\uDC8E Premium list', '\uD83D\uDCB3 Tolovlar'],
        ['\uD83D\uDCE2 Broadcast', '\uD83D\uDD27 Tizim holati'],
      ]).resize()
    );
  }

  // REFERRAL
  if (startParam && startParam.startsWith('ref_')) {
    const referrerId = parseInt(startParam.replace('ref_', ''));
    if (referrerId && referrerId !== ctx.from.id) {
      fetch(API_URL + '/api/referral/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newUserId: ctx.from.id, referrerId }),
      }).catch(() => {});
    }
  }

  // ODDIY USER - welcome message
  return ctx.reply(
    'Salom, ' + name + '! \uD83D\uDC4B\u2728\n\n' +
    '\uD83C\uDDF0\uD83C\uDDF7 <b>KoreysApp</b> ga xush kelibsiz!\n\n' +
    '\uD83D\uDCDA <b>TOPIK</b> va \uD83D\uDCBC <b>EPS-TOPIK</b> ni\n' +
    'bitta <b>OSON</b> va <b>QIZIQARLI</b> usulda o\u2019rganing\n' +
    'va <b>Koreya sari yo\u2019l oling!</b> \u2708\uFE0F\n\n' +
    '\u2B50 <b>Nima bor?</b>\n' +
    '\u2705 127+ dars \u2014 TOPIK va EPS-TOPIK\n' +
    '\uD83D\uDD0A Audio talaffuz \u2014 har bir so\u2018z\n' +
    '\uD83E\uDDE0 Grammatika tushuntirishlari\n' +
    '\uD83C\uDFC6 Reyting va streak tizimi\n\n' +
    '\uD83D\uDE80 Ilovaga kirib darslarni <b>hoziroq boshlang!</b>',
    {
      parse_mode: 'HTML',
      ...Markup.keyboard([
        [Markup.button.webApp('\uD83D\uDE80 Kirish \uD83C\uDDF0\uD83C\uDDF7', APP_URL)],
        [Markup.button.webApp('\uD83D\uDCDA Darsni boshlash', APP_URL + '/learn')],
      ]).resize()
    }
  );
});

// ADMIN COMMANDS
bot.command('help', adminOnly, (ctx) => {
  ctx.reply(
    'ADMIN BUYRUQLARI:\n\n' +
    '/stats — umumiy statistika\n' +
    '/users [N] — oxirgi N ta user\n' +
    '/premium_list — barcha premium userlar\n' +
    '/payments [N] — oxirgi N ta tolov\n' +
    '/give_premium [id] [oy] — premium ber\n' +
    '/revoke [id] — premiumni bekor qil\n' +
    '/broadcast [matn] — hammaga xabar\n' +
    '/health — backend holati\n' +
    '/find [id yoki ism] — user topish'
  );
});

bot.command('stats', adminOnly, async (ctx) => {
  try {
    const data = await apiGet('/api/stats/admin');
    ctx.reply(
      '\uD83D\uDCCA STATISTIKA\n\n' +
      'Jami userlar: ' + (data.total_users || 0) + '\n' +
      'Premium userlar: ' + (data.premium_users || 0) + '\n' +
      'Bugun yangi: ' + (data.today_new || 0) + '\n' +
      'Bugun aktiv: ' + (data.today_active || 0) + '\n\n' +
      '\uD83D\uDCB0 Tolovlar:\n' +
      'Jami: ' + (data.total_payments || 0) + '\n' +
      'Bugun: ' + (data.today_payments || 0) + '\n' +
      'Stars: ' + (data.stars_payments || 0) + '\n' +
      'Karta: ' + (data.card_payments || 0) + '\n\n' +
      '\uD83D\uDCDA Darslar:\n' +
      'Jami otilgan: ' + (data.total_lessons_done || 0) + '\n' +
      'Bugun: ' + (data.today_lessons || 0)
    );
  } catch (e) { ctx.reply('Xato: ' + e.message); }
});

bot.hears('\uD83D\uDCCA Statistika', adminOnly, async (ctx) => {
  try {
    const data = await apiGet('/api/stats/admin');
    ctx.reply(
      '\uD83D\uDCCA STATISTIKA\n\n' +
      'Jami: ' + (data.total_users || 0) + ' user\n' +
      'Premium: ' + (data.premium_users || 0) + '\n' +
      'Bugun yangi: ' + (data.today_new || 0) + '\n' +
      'Bugun tolov: ' + (data.today_payments || 0)
    );
  } catch (e) { ctx.reply('Xato: ' + e.message); }
});

bot.command('users', adminOnly, async (ctx) => {
  const limit = parseInt(ctx.message.text.split(' ')[1]) || 10;
  try {
    const data = await apiGet('/api/stats/admin/users?limit=' + limit);
    const users = data.users || [];
    if (!users.length) return ctx.reply('Userlar topilmadi');
    let text = 'OXIRGI ' + limit + ' TA USER:\n\n';
    users.forEach((u, i) => {
      text += (i+1) + '. ' + (u.name||'Nomalum') + ' | ' + (u.is_premium?'PREMIUM':'Free') + '\n   ID: ' + u.telegram_id + '\n';
    });
    ctx.reply(text);
  } catch (e) { ctx.reply('Xato: ' + e.message); }
});

bot.hears('\uD83D\uDC65 Userlar', adminOnly, async (ctx) => {
  try {
    const data = await apiGet('/api/stats/admin/users?limit=10');
    const users = data.users || [];
    let text = 'OXIRGI 10 USER:\n\n';
    users.forEach((u, i) => {
      text += (i+1) + '. ' + (u.name||'Nomalum') + ' | ' + (u.is_premium?'PREMIUM':'Free') + '\n   ' + u.telegram_id + '\n';
    });
    ctx.reply(text || 'Topilmadi');
  } catch (e) { ctx.reply('Xato: ' + e.message); }
});

bot.command('premium_list', adminOnly, async (ctx) => {
  try {
    const data = await apiGet('/api/stats/admin/premium');
    const users = data.users || [];
    if (!users.length) return ctx.reply('Premium userlar yoq');
    let text = '\uD83D\uDC8E PREMIUM (' + users.length + ' ta):\n\n';
    users.forEach((u, i) => {
      const until = u.premium_until ? new Date(u.premium_until).toLocaleDateString('uz') : '-';
      text += (i+1) + '. ' + (u.name||'Nomalum') + '\n   ID: ' + u.telegram_id + ' | ' + until + '\n';
    });
    ctx.reply(text);
  } catch (e) { ctx.reply('Xato: ' + e.message); }
});

bot.hears('\uD83D\uDC8E Premium list', adminOnly, async (ctx) => {
  try {
    const data = await apiGet('/api/stats/admin/premium');
    const users = data.users || [];
    let text = '\uD83D\uDC8E PREMIUM (' + users.length + ' ta):\n\n';
    users.slice(0,15).forEach((u,i) => {
      text += (i+1) + '. ' + (u.name||'Nomalum') + ' | ' + u.telegram_id + '\n';
    });
    ctx.reply(text || 'Yoq');
  } catch (e) { ctx.reply('Xato: ' + e.message); }
});

bot.command('payments', adminOnly, async (ctx) => {
  const limit = parseInt(ctx.message.text.split(' ')[1]) || 10;
  try {
    const data = await apiGet('/api/stats/admin/payments?limit=' + limit);
    const payments = data.payments || [];
    if (!payments.length) return ctx.reply('Tolovlar topilmadi');
    let text = '\uD83D\uDCB3 TOLOVLAR:\n\n';
    payments.forEach((p, i) => {
      text += (i+1) + '. ' + (p.name||'Nomalum') + ' | ' + p.method + ' | ' + p.status + '\n';
    });
    ctx.reply(text);
  } catch (e) { ctx.reply('Xato: ' + e.message); }
});

bot.hears('\uD83D\uDCB3 Tolovlar', adminOnly, async (ctx) => {
  try {
    const data = await apiGet('/api/stats/admin/payments?limit=10');
    const payments = data.payments || [];
    let text = '\uD83D\uDCB3 OXIRGI 10 TOLOV:\n\n';
    payments.forEach((p,i) => {
      text += (i+1) + '. ' + (p.name||'Nomalum') + ' \u2014 ' + p.method + '\n';
    });
    ctx.reply(text || 'Topilmadi');
  } catch (e) { ctx.reply('Xato: ' + e.message); }
});

bot.command('give_premium', adminOnly, async (ctx) => {
  const parts = ctx.message.text.split(' ');
  const telegramId = parseInt(parts[1]);
  const months = parseInt(parts[2]) || 4;
  if (!telegramId) return ctx.reply('Foydalanish: /give_premium [telegram_id] [oylar]');
  try {
    const res = await apiPost('/api/premium/admin-activate', { telegramId, method: 'admin_gift', months });
    if (res.ok) {
      await ctx.reply('\u2705 Premium berildi! ID: ' + telegramId + ', ' + months + ' oy');
      await bot.telegram.sendMessage(telegramId,
        '\uD83C\uDF89 Tabriklaymiz! ' + months + ' oylik Premium berildi!\nBarcha darslar ochildi: ' + APP_URL
      ).catch(() => {});
    } else {
      ctx.reply('Xato: ' + (res.error || 'Nomalum'));
    }
  } catch (e) { ctx.reply('Xato: ' + e.message); }
});

bot.command('revoke', adminOnly, async (ctx) => {
  const telegramId = parseInt(ctx.message.text.split(' ')[1]);
  if (!telegramId) return ctx.reply('Foydalanish: /revoke [telegram_id]');
  try {
    const res = await apiPost('/api/premium/revoke', { telegramId });
    ctx.reply(res.ok ? 'Premium bekor qilindi. ID: ' + telegramId : 'Xato: ' + res.error);
  } catch (e) { ctx.reply('Xato: ' + e.message); }
});

bot.command('find', adminOnly, async (ctx) => {
  const query = ctx.message.text.split(' ').slice(1).join(' ');
  if (!query) return ctx.reply('Foydalanish: /find [telegram_id yoki ism]');
  try {
    const data = await apiGet('/api/stats/admin/find?q=' + encodeURIComponent(query));
    const user = data.user;
    if (!user) return ctx.reply('User topilmadi: ' + query);
    const until = user.premium_until ? new Date(user.premium_until).toLocaleDateString('uz') : '-';
    ctx.reply(
      'USER:\n\n' +
      'Ism: ' + (user.name||'Nomalum') + '\n' +
      'Username: ' + (user.username ? '@'+user.username : '-') + '\n' +
      'Telegram ID: ' + user.telegram_id + '\n' +
      'Premium: ' + (user.is_premium ? 'Ha (' + until + ' gacha)' : 'Yoq') + '\n' +
      'Darslar: ' + (user.lessons_done||0) + '\n' +
      'Qoshilgan: ' + new Date(user.created_at).toLocaleDateString('uz'),
      Markup.inlineKeyboard([
        [Markup.button.callback('Premium ber (4 oy)', 'give_' + user.telegram_id)],
        [Markup.button.callback('Premiumni bekor qil', 'revoke_' + user.telegram_id)],
      ])
    );
  } catch (e) { ctx.reply('Xato: ' + e.message); }
});

bot.command('broadcast', adminOnly, async (ctx) => {
  const text = ctx.message.text.split(' ').slice(1).join(' ');
  if (!text) return ctx.reply('Foydalanish: /broadcast [matn]');
  ctx.reply('Yuborilmoqda...');
  try {
    const data = await apiGet('/api/stats/admin/users?limit=10000');
    const users = data.users || [];
    let sent = 0, failed = 0;
    for (const user of users) {
      try {
        await bot.telegram.sendMessage(user.telegram_id, text);
        sent++;
        await new Promise(r => setTimeout(r, 50));
      } catch (e) { failed++; }
    }
    ctx.reply('Tugadi! Yuborildi: ' + sent + ', Xato: ' + failed);
  } catch (e) { ctx.reply('Xato: ' + e.message); }
});

bot.hears('\uD83D\uDCE2 Broadcast', adminOnly, (ctx) => {
  ctx.reply('Xabar yozing:\n/broadcast [matn]');
});

bot.command('health', adminOnly, async (ctx) => {
  try {
    const start = Date.now();
    const data = await fetch(API_URL + '/health').then(r => r.json());
    const ping = Date.now() - start;
    ctx.reply(
      '\uD83D\uDD27 TIZIM HOLATI:\n\n' +
      'Backend: ' + (data.status === 'ok' ? '\u2705 Online' : '\u274C Xato') + '\n' +
      'Ping: ' + ping + 'ms\n' +
      'Bot: \u2705 Online'
    );
  } catch (e) { ctx.reply('\u274C Backend javob bermayapti!\n' + e.message); }
});

bot.hears('\uD83D\uDD27 Tizim holati', adminOnly, async (ctx) => {
  try {
    const start = Date.now();
    await fetch(API_URL + '/health');
    ctx.reply('\u2705 Backend Online | ' + (Date.now()-start) + 'ms');
  } catch (e) { ctx.reply('\u274C Backend javob bermayapti!'); }
});

// Screenshot handler - payment
bot.on('photo', async (ctx) => {
  if (isAdmin(ctx)) return;
  const userId = ctx.from.id;
  const username = ctx.from.username ? '@' + ctx.from.username : ctx.from.first_name;
  const caption = ctx.message.caption || 'yoq';
  const photoId = ctx.message.photo[ctx.message.photo.length - 1].file_id;

  for (const adminId of ADMIN_IDS) {
    try {
      await bot.telegram.sendPhoto(adminId, photoId, {
        caption: 'YANGI TOLOV!\n\nUser: ' + username + '\nID: ' + userId + '\nIzoh: ' + caption,
        ...Markup.inlineKeyboard([
          [Markup.button.callback('\u2705 Premium Ochish (4 oy)', 'approve_' + userId)],
          [Markup.button.callback('\u274C Rad etish', 'reject_' + userId)],
        ]),
      });
    } catch (e) { console.error('Admin ga xabar jonatolmadi:', e.message); }
  }

  return ctx.reply(
    '\u2705 Screenshot qabul qilindi!\n\n' +
    'Admin 5-30 daqiqa ichida Premium ochadi.\n' +
    'Agar 1 soat ichida ochilmasa, /support yozing.'
  );
});

// Admin actions
bot.action(/^approve_(\d+)$/, async (ctx) => {
  if (!isAdmin(ctx)) return ctx.answerCbQuery('Ruxsat yoq!');
  const targetId = parseInt(ctx.match[1]);
  ctx.answerCbQuery('Ochilmoqda...');
  try {
    const res = await apiPost('/api/premium/admin-activate', { telegramId: targetId, method: 'card', months: 4 });
    if (res.ok) {
      await ctx.editMessageCaption((ctx.callbackQuery.message.caption||'') + '\n\nPREMIUM OCHILDI (4 oy)!');
      await bot.telegram.sendMessage(targetId,
        '\uD83C\uDF89 Premium faollashtirildi!\n\nBarcha 127+ dars ochildi! Muddat: 4 oy\n\n' + APP_URL
      );
    } else { ctx.reply('Xato: ' + (res.error||'Nomalum')); }
  } catch (e) { ctx.reply('Xato: ' + e.message); }
});

bot.action(/^reject_(\d+)$/, async (ctx) => {
  if (!isAdmin(ctx)) return ctx.answerCbQuery('Ruxsat yoq!');
  const targetId = parseInt(ctx.match[1]);
  ctx.answerCbQuery('Rad etildi');
  await ctx.editMessageCaption((ctx.callbackQuery.message.caption||'') + '\n\nRAD ETILDI');
  await bot.telegram.sendMessage(targetId,
    '\u274C Tolov tasdiqlanmadi.\n\nScreenshot notogri yoki tolov topilmadi.\nQaytadan urining.'
  );
});

bot.action(/^give_(\d+)$/, adminOnly, async (ctx) => {
  const targetId = parseInt(ctx.match[1]);
  ctx.answerCbQuery('Berilmoqda...');
  const res = await apiPost('/api/premium/admin-activate', { telegramId: targetId, method: 'admin_gift', months: 4 }).catch(e => ({ ok: false, error: e.message }));
  if (res.ok) {
    ctx.reply('\u2705 Premium berildi! ID: ' + targetId);
    bot.telegram.sendMessage(targetId, 'Admin tomonidan 4 oylik Premium berildi! ' + APP_URL).catch(() => {});
  } else { ctx.reply('Xato: ' + res.error); }
});

bot.action(/^revoke_(\d+)$/, adminOnly, async (ctx) => {
  const targetId = parseInt(ctx.match[1]);
  ctx.answerCbQuery('Bekor qilinmoqda...');
  const res = await apiPost('/api/premium/revoke', { telegramId: targetId }).catch(e => ({ ok: false, error: e.message }));
  ctx.reply(res.ok ? 'Premium bekor qilindi. ID: ' + targetId : 'Xato: ' + res.error);
});

// Ignore all other messages from non-admins
bot.on('message', (ctx) => {
  if (isAdmin(ctx)) return;
  // Silent - no response
});

// Daily report
function scheduleDailyReport() {
  const now = new Date();
  const next9 = new Date();
  next9.setHours(9, 0, 0, 0);
  if (next9 <= now) next9.setDate(next9.getDate() + 1);
  setTimeout(async () => {
    try {
      const data = await apiGet('/api/stats/admin');
      const msg =
        '\uD83D\uDCCA KUNLIK HISOBOT\n\n' +
        'Jami userlar: ' + (data.total_users||0) + '\n' +
        'Premium: ' + (data.premium_users||0) + '\n' +
        'Bugun yangi: ' + (data.today_new||0) + '\n' +
        'Bugun aktiv: ' + (data.today_active||0) + '\n' +
        'Bugun darslar: ' + (data.today_lessons||0) + '\n' +
        'Bugun tolovlar: ' + (data.today_payments||0);
      for (const adminId of ADMIN_IDS) {
        await bot.telegram.sendMessage(adminId, msg).catch(() => {});
      }
    } catch (e) { console.error('Daily report error:', e.message); }
    scheduleDailyReport();
  }, next9 - now);
}

bot.launch();
console.log('Admin bot started');
scheduleDailyReport();

process.once('SIGINT',  () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
