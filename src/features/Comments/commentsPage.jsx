import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, addComment, updateComment, deleteComment } from './commentsSlice';

const CommentsSection = ({ postId }) => {
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comments.commentsByPost[postId]) || [];
  const loading = useSelector(state => state.comments.loading);
  const error = useSelector(state => state.comments.error);
  const currentUser = useSelector(state => state.auth.user);

  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  const handleAddComment = () => {
    if (!currentUser) return alert('Please log in to comment.');
    if (!newComment.trim()) return;

    const comment = {
      postId,
      id: Date.now(),
      name: currentUser.name,
      email: currentUser.email,
      body: newComment.trim(),
      userId: currentUser.id,  // attach userId for ownership checks
    };

    dispatch(addComment({ postId, comment }));
    setNewComment('');
  };

  const startEdit = (comment) => {
    if (comment.userId !== currentUser?.id) return alert("You can only edit your own comments.");
    setEditingCommentId(comment.id);
    setEditingContent(comment.body);
  };

  const saveEdit = () => {
    dispatch(updateComment({
      postId,
      commentId: editingCommentId,
      content: editingContent.trim(),
    }));
    setEditingCommentId(null);
    setEditingContent('');
  };

  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditingContent('');
  };

  const handleDelete = (comment) => {
    if (comment.userId !== currentUser?.id) return alert("You can only delete your own comments.");
    dispatch(deleteComment({ postId, commentId: comment.id }));
  };

  return (
    <div>
      <h4>Comments</h4>
      {loading && <p>Loading comments...</p>}
      {error && <p style={{color: 'red'}}>Error: {error}</p>}

      <ul>
        {comments.map(comment => (
          <li key={comment.id} style={{marginBottom: '1rem'}}>
            <p><b>{comment.name}</b> says:</p>

            {editingCommentId === comment.id ? (
              <>
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                />
                <button onClick={saveEdit}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <p>{comment.body}</p>
                {comment.userId === currentUser?.id && (
                  <>
                    <button onClick={() => startEdit(comment)}>Edit</button>
                    <button onClick={() => handleDelete(comment)}>Delete</button>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>

      {currentUser ? (
        <>
          <textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </>
      ) : (
        <p>Please log in to add comments.</p>
      )}
    </div>
  );
};

export default CommentsSection;
