import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCommentsByPostId } from './commentsApi';

// Async thunk to fetch comments for a post
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (_, thunkAPI) => {
    try {
      // Fetch all posts first to get their IDs
      const posts = thunkAPI.getState().posts.items;
      const commentsPromises = posts.map(post => fetchCommentsByPostId(post.id));
      const commentsArrays = await Promise.all(commentsPromises);
      // Flatten the array of arrays into a single array of comments
      return commentsArrays.flat();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addComment: (state, action) => {
      state.items.push(action.payload);
    },
    updateComment: (state, action) => {
      const { id, ...updates } = action.payload;
      const comment = state.items.find(c => c.id === id);
      if (comment) {
        Object.assign(comment, updates);
      }
    },
    deleteComment: (state, action) => {
      state.items = state.items.filter(c => c.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { addComment, updateComment, deleteComment } = commentsSlice.actions;

export default commentsSlice.reducer;
