const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    sets: {
        type: Number,
    },
    reps: {
        type: Array,
    },
    weights: {
        type: Array,
    },
    time: {
        type: Number,
    },
    pace: {
        type: Number,
    }
}, {timestamps: true});

module.exports = mongoose.model('Exercise', exerciseSchema);