import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Loading from './loading-page/Loading';

const ProtectedRoute = ({ children, requiredRoles }) => {
  const [authStatus, setAuthStatus] = useState({ loading: true, isAuthenticated: false });
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setAuthStatus({ loading: false, isAuthenticated: false });
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      console.log('decodedtoken :', decodedToken);

      const isAuthorized = requiredRoles.includes(decodedToken.role[0]);
      console.log('isAuthorized :', isAuthorized);
      if (isAuthorized) {
        setAuthStatus({ loading: false, isAuthenticated: true });
      } else {
        setAuthStatus({ loading: false, isAuthenticated: false });
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      setAuthStatus({ loading: false, isAuthenticated: false });
    }
  }, [token, requiredRoles]);

  if (authStatus.loading) {
    return <Loading />;
  }

  if (!authStatus.isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export default ProtectedRoute;
