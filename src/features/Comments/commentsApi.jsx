// src/features/comments/commentsAPI.js
export const fetchCommentsByPostId = async (postId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  return response.json();
};
