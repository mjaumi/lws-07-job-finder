import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { removeJob } from '../job/jobSlice';
import getJobs from './jobsAPI';

// initial state
const initialState = {
    isLoading: false,
    jobs: [],
    isError: false,
    error: '',
};

// thunk function to fetch jobs from the server
export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
    const jobs = await getJobs();
    return jobs;
});

// initiated jobs slice here
const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(fetchJobs.pending, state => {
                state.isLoading = true;
                state.isError = false;
                state.error = '';
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.jobs = action.payload;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.jobs = [];
                state.error = action.error?.message;
            })
            // removing specific job from the redux store after deleting
            .addCase(removeJob.fulfilled, (state, action) => {
                state.isLoading = false;
                state.jobs = state.jobs.filter(job => job.id !== action.meta.arg);
            });
    },
});

export default jobsSlice.reducer;
