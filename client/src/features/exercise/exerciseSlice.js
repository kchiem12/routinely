import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import exerciseService from './exerciseService';

const initialState = {
    exercises: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

// get all users' exercises

// create exercise
export const createExercise = createAsyncThunk('exercise/create', async (exerciseData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await exerciseService.createExercise(exerciseData, token)
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message); 
    }
})

export const exerciseSlice = createSlice({
    name: 'exercise',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createExercise.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createExercise.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess= true;
            state.exercises.push(action.payload);
        })
        .addCase(createExercise.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});

// Have to export the reducer function too
export const {reset} = exerciseSlice.actions;
export default exerciseSlice.reducer;

