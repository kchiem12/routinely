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
export const getExercises = createAsyncThunk('exercise/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await exerciseService.getExercises(token);
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message); 
    }
})

// create exercise
export const createExercise = createAsyncThunk('exercise/create', async (exerciseData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await exerciseService.createExercise(exerciseData, token)
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message); 
    }
});

// delete exercise
export const deleteExercise = createAsyncThunk('exercise/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await exerciseService.deleteExercise(id, token)
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message); 
    }
});

// update exercise
export const updateExercise = createAsyncThunk('exercise/update', async (exerciseData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await exerciseService.updateExercise(exerciseData.formData, exerciseData.exerciseID, token)
    } catch (err) {
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message); 
    }
});



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
        .addCase(getExercises.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getExercises.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess= true;
            state.exercises = action.payload;
        })
        .addCase(getExercises.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteExercise.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteExercise.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess= true;
            state.exercises = state.exercises.filter((exercise) => exercise._id !== action.payload.id); // filter goal with id
        })
        .addCase(deleteExercise.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(updateExercise.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateExercise.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess= true;
            console.log(action.payload);
            // edit only the exercise with the same ID
            for (var i = 0; i < state.exercises.length; i++) {
                if (state.exercises[i]._id === action.payload._id) {
                    state.exercises[i] = action.payload;
                    break;
                }
            }
        })
        .addCase(updateExercise.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            console.log(action.payload);
            state.message = action.payload;
        })
    }
});

// Have to export the reducer function too
export const {reset} = exerciseSlice.actions;
export default exerciseSlice.reducer;

