import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addJob, deleteJob, editJob } from './jobAPI';

// initial state
const initialState = {
    isLoading: false,
    job: {},
    status: -1,
    isError: false,
    error: '',
};

// thunk function to add new job to the server
export const createJob = createAsyncThunk('job/createJob', async (data) => {
    const status = await addJob(data);
    return status;
});

// thunk function to edit existing job from the server
export const updateJob = createAsyncThunk('job/updateJob', async ({ id, data }) => {
    const status = await editJob({ id, data });
    return status;
});

// thunk function to delete job from the server
export const removeJob = createAsyncThunk('job/removeJob', async (id) => {
    const status = await deleteJob(id);
    return status;
});

const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        editedJob: (state, action) => {
            state.isError = false;
            state.job = action.payload;
        },

        resetStatus: (state) => {
            state.status = -1;
        },
    },
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
                state.status = action.payload;
            })
            .addCase(createJob.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.status = 0;
                state.error = action.error?.message;
            })
            // add cases for update job
            .addCase(updateJob.pending, state => {
                state.isLoading = true;
                state.isError = false;
                state.error = '';
            })
            .addCase(updateJob.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload;
            })
            .addCase(updateJob.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.status = 0;
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
                state.status = action.payload;
            })
            .addCase(removeJob.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.status = 0;
                state.error = action.error?.message;
            });
    }
});

export const { editedJob, resetStatus } = jobSlice.actions;
export default jobSlice.reducer;
