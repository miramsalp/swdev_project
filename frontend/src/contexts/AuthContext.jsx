import { createContext, useContext } from 'react';
import useAuth from '../hooks/useAuth';

// https://www.youtube.com/watch?v=2-6K-TMA-nw 
const AuthContext = createContext();
// store user from useAuth() this is use in main.jsx to spread user to all route
// different from Agaya that use simple window.reload()
export const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
  )
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
