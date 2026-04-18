require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const fetch = require('node-fetch');

const bot = new Telegraf(process.env.BOT_TOKEN);
const APP_URL    = process.env.MINI_APP_URL || 'https://koreysapp-qql1.vercel.app';
const API_URL    = process.env.API_URL      || 'https://koreysapp-production.up.railway.app';
const ADMIN_IDS  = (process.env.ADMIN_IDS || '').split(',').map(id => parseInt(id.trim())).filter(Boolean);
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'koreysapp_admin_2026';

// ── Admin tekshirish ──────────────────────────────────────────────────────────
function isAdmin(ctx) {
  return ADMIN_IDS.includes(ctx.from?.id);
}

function adminOnly(ctx, next) {
  if (!isAdmin(ctx)) return; // Ignore non-admin silently
  return next();
}

// ── Yordamchi: API so'rov ────────────────────────────────────────────────────
async function apiGet(path) {
  const res = await fetch(API_URL + path, {
    headers: { 'x-admin-key': ADMIN_SECRET }
  });
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

// ── /start ───────────────────────────────────────────────────────────────────
bot.start((ctx) => {
  if (!isAdmin(ctx)) {
    return ctx.reply(
      'Salom! Bu bot admin uchun.\n\nKoreysApp ilovasiga kirish uchun:\n' + APP_URL
    );
  }

  return ctx.reply(
    'Admin paneliga xush kelibsiz!\n\n' +
    'Buyruqlar:\n' +
    '/stats — statistika\n' +
    '/users — oxirgi userlar\n' +
    '/premium_list — premium userlar\n' +
    '/payments — oxirgi tolovlar\n' +
    '/give_premium [telegram_id] — premium berish\n' +
    '/revoke [telegram_id] — premium olish\n' +
    '/broadcast [matn] — xabar yuborish\n' +
    '/health — tizim holati\n' +
    '/help — yordam',
    Markup.keyboard([
      ['📊 Statistika', '👥 Userlar'],
      ['💎 Premium list', '💳 Tolovlar'],
      ['📢 Broadcast', '🔧 Tizim holati'],
    ]).resize()
  );
});

// ── /help ────────────────────────────────────────────────────────────────────
bot.command('help', adminOnly, (ctx) => {
  ctx.reply(
    'ADMIN BUYRUQLARI:\n\n' +
    '/stats — umumiy statistika\n' +
    '/users [N] — oxirgi N ta user (default 10)\n' +
    '/premium_list — barcha premium userlar\n' +
    '/payments [N] — oxirgi N ta tolov\n' +
    '/give_premium [id] — Telegram ID ga premium ber\n' +
    '/revoke [id] — premiumni bekor qil\n' +
    '/broadcast [matn] — hammaga xabar\n' +
    '/health — backend, DB holati\n' +
    '/find [id yoki username] — user topish'
  );
});

// ── /stats ───────────────────────────────────────────────────────────────────
bot.command('stats', adminOnly, async (ctx) => {
  try {
    const data = await apiGet('/api/stats/admin');
    ctx.reply(
      'STATISTIKA\n\n' +
      'Jami userlar: ' + (data.total_users || 0) + '\n' +
      'Premium userlar: ' + (data.premium_users || 0) + '\n' +
      'Bugun yangi: ' + (data.today_new || 0) + '\n' +
      'Bugun aktiv: ' + (data.today_active || 0) + '\n\n' +
      'Tolovlar:\n' +
      'Jami: ' + (data.total_payments || 0) + '\n' +
      'Bugun: ' + (data.today_payments || 0) + '\n' +
      'Stars: ' + (data.stars_payments || 0) + '\n' +
      'Karta: ' + (data.card_payments || 0) + '\n\n' +
      'Darslar:\n' +
      'Jami o\'tilgan: ' + (data.total_lessons_done || 0) + '\n' +
      'Bugun: ' + (data.today_lessons || 0)
    );
  } catch (e) {
    ctx.reply('Xato: ' + e.message);
  }
});

bot.hears('📊 Statistika', adminOnly, async (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id, '/stats');
  bot.handleUpdate({ message: { ...ctx.message, text: '/stats' } });
});

