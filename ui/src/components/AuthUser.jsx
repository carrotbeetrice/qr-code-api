import React, { createContext, useContext, useState } from "react";
import {
  login as loginService,
  logout as logoutService,
} from "../services/UserService";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children } = {}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email, password) => {
    const result = await loginService(email, password);
    // console.log(result);
    setIsAuthenticated(result.success);
    return result;
  };

  const logout = () => {
    logoutService();
    setIsAuthenticated(false);
  };

  const value = { isAuthenticated, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
