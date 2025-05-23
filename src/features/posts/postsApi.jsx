// src/features/posts/postsAPI.js
import axios from 'axios';

export const fetchPostsAPI = async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return res.data
};
