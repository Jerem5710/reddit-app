import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectSubreddit: 'popular',
}

const subredditSlice = createSlice({
    name: 'subreddit',
    initialState,
    reducers: {
        setSubreddit: (state, action) => {
            state.selectSubreddit = action.payload;
        },
    },
});

export const { setSubreddit } = subredditSlice.actions;

export default subredditSlice.reducer;

// Exporting the selector to access the selected subreddit
