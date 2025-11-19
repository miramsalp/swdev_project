const User = require('../models/User')

/**
 * @desc    Register a new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 * @param   {object} req.body - The body of the request
 * @param   {string} req.body.name - User's name
 * @param   {string} req.body.email - User's email (must be unique)
 * @param   {string} req.body.password - User's password (min 6 chars)
 * @param   {string} req.body.phone - User's phone 
 * @returns {void}
 * @success {object} 200 - { success: true, token: string, _id: string, name: string, email: string, phone: string }
 * @error   {object} 400 - { success: false } (e.g., validation error, duplicate email)
 */
exports.register = async (req, res, next) => {
    // res.status(200).json({success: true})
    try {
        const { name, email, password, phone } = req.body

        const user = await User.findOne({email: email});
        if(user) {
            res.status(400).json({ success: false, msg: "This email has already been registered"});
            return;
        }
        // Create user
        const newUser = await User.create({
            name,
            email,
            password,
            phone,
            role: 'user'
        })


        sendTokenResponse(user, 200, res);
    } catch (error) {
        res.status(400).json({ success: false })
        console.log(error.stack);
    }
}

/**
 * @desc    Login an existing user
 * @route   POST /api/v1/auth/login
 * @access  Public
 * @param   {string} req.body.email - User's registered email
 * @param   {string} req.body.password - User's password
 * @param   {object} res - Express response object
 * @returns {void}
 * @success {object} 200 - { success: true, token: string, ... (user details) }
 * @error   {object} 400 - { success: false, msg: 'Please provide an email and password' } (Missing fields)
 * @error   {object} 400 - { success: false, msg: 'Invalid credentials' } (User not found)
 * @error   {object} 401 - { success: false, msg: 'Invalid credentials' } (Password mismatch)
 */
exports.login = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            msg: 'Please provide an email and password'
        })
    }
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return res.status(400).json({
            success: false,
            msg: 'Invalid credentials'
        })
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
        return res.status(401).json({
            success: false,
            msg: 'Invalid credentials'
        })
    }

    sendTokenResponse(user, 200, res);
}

/**
 * Generates a JWT, prepares cookie options, 
 * and sends a JSON response with the token and core user data.
 * @param {object} user - The Mongoose user object 
 * @param {number} statusCode - The HTTP status code to send (e.g., 200)
 * @returns {void} - Sends a JSON response.
 */
const sendTokenResponse = (user, statusCode, res) => {
    //Create token
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }
    res.status(statusCode)/*.cookie('token',token,options)*/.json({
        success: true,
        //add for frontend
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        //end for frontend
        token
    })
}

/**
 * @desc    Get details of the currently authenticated user
 * @route   POST /api/v1/auth/me 
 * @access  Private 
 * @param   {object} req.user - User object attached by the 'protect' in ./middleware/auth.js
 * @returns {void}
 * @success {object} 200 - { success: true, data: User }
 * @error   {object} 404 - { success: false, msg: 'User not found' } 
 */
exports.getMe = async (req, res, next) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        return res.status(404).json({
            success: false,
            msg: 'User not found'
        });
    }

    res.status(200).json({
        success: true,
        data: user
    })
}