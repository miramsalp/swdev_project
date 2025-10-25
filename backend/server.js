const express = require('express')  
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const cors = require('cors');
const auth = require('./routes/auth')
const reservations = require('./routes/reservations')
const spaces = require('./routes/spaces')

// Load env vars
dotenv.config({ path: './.env' });
const stripe = require('./routes/stripe')
const { stripeWebhook } = require('./controllers/stripe');

connectDB()

const app = express()
app.use(cors());

app.post('/api/v1/stripe/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

// Body parser
app.use(express.json())
// Route
app.use('/api/v1/auth', auth)
app.use('/api/v1/reservations', reservations)
app.use('/api/v1/spaces', spaces)
app.use('/api/v1/stripe', stripe)

const PORT = process.env.PORT || 5000

server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})
