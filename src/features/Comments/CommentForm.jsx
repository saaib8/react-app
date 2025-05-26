import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from './commentsSlice';
import { addComment as addCommentApi } from './commentsApi';

const CommentForm = ({ postId }) => {
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        try {
            const newComment = await addCommentApi(postId, {
                body: comment,
                name: currentUser?.name || 'Anonymous',
                email: currentUser?.email || 'anonymous@example.com'
            });

            dispatch(addComment(newComment));
            setComment('');
        } catch (error) {
            console.error('Failed to add comment:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="comment-form">
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="comment-input"
                rows="3"
            />
            <button type="submit" className="comment-submit-button">
                Post Comment
            </button>
        </form>
    );
};

export default CommentForm; 