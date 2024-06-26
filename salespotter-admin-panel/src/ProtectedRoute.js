// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('accessToken');
  
  if (!isAuthenticated) {    
    return <Navigate to="/login-admin" replace />;
  }

  return children;
};

export default ProtectedRoute
