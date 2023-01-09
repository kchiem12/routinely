const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async(req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // get token from the header
            token = req.headers.authorization.split(' ')[1];

            // verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // get the user from the token (get the stuff from the token payload, since we put id in the payload)
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (err) {
            console.log(err);
            res.status(401);
            throw new Error("Not authorized route");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

module.exports = {protect};