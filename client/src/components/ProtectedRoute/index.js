import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get('authToken');
  console.log("ProtectedRoute: authToken:", token);

  if (!token) {
    console.log('ProtectedRoute: No token found. Redirecting to login.');
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
