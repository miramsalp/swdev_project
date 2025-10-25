const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');

// @desc    Create stripe checkout session
// @route   POST /api/v1/stripe/checkout
// @access  Private
exports.createCheckoutSession = async (req, res, next) => {
    const { amount } = req.body;
    const user = await User.findById(req.user.id);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'thb',
                    product_data: {
                        name: 'Top-up balance',
                    },
                    unit_amount: amount * 100,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        // this is dummy will design later or maybe redirect to home for both case -,.-
        success_url: `${process.env.FRONTEND_URL}/success`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        customer_email: user.email,
        client_reference_id: req.user.id,
    });

    res.status(200).json({
        success: true,
        id: session.url,
    });
};

// @desc    Stripe webhook
// @route   POST /api/v1/stripe/webhook
// @access  Public
exports.stripeWebhook = async (req, res, next) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.log(`Webhook signature verification failed.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log(`Received event: ${event.type}`);

    // handle case can use switch type if it huge but let assume T^T always complete
    if (event.type === 'checkout.session.completed') {
        console.log('checkout.session.completed event received');
        const session = event.data.object;
        const user = await User.findById(session.client_reference_id);
        const amount = session.amount_total / 100;

        if (user) {
            console.log(`User found: ${user.name}`);
            console.log(`Amount: ${amount}`);
            user.balance += amount;
            await user.save();
            console.log(`User balance updated: ${user.balance}`);
        } else {
            console.log('User not found');
        }
    }

    res.status(200).json({ received: true });
};
