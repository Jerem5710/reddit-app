import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../features/app/appSlice";
import postsReducer from "../features/posts/postsSlice"; // Assuming you have a postsSlice defined

export const store = configureStore({
  reducer: {
    app: appReducer,
    posts: postsReducer, // Assuming you have a postsReducer defined
  },
});