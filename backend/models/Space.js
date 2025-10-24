const mongoose = require('mongoose')    

const SpaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    district: {
        type: String,
        required: [true, 'Please add a district']
    },
    province: {
        type: String,
        required: [true, 'Please add a province']
    },
    postalcode: {
        type: String,
        required: [true, 'Please add a postal code'],
        maxlength: [5, 'Postal code cannot be more than 5 digits']
    },
    tel: {
        type: String
    },
    openTime: {
        type: String,
        required: true,
        default: "08:00"
    },
    closeTime: {
        type: String, 
        required: true,
        default: "22:00"
    },
    // this one prepare for future payment
    hourlyRate: {
        type: Number,
        required: [true, 'Please add the hourly rate for this space'],
        default: 0
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
})

SpaceSchema.virtual('reservations', {
    ref: 'Reservation',
    localField: '_id',
    foreignField: 'space',
    justOne: false
})

module.exports = mongoose.model('Space', SpaceSchema)
