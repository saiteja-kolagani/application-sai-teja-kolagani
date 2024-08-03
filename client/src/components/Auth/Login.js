import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiURL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include' 
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const { token, role, userId } = data;


      console.log('Login successful! Token:', token, 'Role:', role);

      Cookies.set('authToken', token, {
        expires: 1,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
      });

      Cookies.set('userRole', role, {
        expires: 1,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
      });


      Cookies.set('userId', userId, {
        expires: 1,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
      });


      console.log('authToken from Cookies:', Cookies.get('aToken'));
      console.log('userRole from Cookies:', Cookies.get('userRole'));

      navigate('/'); 
    } catch (error) {
      console.error('Error logging in:', error);

    }
  };

  return (
    <div className="credentails-bg">
      <form onSubmit={handleSubmit} className="credentials-form">
        <h1 className="credentials-heading">
          Log<span>I</span>n
        </h1>
        <div className="input-container">
          <input
            type="text"
            className="input-credentials"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            className="input-credentials"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="btn-container">
          <button type="submit" className="register-btn">
            Login
          </button>
        </div>
        <p className='or-text'>or</p>
        <Link to="/register" className='link-user'><p className='create-user-text'>Create Your Account</p></Link>
      </form>
    </div>
  );
};

export default Login;
