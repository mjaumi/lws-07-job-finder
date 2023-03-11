import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from '../features/filters/filtersSlice';
import jobsReducer from '../features/jobs/jobsSlice';
import jobReducer from '../features/job/jobSlice';

// configuring the redux store here
export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    job: jobReducer,
    jobs: jobsReducer,
  },
});
