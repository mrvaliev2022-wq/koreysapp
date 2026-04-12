const crypto = require('crypto');

function verifyTelegramWebApp(initData, botToken) {
  const params = new URLSearchParams(initData);
  const hash = params.get('hash');
  params.delete('hash');
  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join('\n');
  const secretKey = crypto
    .createHmac('sha256', 'WebAppData')
    .update(botToken)
    .digest();
  const expectedHash = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');
  return expectedHash === hash;
}

module.exports = async function authMiddleware(req, res, next) {
  const initData = req.headers['x-telegram-init-data'];
  if (!initData) return res.status(401).json({ error: 'No auth' });
  if (!verifyTelegramWebApp(initData, process.env.BOT_TOKEN)) {
    return res.status(401).json({ error: 'Invalid Telegram auth' });
  }
  const params = new URLSearchParams(initData);
  const user = JSON.parse(params.get('user') || '{}');
  req.telegramUser = user;
  next();
};
