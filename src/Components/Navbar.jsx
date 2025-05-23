import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout} from '../features/auth/authSlice';

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth'); // Redirect to auth page after logout
  };

  return (

    <nav style={styles.nav}>
      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/posts" style={styles.link}>Posts</Link>
      </div>

      <div>
        {user ? (
          <>
            <span style={styles.userText}>Welcome, {user.name}</span>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        ) : (
          <Link to="/auth" style={styles.link}>Login / Signup</Link>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    padding: '1rem',
    backgroundColor: '#282c34',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
  },
  link: {
    marginRight: '1rem',
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold',
  },
  userText: {
    marginRight: '1rem',
  },
  button: {
    backgroundColor: '#61dafb',
    border: 'none',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    borderRadius: '4px',
    fontWeight: 'bold',
  },
};

export default Navbar;
