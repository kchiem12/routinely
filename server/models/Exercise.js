const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    reps: {
        type: Array,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    showReps: {
        type: Boolean
    },
    weights: {
        type: Array
    }
}, {timestamps: true});

module.exports = mongoose.model('Exercises', exerciseSchema);