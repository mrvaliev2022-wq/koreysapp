# 🇰🇷 KoreysApp v2.0

O'zbeklar uchun koreys tili o'rgatish Telegram Mini App.

## Tuzilma
```
koreysapp/
├── frontend/   React + Vite → Vercel
├── backend/    Node.js + Express → Railway
└── bot/        Telegraf.js → Railway
```

## 1-kun: Setup

### GitHub
```bash
git init
git remote add origin https://github.com/YOUR_USERNAME/koreysapp.git
```

### Backend (Railway)
1. railway.app → New Project → Deploy from GitHub → `/backend`
2. Add PostgreSQL plugin
3. Add Redis plugin
4. Environment variables:
   - `BOT_TOKEN` = BotFather tokeningiz
   - `FRONTEND_URL` = https://koreysapp.vercel.app
   - `DATABASE_URL` va `REDIS_URL` Railway avtomatik qo'shadi

5. DB schemani deploy qiling:
```bash
psql $DATABASE_URL -f backend/src/schema.sql
```

### Frontend (Vercel)
1. vercel.com → New Project → GitHub → `/frontend`
2. Environment variables:
   - `VITE_API_URL` = Railway backend URL

### Bot (Railway — alohida service)
1. Railway → New Service → `/bot`
2. Environment variables:
   - `BOT_TOKEN`
   - `MINI_APP_URL` = https://koreysapp.vercel.app
   - `API_URL` = Railway backend URL
   - `WEBHOOK_URL` = Railway bot URL

### BotFather sozlamalari
```
/newbot → KoreysApp → @koreysapp_bot
/setmenubutton → Mini App URL → "🇰🇷 Ochish"
/setdomain → koreysapp.vercel.app
```

## Kontent yuklash (dars qo'shish)
```bash
# backend/src/ ichida
node scripts/import-lesson.js path/to/lesson.docx
```

## Performance maqsadlar
- Birinchi yuklash: < 2s
- API javob: < 200ms
- Bundle: < 150kb
- 500+ concurrent users
