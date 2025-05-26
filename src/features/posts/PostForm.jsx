import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { createPost, editPost } from './postsSlice';
import '../../styles/Posts.css';

const PostForm = () => {
    const [form, setForm] = useState({
        title: '',
        body: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const currentUser = useSelector(state => state.auth.user);

    // Check if we're editing an existing post
    const editingPost = location.state?.post;
    const isEditing = Boolean(editingPost);

    useEffect(() => {
        // Redirect to login if not authenticated
        if (!currentUser) {
            navigate('/auth');
            return;
        }

        // If editing, populate form with existing post data
        if (editingPost) {
            setForm({
                title: editingPost.title,
                body: editingPost.body
            });
        }
    }, [currentUser, navigate, editingPost]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear any previous errors when user starts typing
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            if (isEditing) {
                await dispatch(editPost({
                    id: editingPost.id,
                    ...form
                })).unwrap();
            } else {
                await dispatch(createPost({
                    ...form,
                    userId: currentUser.id
                })).unwrap();
            }
            navigate('/posts');
        } catch (err) {
            console.error('Failed to save post:', err);
            setError(err.message || 'Failed to save post. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="post-form-container">
            <div className="post-form-header">

                <h1 className="post-form-title">
                    {isEditing ? 'Edit Post' : 'Create New Post'}
                </h1>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <div className="post-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="body" className="form-label">Content</label>
                        <textarea
                            id="body"
                            name="body"
                            value={form.body}
                            onChange={handleChange}
                            className="form-input form-textarea"
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() => navigate('/posts')}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="form-submit-button"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="loading-spinner"></span>
                                    {isEditing ? 'Saving...' : 'Creating...'}
                                </>
                            ) : (
                                isEditing ? 'Save Changes' : 'Create Post'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostForm; 