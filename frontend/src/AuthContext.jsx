import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    const storedUserData = localStorage.getItem('userData');
    const storedToken = localStorage.getItem('token');
    
    if (storedLoginStatus === 'true' && storedUserData && storedToken) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUserData));
      setToken(storedToken);
    }
  }, []);

  const login = (user) => {
    setIsLoggedIn(true);
    setUserData(user);
    setToken(user.token);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userData', JSON.stringify(user));
    localStorage.setItem('token', user.token); 
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setToken(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