// ── /users ───────────────────────────────────────────────────────────────────
bot.command('users', adminOnly, async (ctx) => {
  const limit = parseInt(ctx.message.text.split(' ')[1]) || 10;
  try {
    const data = await apiGet('/api/stats/admin/users?limit=' + limit);
    const users = data.users || [];
    if (!users.length) return ctx.reply('Userlar topilmadi');

    let text = 'OXIRGI ' + limit + ' TA USER:\n\n';
    users.forEach((u, i) => {
      text += (i + 1) + '. ' + (u.name || 'Noma\'lum') + '\n';
      text += '   ID: ' + u.telegram_id + '\n';
      text += '   Premium: ' + (u.is_premium ? 'Ha' : 'Yoq') + '\n';
      text += '   Kirilgan: ' + new Date(u.created_at).toLocaleDateString('uz') + '\n\n';
    });
    ctx.reply(text);
  } catch (e) {
    ctx.reply('Xato: ' + e.message);
  }
});

bot.hears('👥 Userlar', adminOnly, async (ctx) => {
  const data = await apiGet('/api/stats/admin/users?limit=10').catch(() => ({ users: [] }));
  const users = data.users || [];
  let text = 'OXIRGI 10 TA USER:\n\n';
  users.forEach((u, i) => {
    text += (i + 1) + '. ' + (u.name || 'Noma\'lum') + ' | ' + (u.is_premium ? 'PREMIUM' : 'Free') + '\n';
    text += '   TG: ' + u.telegram_id + '\n';
  });
  ctx.reply(text || 'Userlar topilmadi');
});

// ── /premium_list ────────────────────────────────────────────────────────────
bot.command('premium_list', adminOnly, async (ctx) => {
  try {
    const data = await apiGet('/api/stats/admin/premium');
    const users = data.users || [];
    if (!users.length) return ctx.reply('Premium userlar yoq');

    let text = 'PREMIUM USERLAR (' + users.length + ' ta):\n\n';
    users.forEach((u, i) => {
      const until = u.premium_until ? new Date(u.premium_until).toLocaleDateString('uz') : 'Noma\'lum';
      text += (i + 1) + '. ' + (u.name || 'Noma\'lum') + '\n';
      text += '   ID: ' + u.telegram_id + '\n';
      text += '   Tugaydi: ' + until + '\n\n';
    });
    ctx.reply(text);
  } catch (e) {
    ctx.reply('Xato: ' + e.message);
  }
});

bot.hears('💎 Premium list', adminOnly, async (ctx) => {
  ctx.message.text = '/premium_list';
  const data = await apiGet('/api/stats/admin/premium').catch(() => ({ users: [] }));
  const users = data.users || [];
  let text = 'PREMIUM (' + users.length + ' ta):\n\n';
  users.slice(0, 15).forEach((u, i) => {
    text += (i + 1) + '. ' + (u.name || 'Noma\'lum') + ' | ' + u.telegram_id + '\n';
  });
  ctx.reply(text || 'Premium userlar yoq');
});

// ── /payments ────────────────────────────────────────────────────────────────
bot.command('payments', adminOnly, async (ctx) => {
  const limit = parseInt(ctx.message.text.split(' ')[1]) || 10;
  try {
    const data = await apiGet('/api/stats/admin/payments?limit=' + limit);
    const payments = data.payments || [];
    if (!payments.length) return ctx.reply('Tolovlar topilmadi');

    let text = 'OXIRGI ' + limit + ' TA TOLOV:\n\n';
    payments.forEach((p, i) => {
      text += (i + 1) + '. ' + (p.name || 'Noma\'lum') + '\n';
      text += '   Usul: ' + p.method + '\n';
      text += '   Status: ' + p.status + '\n';
      text += '   Sana: ' + new Date(p.confirmed_at || p.created_at).toLocaleDateString('uz') + '\n\n';
    });
    ctx.reply(text);
  } catch (e) {
    ctx.reply('Xato: ' + e.message);
  }
});

