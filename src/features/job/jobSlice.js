import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addJob, deleteJob } from './jobAPI';

// initial state
const initialState = {
    isLoading: false,
    job: {},
    isError: false,
    error: '',
};

// thunk function to add new job to the server
export const createJob = createAsyncThunk('job/createJob', async (data) => {
    const job = await addJob(data);
    return job;
});

// thunk function to delete job from the server
export const removeJob = createAsyncThunk('job/removeJob', async (id) => {
    const job = await deleteJob(id);
    return job;
});

const jobSlice = createSlice({
    name: 'job',
    initialState,
    extraReducers: builder => {
        builder
            // add cases for create job
            .addCase(createJob.pending, state => {
                state.isLoading = true;
                state.isError = false;
                state.error = '';
            })
            .addCase(createJob.fulfilled, (state, action) => {
                state.isLoading = false;
                state.job = action.payload;
            })
            .addCase(createJob.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.job = {};
                state.error = action.error?.message;
            })
            // add cases for remove job
            .addCase(removeJob.pending, state => {
                state.isLoading = true;
                state.isError = false;
                state.error = '';
            })
            .addCase(removeJob.fulfilled, (state, action) => {
                state.isLoading = false;
                state.job = action.payload;
            })
            .addCase(removeJob.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.job = {};
                state.error = action.error?.message;
            })
            ;
    }
});

export default jobSlice.reducer;
