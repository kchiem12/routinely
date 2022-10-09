const express = require('express');
const Exercise = require('../models/Exercise');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({message: "HELLO WORLD"});
});

// Creating a model is asynchronous
router.post('/', async (req, res) => {
    const {name, sets, reps, type, showRepsweights, weights} = req.body;
    try {
        const exercise = await Exercise.create({name, sets, reps, type, showRepsweights, weights});
        res.status(200).json(exercise);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

module.exports = router;