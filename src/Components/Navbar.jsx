import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import '../styles/Navbar.css';

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Don't render navbar on auth page
  if (location.pathname === '/auth') {
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth');
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/posts" className="nav-link">Posts</Link>
      </div>

      <div className="user-section">
        {user ? (
          <>
            <span className="user-welcome">Welcome, {user.name}</span>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        ) : (
          <Link to="/auth" className="nav-link">Login / Signup</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;