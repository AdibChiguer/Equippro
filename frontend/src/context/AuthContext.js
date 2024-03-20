import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (token) => {
    try {
      const decodedToken = jwtDecode(token); // Decode the token
      if (decodedToken) {
        setUser(decodedToken); // Set user if decoding is successful
      }
    } catch (error) {
      console.error("Failed to decode JWT", error);
    }
  };

  const logout = () => {
    setUser(null); // Clear the user state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
