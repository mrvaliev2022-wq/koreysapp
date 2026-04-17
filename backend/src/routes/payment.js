const router = require('express').Router();
const db = require('../db');

router.get('/card-info', (req, res) => {
  res.json({
    number: process.env.CARD_NUMBER || '5614681264029681',
    owner:  process.env.CARD_OWNER  || 'V***** O**** M.',
    bank:   process.env.CARD_BANK   || 'Uzcard',
    amount: process.env.CARD_AMOUNT || '29 000',
  });
});

module.exports = router;