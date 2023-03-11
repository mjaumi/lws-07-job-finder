import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
    const jobs = getJobs();
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
            });
    },
});

export default jobsSlice.reducer;
