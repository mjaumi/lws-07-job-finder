import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from '../features/jobs/jobsSlice';
import jobReducer from '../features/job/jobSlice';

// configuring the redux store here
export const store = configureStore({
  reducer: {
    job: jobReducer,
    jobs: jobsReducer,
  },
});
