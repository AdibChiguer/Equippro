import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Ensure correct import without braces

const ProtectedRoute = ({ children, requiredRoles }) => {
  const [authStatus, setAuthStatus] = useState({ loading: true, isAuthenticated: false });
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      // If there's no token, we immediately know we're not authenticated
      setAuthStatus({ loading: false, isAuthenticated: false });
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      console.log('decodedtoken :', decodedToken);

      // Directly check the decodedToken for authorization logic
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

  // Render loading indicator while waiting
  if (authStatus.loading) {
    return <div>Loading...</div>;
  }

  // Redirect if not authenticated
  if (!authStatus.isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  // Render children if authenticated and authorized
  return children;
};

export default ProtectedRoute;
