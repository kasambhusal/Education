import React, { createContext, useState, useContext, useEffect } from 'react';

// Creating User Context
const UserContext = createContext();

// Creating a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    fullname: '',
    email: '',
    image: '',
    address: '',
    gender: '',
    standard: '',
    goal: '',
    role: 'ADMIN'
  });
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  // Update user state from localStorage if the token exists
  useEffect(() => {
    if (token) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (userData) {
        setUser(userData);
      }
    }
  }, [token]);

  const login = (userData, token) => {
    setUser(userData);
    setToken(`Bearer ${token}`);
    localStorage.setItem('token', `Bearer ${token}`);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const logout = () => {
    setUser({
      id: null,
      fullname: '',
      email: '',
      image: '',
      address: '',
      gender: '',
      standard: '',
      goal: '',
    });
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout, token }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the theme context
export const useUser = () => {
  return useContext(UserContext);
};