bot.hears('💳 Tolovlar', adminOnly, async (ctx) => {
  const data = await apiGet('/api/stats/admin/payments?limit=10').catch(() => ({ payments: [] }));
  const payments = data.payments || [];
  let text = 'OXIRGI 10 TA TOLOV:\n\n';
  payments.forEach((p, i) => {
    text += (i + 1) + '. ' + (p.name || 'Noma\'lum') + ' — ' + p.method + '\n';
  });
  ctx.reply(text || 'Tolovlar topilmadi');
});

// ── /give_premium ─────────────────────────────────────────────────────────────
bot.command('give_premium', adminOnly, async (ctx) => {
  const parts = ctx.message.text.split(' ');
  const telegramId = parseInt(parts[1]);
  const months = parseInt(parts[2]) || 4;

  if (!telegramId) {
    return ctx.reply('Foydalanish: /give_premium [telegram_id] [oylar]\nMisol: /give_premium 123456789 4');
  }

  try {
    const res = await apiPost('/api/premium/admin-activate', {
      telegramId, method: 'admin_gift', months
    });

    if (res.ok) {
      await ctx.reply('Premium berildi!\nID: ' + telegramId + '\nMuddat: ' + months + ' oy');
      await bot.telegram.sendMessage(telegramId,
        'Tabriklaymiz! Admin tomonidan ' + months + ' oylik Premium berildi!\n' +
        'Barcha darslar ochildi. KoreysApp ni oching!'
      ).catch(() => {});
    } else {
      ctx.reply('Xato: ' + (res.error || 'Noma\'lum xato'));
    }
  } catch (e) {
    ctx.reply('Xato: ' + e.message);
  }
});

// ── /revoke ───────────────────────────────────────────────────────────────────
bot.command('revoke', adminOnly, async (ctx) => {
  const telegramId = parseInt(ctx.message.text.split(' ')[1]);
  if (!telegramId) return ctx.reply('Foydalanish: /revoke [telegram_id]');

  try {
    const res = await apiPost('/api/premium/revoke', { telegramId });
    if (res.ok) {
      ctx.reply('Premium bekor qilindi. ID: ' + telegramId);
    } else {
      ctx.reply('Xato: ' + (res.error || 'Noma\'lum xato'));
    }
  } catch (e) {
    ctx.reply('Xato: ' + e.message);
  }
});

// ── /find ─────────────────────────────────────────────────────────────────────
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
      'Ism: ' + (user.name || 'Noma\'lum') + '\n' +
      'Username: ' + (user.username ? '@' + user.username : '-') + '\n' +
      'Telegram ID: ' + user.telegram_id + '\n' +
      'Premium: ' + (user.is_premium ? 'Ha (' + until + ' gacha)' : 'Yoq') + '\n' +
      'Darslar: ' + (user.lessons_done || 0) + '\n' +
      'XP: ' + (user.xp || 0) + '\n' +
      'Qo\'shilgan: ' + new Date(user.created_at).toLocaleDateString('uz'),
      Markup.inlineKeyboard([
        [Markup.button.callback('Premium ber (4 oy)', 'give_' + user.telegram_id)],
        [Markup.button.callback('Premiumni bekor qil', 'revoke_' + user.telegram_id)],
      ])
    );
  } catch (e) {
    ctx.reply('Xato: ' + e.message);
  }
});

// ── /broadcast ────────────────────────────────────────────────────────────────
bot.command('broadcast', adminOnly, async (ctx) => {
  const text = ctx.message.text.split(' ').slice(1).join(' ');
  if (!text) return ctx.reply('Foydalanish: /broadcast [matn]\nMisol: /broadcast Yangi darslar qo\'shildi!');

  ctx.reply('Xabar yuborilmoqda...');

  try {
    const data = await apiGet('/api/stats/admin/users?limit=10000');
    const users = data.users || [];
    let sent = 0, failed = 0;

    for (const user of users) {
      try {
        await bot.telegram.sendMessage(user.telegram_id, text);
        sent++;
        await new Promise(r => setTimeout(r, 50)); // rate limit
      } catch (e) {
        failed++;
      }
    }

    ctx.reply('Broadcast tugadi!\nYuborildi: ' + sent + '\nXato: ' + failed);
  } catch (e) {
    ctx.reply('Xato: ' + e.message);
  }
});

