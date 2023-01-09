const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Add name"]
    },
    lastName: {
        type: String,
        required: [true, "Add name"]
    },
    password: {
        type: String,
        required: [true, "Add a password"]
    },
    email: {
        type: String,
        required: [true, "Add email"]
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);