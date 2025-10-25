const express = require('express');
const { createCheckoutSession } = require('../controllers/stripe');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/checkout', protect, createCheckoutSession);
// router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

module.exports = router;
