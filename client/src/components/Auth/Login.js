import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login', 
        { username, password },
        { withCredentials: true } // Allows sending cookies
      );
      localStorage.setItem('token', response.data.token);
      // Optionally set up Axios default headers for subsequent requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      // Redirect or show success message
    } catch (error) {
      console.error("Error logging in:", error);
      // Show error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
