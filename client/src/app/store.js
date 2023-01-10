import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import exerciseReducer from '../features/exercise/exerciseSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        exercise: exerciseReducer,
    }
})