import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/Auth/Auth';
import goalReducer from '../redux/Goals/GoalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
  },
});
