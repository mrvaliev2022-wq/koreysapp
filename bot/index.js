require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());
app.use(rateLimit({ windowMs: 60_000, max: 100 }));

// Routes
app.use('/api/auth',        require('./routes/auth'));
app.use('/api/lessons',     require('./routes/lessons'));
app.use('/api/progress',    require('./routes/progress'));
app.use('/api/leaderboard', require('./routes/leaderboard'));
app.use('/api/premium',     require('./routes/premium'));
app.use('/api/stats',       require('./routes/stats'));

// Jobs
require('./jobs/dailyReset');

app.get('/health', (_, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
