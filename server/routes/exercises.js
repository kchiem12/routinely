const express = require('express');
const Exercise = require('../models/Exercise');
const {
    createExercise,
    deleteExercise,
    updateExercise
} = require('../controller/exerciseController');

const router = express.Router();


router.get('/', (req, res) => {
    res.json({message: "HELLO WORLD"});
});

// Creating a model is asynchronous
// This is to create an exercise object in mongodb
router.post('/', createExercise);

// Delete
router.delete('/:id', deleteExercise);

// Update
router.patch('/:id', updateExercise);

module.exports = router;