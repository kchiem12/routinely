import axios from 'axios';

const API_URL = '/api/exercise/';

// Get all exercises
const getExercises = async (token) => {

    // Create the token header to pass into POST request
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get(API_URL, config);

    return response.data;
};

// Create an exercise
const createExercise = async (exerciseData, token) => {

    // Create the token header to pass into POST request
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.post(API_URL, exerciseData, config);

    return response.data;
};

const updateExercise = async (exerciseData) => {
    const response = await axios.put()
};

const deleteExercise = async (exerciseID) => {
    const response = await axios.delete(API_URL + 'exerciseID/');

    return response.data;
};

const exerciseService = {
    getExercises,
    createExercise,
    updateExercise,
    deleteExercise
};

export default exerciseService;
