import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../features/app/appSlice";
import postsReducer from "../features/posts/postsSlice"; // Assuming you have a postsSlice defined
import subredditReducer from "../features/subreddit/subredditSlice"; // Assuming you have a subredditSlice defined

export const store = configureStore({
  reducer: {
    app: appReducer,
    posts: postsReducer, // Assuming you have a postsReducer defined
    subreddit: subredditReducer,
  },
});