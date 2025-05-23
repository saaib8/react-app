import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCommentsByPostId } from './commentsApi';

// Async thunk to fetch comments for a post
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId, thunkAPI) => {
    try {
      const comments = await fetchCommentsByPostId(postId);
      return { postId, comments };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    commentsByPost: {},  // { postId: [comments] }
    loading: false,
    error: null,
  },
  reducers: {
    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      if (!state.commentsByPost[postId]) {
        state.commentsByPost[postId] = [];
      }
      state.commentsByPost[postId].push(comment);
    },
    updateComment: (state, action) => {
      const { postId, commentId, content } = action.payload;
      const comments = state.commentsByPost[postId] || [];
      const comment = comments.find(c => c.id === commentId);
      if (comment) comment.body = content;
    },
    deleteComment: (state, action) => {
      const { postId, commentId } = action.payload;
      state.commentsByPost[postId] = state.commentsByPost[postId].filter(c => c.id !== commentId);
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
        const { postId, comments } = action.payload;
        state.commentsByPost[postId] = comments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { addComment, updateComment, deleteComment } = commentsSlice.actions;

export default commentsSlice.reducer;
