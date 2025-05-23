import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { fetchPostsAPI } from './postsApi';

// Use the separated API function here
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  return await fetchPostsAPI();
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addPost: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(post) {
        return {
          payload: {
            id: nanoid(),
            ...post,
          },
        };
      },
    },
    editPost(state, action) {
      const { id, title, body } = action.payload;
      const post = state.items.find(p => p.id === id);
      if (post) {
        post.title = title;
        post.body = body;
      }
    },
    deletePost(state, action) {
      state.items = state.items.filter(post => post.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addPost, editPost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
