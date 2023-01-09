const express = require('express');
const router = express.Router();
const {
    registerUser, loginUser, getUser
} = require('../controller/userController');
const { protect } = require("../middleware/authMiddleware");


// register the user
router.post('/', registerUser);
// register the user
router.post('/login/', loginUser);
// register the user
router.get('/me/', protect, getUser);

module.exports = router;