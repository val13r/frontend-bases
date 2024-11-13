import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/userSlice';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId) || localStorage.getItem('userId');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        {!userId && <li><Link to="/register">Register</Link></li>}
        {!userId && <li><Link to="/login">Login</Link></li>}
        {userId && (
          <>
            <li><Link to="/">Home</Link></li>
          </>
        )}
        {userId && (
          <>
            <li><Link to="/search">Buscar</Link></li>
          </>
        )}
        {userId && (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;