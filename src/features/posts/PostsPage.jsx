import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, deletePost } from './postsSlice';
import { Link, useNavigate } from 'react-router-dom';

const PostsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: posts, loading, error } = useSelector(state => state.posts);
  const currentUser = useSelector(state => state.auth.user);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
  };

  const handleEdit = (post) => {
    navigate('/edit-post', { state: { post } });
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h2>Posts</h2>
      <Link to="/create-post" className="btn">Create New Post</Link>
      <ul>
        {posts.map(post => (
          <li key={post.id} style={{ margin: '1rem 0', borderBottom: '1px solid #ccc' }}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            {currentUser && currentUser.id === post.userId && (
              <>
                <button onClick={() => handleEdit(post)}>Edit</button>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsPage;
