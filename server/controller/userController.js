const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');


// POST request that registers user
// Route: /api/users/
const registerUser = asyncHandler(async(req, res) => {

    const {firstName, lastName, password, email} = req.body;

    if (!firstName || !lastName || !password || !email) {
        res.status(500);
        throw new Error("Please fill every field");
    }

    // checks if user exists by looking for the username
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(500);
        throw new Error("User already exists");
    }

    // hash password with bcrypt
    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
        firstName,
        lastName,
        password: hashedPassword,
        email,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(500);
        throw new Error("Invalid user input");
    }
});

// POST request that authenticates the user
// Route: /api/users/login/
const loginUser = asyncHandler(async(req, res) => {

    const {email, password} = req.body;
    
    // finds if user exists
    const user = await User.findOne({email});

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(500);
        throw new Error("Invalid credentials");
    }
});

// GET request that gets the user data
// Route: /api/users/me/
const getUser = asyncHandler(async(req, res) => {
    const { _id, firstName, lastName, email, password } = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        firstName,
        lastName,
        email
    });

});

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '1d' });
}

module.exports = {
    registerUser,
    loginUser,
    getUser
};