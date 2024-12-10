import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useAuth();

  return user ? (
    element // Pass the JSX element directly
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
