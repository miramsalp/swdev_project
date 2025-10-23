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
    startTime: {
        type: String,
        required: true,
        default: "12:00"
    },
    endTime: {
        type: String,
        required: true,
        default: "13:00"
    },
    // dif endtime-starttime * hourly rate
    totalPrice: { 
        type: Number, 
        required: true,
        default: 0
    },
})

module.exports = mongoose.model('Reservation', ReservationSchema)