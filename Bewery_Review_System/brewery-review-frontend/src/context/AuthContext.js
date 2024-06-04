import React, { createContext, useState, useContext } from 'react';

// Create AuthContext
const AuthContext = createContext();

// Create AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Function to handle user login
  const login = async (username, password) => {
    // Perform login logic, set loggedIn and user state if successful
    setLoggedIn(true);
    setUser({ username });
  };

  // Function to handle user logout
  const logout = () => {
    // Perform logout logic, clear loggedIn and user state
    setLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume AuthContext
export const useAuth = () => useContext(AuthContext);

