import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    filterBy: 'All',
    searchBy: '',
    sortBy: 'Default',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtered: (state, action) => {
            state.filterBy = action.payload;
        },
        searched: (state, action) => {
            state.searchBy = action.payload;
        },
        sorted: (state, action) => {
            state.sortBy = action.payload;
        },
    },
});

export const { filtered, searched, sorted } = filtersSlice.actions;
export default filtersSlice.reducer;
