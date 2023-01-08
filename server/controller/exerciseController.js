const { default: mongoose } = require('mongoose');
const Exercise = require('../models/Exercise');


// Create a new exercise into database
const createExercise = async (req, res) => {
    const {name, sets, reps, type, showRepsweights, weights} = req.body;
    try {
        const exercise = await Exercise.create({name, sets, reps, type, showRepsweights, weights});
        res.status(200).json(exercise);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

// Deletes an exercise
const deleteExercise = async (req, res) => {
    const {id} = req.params;

    // checks if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such exercise exists!"});
    }

    const exercise = await Exercise.findOneAndDelete({_id: id});

    if (!exercise) {
        return res.status(404).json({error: "No such exercise found!"});
    }

    res.status(200).json(exercise);
}

// Updates an exercise
const updateExercise = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such exercise exists!"});
    }

    const exercise = await Exercise.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if (!exercise) {
        return res.status(404).json({error: "No such exercise found!"});
    }

    res.status(200).json(exercise);

}

module.exports = {
    createExercise,
    deleteExercise,
    updateExercise
};