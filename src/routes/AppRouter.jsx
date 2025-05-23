// src/routes/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AuthPage from '../features/auth/AuthPage';
import PostsPage from '../features/posts/PostsPage';
import PostForm from '../features/posts/PostsForm';
import ProtectedRoute from '../utils/protectedRoutes';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<PostsPage />} />
          <Route path="/posts/new" element={<PostForm />} />
          <Route path="/posts/edit/:postId" element={<PostForm />} />
          {/* Add other protected routes like comments if needed */}
        </Route>

        {/* Redirect unknown routes to / */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
