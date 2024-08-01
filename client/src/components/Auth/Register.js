import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { username, password, role });
      // Redirect or show success message
    } catch (error) {
      console.error("Error registering:", error);
      // Show error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
