import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from '../features/jobs/jobsSlice';

// configuring the redux store here
export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
  },
});
