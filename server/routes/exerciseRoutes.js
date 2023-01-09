const express = require('express');
const Exercise = require('../models/Exercise');
const { protect } = require('../middleware/authMiddleware');

const {
    getExercise,
    createExercise,
    deleteExercise,
    updateExercise
} = require('../controller/exerciseController');

const router = express.Router();

// GET request to get user exercise
router.get('/', protect, getExercise);

// Creating a model is asynchronous
// This is to create an exercise object in mongodb
router.post('/', protect, createExercise);

// Delete
router.delete('/:id', protect, deleteExercise);

// Update
router.put('/:id', protect, updateExercise);

module.exports = router;