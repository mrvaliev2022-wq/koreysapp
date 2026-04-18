const router = require('express').Router();
const auth = require('../middleware/auth');

// POST /api/auth/login
// auth middleware already upserts user into DB and sets req.user
router.post('/login', auth, async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json(req.user);
});

module.exports = router;
