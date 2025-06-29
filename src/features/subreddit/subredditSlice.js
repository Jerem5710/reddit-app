import { createSlice } from '@reduxjs/toolkit';


const subredditSlice = createSlice({
    name: 'subreddit',
    initialState: {
        selectedSubreddit: 'popular', // Default subreddit
    },
    reducers: {
        setSelectedSubreddit: (state, action) => {
            state.selectedSubreddit = action.payload;
        },
    },
});

export const { setSelectedSubreddit } = subredditSlice.actions;

export default subredditSlice.reducer;

// Exporting the selector to access the selected subreddit
