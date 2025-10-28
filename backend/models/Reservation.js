const mongoose = require('mongoose')

const ReservationSchema = new mongoose.Schema({
    reservationDate: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    space: {
        type: mongoose.Schema.ObjectId,
        ref: 'Space',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // 0.5 * hourly rate
    totalPrice: { 
        type: Number, 
        required: true,
        default: 0
    },
})

module.exports = mongoose.model('Reservation', ReservationSchema)