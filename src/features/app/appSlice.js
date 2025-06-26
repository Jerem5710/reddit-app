import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'idle', // idle | loading | succeeded | failed
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {},
});

export default appSlice.reducer;