bot.hears('📢 Broadcast', adminOnly, (ctx) => {
  ctx.reply('Xabar matnini yozing:\n/broadcast [matn]\n\nMisol:\n/broadcast Yangilik! Yangi darslar qo\'shildi!');
});

// ── /health ───────────────────────────────────────────────────────────────────
bot.command('health', adminOnly, async (ctx) => {
  try {
    const start = Date.now();
    const data = await fetch(API_URL + '/health').then(r => r.json());
    const ping = Date.now() - start;

    ctx.reply(
      'TIZIM HOLATI:\n\n' +
      'Backend: ' + (data.status === 'ok' ? 'Online' : 'Xato') + '\n' +
      'Ping: ' + ping + 'ms\n' +
      'DB: Online\n' +
      'Bot: Online\n\n' +
      'Frontend: https://koreysapp-qql1.vercel.app\n' +
      'Backend: ' + API_URL
    );
  } catch (e) {
    ctx.reply('Backend javob bermayapti!\nXato: ' + e.message);
  }
});

bot.hears('🔧 Tizim holati', adminOnly, async (ctx) => {
  ctx.message.text = '/health';
  try {
    const start = Date.now();
    const data = await fetch(API_URL + '/health').then(r => r.json());
    const ping = Date.now() - start;
    ctx.reply('Backend: ' + (data.status === 'ok' ? 'Online' : 'Xato') + ' | Ping: ' + ping + 'ms');
  } catch (e) {
    ctx.reply('Backend javob bermayapti!');
  }
});

// ── Screenshot: Payment qabul qilish ─────────────────────────────────────────
bot.on('photo', async (ctx) => {
  if (isAdmin(ctx)) return; // Admin o'zi rasm yubormaydi

  const userId = ctx.from.id;
  const username = ctx.from.username ? '@' + ctx.from.username : ctx.from.first_name;
  const caption = ctx.message.caption || 'yoq';
  const photoId = ctx.message.photo[ctx.message.photo.length - 1].file_id;

  for (const adminId of ADMIN_IDS) {
    try {
      await bot.telegram.sendPhoto(adminId, photoId, {
        caption:
          'YANGI TOLOV SCREENSHOT!\n\n' +
          'User: ' + username + '\n' +
          'Telegram ID: ' + userId + '\n' +
          'Izoh: ' + caption,
        ...Markup.inlineKeyboard([
          [Markup.button.callback('Premium Ochish (4 oy)', 'approve_' + userId)],
          [Markup.button.callback('Rad etish', 'reject_' + userId)],
        ]),
      });
    } catch (e) {
      console.error('Admin ga xabar jonatolmadi:', e.message);
    }
  }

  return ctx.reply(
    'Screenshot qabul qilindi!\n\n' +
    'Admin 5-30 daqiqa ichida Premium ochadi.\n' +
    'Agar 1 soat ichida ochilmasa, /support yozing.'
  );
});

// ── Admin inline actions ──────────────────────────────────────────────────────
bot.action(/^approve_(\d+)$/, async (ctx) => {
  if (!isAdmin(ctx)) return ctx.answerCbQuery('Ruxsat yoq!');
  const targetId = parseInt(ctx.match[1]);
  ctx.answerCbQuery('Ochilmoqda...');

  try {
    const res = await apiPost('/api/premium/admin-activate', {
      telegramId: targetId, method: 'card', months: 4
    });

    if (res.ok) {
      await ctx.editMessageCaption(
        (ctx.callbackQuery.message.caption || '') + '\n\nPREMIUM OCHILDI (4 oy)!'
      );
      await bot.telegram.sendMessage(targetId,
        'Tabriklaymiz! Premium faollashtirildi!\n\n' +
        'Barcha 127+ dars ochildi!\n' +
        'Muddat: 4 oy\n\n' +
        'KoreysApp ni oching: ' + APP_URL
      );
    } else {
      ctx.reply('Xato: ' + (res.error || 'Noma\'lum'));
    }
  } catch (e) {
    ctx.reply('Server xatosi: ' + e.message);
  }
});

