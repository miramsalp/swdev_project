const express = require('express');
const router = express.Router();
const {getSpaces, getSpace, createSpace, updateSpace, deleteSpace} = require('../controllers/spaces');
const {protect, authorize} = require('../middleware/auth')
const reservationRouter = require('./reservations')

// Re-route into other resource routers
router.use('/:spaceId/reservations', reservationRouter);

router.route('/').get(getSpaces).post(protect, authorize('admin'), createSpace);
router.route('/:id').get(getSpace).put(protect, authorize('admin'), updateSpace).delete(protect, authorize('admin'), deleteSpace);

module.exports = router;