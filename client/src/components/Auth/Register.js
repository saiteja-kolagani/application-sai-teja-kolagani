import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';

import './credentials.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default to 'user'
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', { username, password, role });

      const { token, role: userRole } = response.data;

      Cookies.set('authToken', token, {
        expires: 1, // 1 day expiration
        secure: true,
        sameSite: 'Strict',
        path: '/',
      });

      Cookies.set('userRole', userRole, {
        expires: 1, // 1 day expiration
        secure: true,
        sameSite: 'Strict',
        path: '/',
      });

      console.log('Registration successful!');
      navigate('/'); // Ensure you navigate to the intended route
    } catch (error) {
      console.error("Error registering:", error);
      setError('Failed to register. Please try again.'); // Set error message
    }
  };

  return (
    <div className='credentails-bg'>
      <form onSubmit={handleSubmit} className='credentials-form'>
        <h1 className='credentials-heading'>Regist<span>E</span>r</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
        <div className='input-container'>
          <label htmlFor='username'>Username</label>
          <br />
          <input
            className='input-credentials'
            type="text"
            id="username"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete='off'
          />
        </div>
        <div className='input-container'>
          <label htmlFor='password'>Password</label>
          <br />
          <input
            type="password"
            className='input-credentials'
            id='password'
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='off'
          />
        </div>
        <div className='input-container'>
          <label htmlFor='role'>Role</label>
          <br />
          <select
            className='input-credentials'
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">Normal User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className='btn-container'>
          <button type="submit" className='register-btn'>Register</button>
        </div>
        <p className='or-text'>or</p>
        <Link to='/login' className='link-user'><p className='create-user-text'>Existing user? Click to log in.</p></Link>
      </form>
    </div>
  );
};

export default Register;
