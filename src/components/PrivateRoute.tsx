import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const user = auth.currentUser;

  return user ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;
