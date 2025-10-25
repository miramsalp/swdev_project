import { useState, useEffect } from 'react';
import { login, register, getMe } from '../features/auth/authApi';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const data = await getMe(token);
          setUser(data.data);
        } catch (err) {
          localStorage.removeItem('token');
        }
      }
    };

    fetchUser();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const data = await login(credentials);
      // add to localStorage does not use cookie
      localStorage.setItem('token', data.token);
      const userData = await getMe(data.token);
      // setting user use in navbar to display login, register or logout
      setUser(userData.data);
      // show red error
      setError(null);
      return userData.data;
    } catch (err) {
      // show red error
      setError(err.response?.data?.msg || 'Login failed');
      throw err;
    }
  };

  const handleRegister = async (userData) => {
    try {
      const data = await register(userData);
      // add to localStorage does not use cookie
      localStorage.setItem('token', data.token);
      const newUser = await getMe(data.token);
      // setting user use in navbar to display login, register or logout
      setUser(newUser.data);
      // show red error
      setError(null);
      return newUser.data;
    } catch (err) {
      // show red error
      setError(err.response?.data?.msg || 'Registration failed');
      throw err;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return { user, error, handleLogin, handleRegister, handleLogout };
};

export default useAuth;
