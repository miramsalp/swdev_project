const Reservation = require('../models/Reservation')
const Space = require('../models/Space')
//@desc Get all spacess
//@route GET /api/v1/spaces
//@access Public
exports.getSpaces = async (req, res, next) => {
    let query

    const reqQuery = {...req.query}
    const removeFields = ['select', 'sort', 'page', 'limit']
    removeFields.forEach(param => delete reqQuery[param])
    console.log(reqQuery)   

    let queryStr = JSON.stringify(reqQuery)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
    query = Space.find(JSON.parse(queryStr)).populate('reservations')

    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ')
        query = query.select(fields)
    }

    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
    } else {
        query = query.sort('-createdAt')
    }

    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 25
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const total = await Space.countDocuments()
    
    query = query.skip(startIndex).limit(limit)

    try {
        const spaces = await query
        // console.log(queryStr); 
        // Pagination result  
        const pagination = {}
        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            }
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            }
        }   
        res.status(200).json({success: true, count: spaces.length, pagination, data: spaces})
    } catch (error) {
        res.status(400).json({success: false})
    }
}

//@desc Get single space
//@route GET /api/v1/spaces/:id
//@access Public
exports.getSpace = async (req, res, next) => {
    try {
        const space = await Space.findById(req.params.id)

        if (!space) {
            return res.status(400).json({success: false})
        }

        res.status(200).json({success: true, data: space})
    } catch (error) {
        res.status(400).json({success: false})
    }
}

//@desc Create new space
//@route POST /api/v1/spaces
//@access Private
exports.createSpace = async (req, res, next) => {
    const space = await Space.create(req.body)
    res.status(201).json({success: true, data: space})
}

//@desc Update space
//@route PUT /api/v1/spaces/:id
//@access Private
exports.updateSpace = async (req, res, next) => {
    try {
        const space = await Space.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if (!space) {
            return res.status(400).json({success: false})
        }

        res.status(200).json({success: true, data: space})
    } catch (error) {
        res.status(400).json({success: false})
    }
}

//@desc Delete space
//@route DELETE /api/v1/spaces/:id
//@access Private
exports.deleteSpace = async (req, res, next) => {
    try {
        const space = await Space.findById(req.params.id)

        if (!space) {
            return res.status(400).json({success: false, message: `Space not found with id of ${req.params.id}`})
        }
        await Reservation.deleteMany({ space: req.params.id })
        await Space.deleteOne({ _id: req.params.id })

        res.status(200).json({success: true, data: {}})
    } catch (error) {
        res.status(400).json({success: false})  
    }
}
