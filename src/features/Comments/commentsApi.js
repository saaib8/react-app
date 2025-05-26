import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchCommentsByPostId = async (postId) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch comments');
  }
};

export const addComment = async (postId, comment) => {
  try {
    const response = await axios.post(`${API_URL}/comments`, {
      postId,
      ...comment
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to add comment');
  }
};

export const updateComment = async (commentId, comment) => {
  try {
    const response = await axios.put(`${API_URL}/comments/${commentId}`, comment);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update comment');
  }
};

export const deleteComment = async (commentId) => {
  try {
    await axios.delete(`${API_URL}/comments/${commentId}`);
    return commentId;
  } catch (error) {
    throw new Error('Failed to delete comment');
  }
}; 