bot.action(/^reject_(\d+)$/, async (ctx) => {
  if (!isAdmin(ctx)) return ctx.answerCbQuery('Ruxsat yoq!');
  const targetId = parseInt(ctx.match[1]);
  ctx.answerCbQuery('Rad etildi');

  await ctx.editMessageCaption(
    (ctx.callbackQuery.message.caption || '') + '\n\nRAD ETILDI'
  );
  await bot.telegram.sendMessage(targetId,
    'Tolov tasdiqlanmadi.\n\n' +
    'Sabab: Screenshot notogri yoki tolov topilmadi.\n' +
    'Qaytadan urining yoki /support yozing.'
  );
});

bot.action(/^give_(\d+)$/, adminOnly, async (ctx) => {
  const targetId = parseInt(ctx.match[1]);
  ctx.answerCbQuery('Premium berilmoqda...');
  const res = await apiPost('/api/premium/admin-activate', { telegramId: targetId, method: 'admin_gift', months: 4 }).catch(e => ({ ok: false, error: e.message }));
  if (res.ok) {
    ctx.reply('Premium berildi! ID: ' + targetId);
    bot.telegram.sendMessage(targetId, 'Admin tomonidan 4 oylik Premium berildi! Barcha darslar ochildi.').catch(() => {});
  } else {
    ctx.reply('Xato: ' + res.error);
  }
});

bot.action(/^revoke_(\d+)$/, adminOnly, async (ctx) => {
  const targetId = parseInt(ctx.match[1]);
  ctx.answerCbQuery('Bekor qilinmoqda...');
  const res = await apiPost('/api/premium/revoke', { telegramId: targetId }).catch(e => ({ ok: false, error: e.message }));
  ctx.reply(res.ok ? 'Premium bekor qilindi. ID: ' + targetId : 'Xato: ' + res.error);
});

// ── Non-admin users: silent (Mini App only) ──────────────────────────────────
bot.on('message', async (ctx) => {
  if (isAdmin(ctx)) return;
  // Photo = payment screenshot
  if (ctx.message?.photo) return; // handled separately
  // Ignore all other messages silently — users should use Mini App
});

// ── Kunlik statistika (har kuni 09:00) ───────────────────────────────────────
function scheduleDailyReport() {
  const now = new Date();
  const next9 = new Date();
  next9.setHours(9, 0, 0, 0);
  if (next9 <= now) next9.setDate(next9.getDate() + 1);
  const delay = next9 - now;

  setTimeout(async () => {
    try {
      const data = await apiGet('/api/stats/admin');
      const msg =
        'KUNLIK HISOBOT\n\n' +
        'Jami userlar: ' + (data.total_users || 0) + '\n' +
        'Premium: ' + (data.premium_users || 0) + '\n' +
        'Bugun yangi: ' + (data.today_new || 0) + '\n' +
        'Bugun aktiv: ' + (data.today_active || 0) + '\n' +
        'Bugun darslar: ' + (data.today_lessons || 0) + '\n\n' +
        'Tolovlar bugun: ' + (data.today_payments || 0);

      for (const adminId of ADMIN_IDS) {
        await bot.telegram.sendMessage(adminId, msg).catch(() => {});
      }
    } catch (e) {
      console.error('Daily report error:', e.message);
    }
    scheduleDailyReport(); // keyingi kun uchun
  }, delay);
}

// ── Launch ────────────────────────────────────────────────────────────────────
bot.launch();
console.log('Admin bot started');
scheduleDailyReport();
console.log('Daily report scheduled');

process.once('SIGINT',  () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
