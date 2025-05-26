import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, deletePost } from './postsSlice';
import { fetchComments } from '../Comments/commentsSlice';
import CommentForm from '../Comments/CommentForm';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Posts.css';

const PostsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: posts, loading, error } = useSelector(state => state.posts);
  const { items: comments } = useSelector(state => state.comments);
  const currentUser = useSelector(state => state.auth.user);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchComments());
  }, [dispatch]);

  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
  };

  const handleEdit = (post) => {
    navigate('/edit-post', { state: { post } });
  };

  if (loading) return <div className="posts-container"><p>Loading posts...</p></div>;
  if (error) return <div className="posts-container"><p>Error: {error}</p></div>;

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h1 className="posts-title">Posts</h1>
        <Link to="/posts/new" className="create-post-button">Create New Post</Link>
      </div>

      <ul className="post-list">
        {posts.map(post => (
          <li key={post.id} className="post-item">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-content">{post.body}</p>

            {currentUser && currentUser.id === post.userId && (
              <div className="post-actions">
                <button
                  onClick={() => handleEdit(post)}
                  className="post-button edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="post-button delete-button"
                >
                  Delete
                </button>
              </div>
            )}

            <div className="comments-section">
              <h3 className="comments-title">Comments</h3>
              <ul className="comment-list">
                {comments
                  .filter(comment => comment.postId === post.id)
                  .map(comment => (
                    <li key={comment.id} className="comment-item">
                      <div className="comment-author">{comment.name}</div>
                      <p className="comment-content">{comment.body}</p>
                    </li>
                  ))}
              </ul>
              {currentUser && <CommentForm postId={post.id} />}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsPage;
