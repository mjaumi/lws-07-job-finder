import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addJob } from './jobAPI';

// initial state
const initialState = {
    isLoading: false,
    job: {},
    isError: false,
    error: '',
};

// thunk function to add new job to the server
export const createJob = createAsyncThunk('job/createJob', async (data) => {
    const job = addJob(data);
    return job;
});

const jobSlice = createSlice({
    name: 'job',
    initialState,
    extraReducers: builder => {
        builder
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
                state.job = [];
                state.error = action.error?.message;
            });
    }
});

export default jobSlice.reducer;
