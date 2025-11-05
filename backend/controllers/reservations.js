const Reservation = require('../models/Reservation')
const Space = require('../models/Space')
const mongoose = require('mongoose')
const User = require('../models/User')

//@desc Get all reservations
//@route GET /api/v1/reservations
//@access Public
exports.getReservations = async (req, res, next) => {
    let query;
    console.log(req.user)
    if (req.user.role !== 'admin') {
        query = await Reservation.find({ user: req.user.id }).populate({
            path: 'space',
            select: 'name province tel'
        }).populate({
            path: 'user',
            select: 'name' 
        })
    } else {
        if (req.params.spaceId) {
            console.log(req.params.spaceId)
            query = Reservation.find({ space: req.params.spaceId }).populate({
                path: 'space',
                select: 'name province tel'
            })
        } else {
            query = Reservation.find().populate({
                path: 'space',
                select: 'name province tel'
            })
        }
    }

    try {
        const reservations = await query

        res.status(200).json({ success: true, count: reservations.length, data: reservations })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: 'Cannot find Reservation' });
    }
}

//@desc Get single reservation
//@route GET /api/v1/reservations/:id
//@access Public
exports.getReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id).populate({
            path: 'space',
            select: 'name address district province postalcode tel openTime closeTime'
        })

        if (!reservation) {
            return res.status(404).json({success:false, message: `No reservation with the id of ${req.params.id}`})
        }

        res.status(200).json({success:true, data: reservation})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Cannot find Reservation"})
    }
}

//@desc   Add reservation
//@route  POST /api/v1/spaces/:spaceId/reservations
//@access Private
exports.addReservation = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        req.body.space = req.params.spaceId

        const space = await Space.findById(req.params.spaceId)

        if (!space) {
            return res.status(404).json({success: false, message: `No space with the id of ${req.params.hospitalId}`})
        }

        // add user id to req body
        req.body.user = req.user.id
        const user = await User.findById(req.user.id).session(session)
        // check for existed reservation
        const existedReservations = await Reservation.find({ user: req.user.id, reservationDate: { $gt : new Date()} }).session(session)

        // If user not admin cant create exceed 3

        if (existedReservations.length >= 3 && req.user.role !== 'admin') {
            return res.status(400).json({success: false, message: `The user with ID ${req.user.id} has already made 3 reservations`})
        }
 
        // use 0.5 of hourlyRate as fee to reservation
        const calculatedPrice = 0.5 * space.hourlyRate;

        if (user.balance < calculatedPrice) {
            return res.status(400).json({ success: false, message: 'Insufficient balance' });
        }
        // Check if startTime, endTime out of bound with openCloseTime
        

        // add price to body
        req.body.totalPrice = calculatedPrice

        // update balance
        user.balance -= calculatedPrice;
        await user.save({ session });

        space.balance += calculatedPrice;
        await space.save({ session })

        const [reservation] = await Reservation.create([req.body], { session })

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success: true,
            data: reservation
        })

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log(error);
        return res.status(500).json({success: false, message: "Cannot create Reservation"})
    }
}

//@desc Update reservation
//@route PUT /api/v1/reservations/:id
//@access Private
exports.updateReservation = async (req, res, next) => {
    try {
        let reservation = await Reservation.findById(req.params.id)

        if (!reservation) {
            res.status(404).json({success: false, message: `No reservation with the id of ${req.params.id}`})
        }

        if (reservation.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({success: false, message: `User ${req.user.id} is not authorized to update this reservation`})
        }

        reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            data: reservation
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Cannot update Reservation"})
    }
}

//@desc Delete reservation
//@route DELETE /api/v1/reservations/:id
//@access Private
exports.deleteReservation = async (req, res, next) => {
    try {
        let reservation = await Reservation.findById(req.params.id)

        if (!reservation) {
            res.status(404).json({success: false, message: `No reservation with the id of ${req.params.id}`})
        }
        
        if (reservation.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({success: false, message: `User ${req.user.id} is not authorized to delete this reservation`})
        }

        await reservation.deleteOne()

        res.status(200).json({
            success: true,
            data: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Cannot delete Reservation"})
    }
}