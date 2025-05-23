import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, editPost } from './postsSlice';
import { useNavigate, useLocation } from 'react-router-dom';

const PostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const editingPost = location.state?.post || null;
  const currentUser = useSelector(state => state.auth.user);

  const [title, setTitle] = useState(editingPost?.title || '');
  const [body, setBody] = useState(editingPost?.body || '');

  useEffect(() => {
    if (!currentUser) {
      navigate('/auth'); // redirect to login if not authenticated
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingPost) {
      dispatch(editPost({ ...editingPost, title, body }));
    } else {
      const newPost = {
        id: Date.now(),
        userId: currentUser.id,
        title,
        body,
      };
      dispatch(addPost(newPost));
    }

    navigate('/posts');
  };

  return (
    <div className="container">
      <h2>{editingPost ? 'Edit Post' : 'Create New Post'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label><br />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          {editingPost ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
