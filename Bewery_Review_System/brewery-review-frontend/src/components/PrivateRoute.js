import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { loggedIn } = useAuth();

  return (
    <Route
      {...rest}
      element={loggedIn ? <Component /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
