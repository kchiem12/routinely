const { default: mongoose } = require('mongoose');
const Exercise = require('../models/Exercise');
const asyncHandler = require('express-async-handler');

// GET request to get the user's exercises
const getExercise = asyncHandler(async(req, res) => {
    const exercise = await Exercise.find({ user: req.user.id });
    
    res.status(200).json(exercise);
});

// Create a new exercise into database
const createExercise = asyncHandler(async (req, res) => {

    const {name, date, type, sets, reps, weights, hours, minutes, seconds, distance} = req.body;

    if (!name || !date || !type) {
        res.status(400);
        throw new Error('Required fields are not inputted');
    }

    const exercise = await Exercise.create({
        user: req.user.id,
        name,
        date,
        type,
        sets,
        reps,
        weights,
        hours,
        minutes,
        seconds,
        distance
    });

    res.status(200).json(exercise);
});

// Deletes an exercise
const deleteExercise = asyncHandler(async (req, res) => {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
        res.status(400);
        throw new Error("Exercise not found");
    }

    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }

    if (exercise.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    await exercise.remove();

    res.status(200).json({id: req.params.id});
});

// Updates an exercise
const updateExercise = asyncHandler(async (req, res) => {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
        res.status(400);
        throw new Error("Exercise not found");
    }

    if (!req.user) {
        res.status(400);
        throw new Error("User not found");
    }

    if (exercise.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    const updatedExercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedExercise);
});

module.exports = {
    getExercise,
    createExercise,
    deleteExercise,
    updateExercise
};