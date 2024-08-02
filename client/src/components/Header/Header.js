import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import './styledheader.css';

const Header = () => {
  const navigate = useNavigate();

  const userRole = Cookies.get('userRole');

  const handleLogout = () => {
    Cookies.remove('authToken', { path: '/' }); 
    Cookies.remove('userRole', { path: '/' });
    Cookies.remove('userId', { path: '/' });
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
