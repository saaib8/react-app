import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice";
import postsReducer from '../features/posts/postsSlice';
import commentsReducer from '../features/Comments/commentsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export default store;
