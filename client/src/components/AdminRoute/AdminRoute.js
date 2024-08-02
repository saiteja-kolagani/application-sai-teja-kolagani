import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AdminRoute = ({ children }) => {
  const role = Cookies.get('userRole');
  console.log('AdminRoute: userRole:', role);

  if (role !== 'admin') {
    console.log('AdminRoute: Access denied. Not an admin.');
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
