import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { loginUser } from '../services/authService'; // We'll create this service

interface User {
  id: string;
  email: string;
  role: 'cliente' | 'alcaldía';
  token: string;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored token on page load (e.g., in localStorage)
    const token = localStorage.getItem('authToken');
    if (token) {
      // Mock: Fetch user data from token (replace with actual API call)
      const storedUser: User = JSON.parse(localStorage.getItem('user') || '{}');
      if (storedUser.id) {
        setUser(storedUser);
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginUser(email, password);
      const userData: User = {
        id: response.id,
        email: response.email,
        role: response.role,
        token: response.token,
      };
      setUser(userData);
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      throw new Error('Login failed: Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};