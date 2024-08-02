import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import './styledheader.css';

const Header = () => {
  const navigate = useNavigate();

  // Retrieve the user role from the cookies
  const userRole = Cookies.get('userRole');

  const handleLogout = () => {
    Cookies.remove('aToken', { path: '/' }); // Adjust the token name if needed
    Cookies.remove('userRole', { path: '/' }); // Remove userRole cookie
    console.log('Logged out!');
    navigate('/login');
  };

  return (
    <nav className="nav-header">
      <ul className="nav-items-container">
        <Link to="/" className="link-style">
          <li className="nav-list-item">Home</li>
        </Link>
        <Link to="/products" className="link-style">
          <li className="nav-list-item">Products</li>
        </Link>
        <Link to="/cart" className="link-style">
          <li className="nav-list-item">Cart</li>
        </Link>
        {/* Conditionally render the Admin link based on user role */}
        {userRole === 'admin' && (
          <Link to="/admin" className="link-style">
            <li className="nav-list-item">Admin</li>
          </Link>
        )}
      </ul>
      <button type="button" className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Header;
