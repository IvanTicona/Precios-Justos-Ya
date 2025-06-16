import { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../interfaces/userInterface';
import { getStorage, clearStorage, setStorage } from '../helpers/localStorage';

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({} as UserContextType);
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const storedUser = getStorage('user') as User | null;
  const [user, setUser] = useState<User | null>(storedUser);
  const [isAuthenticated, setIsAuth] = useState<boolean>(!!storedUser);

  const login = (user: User) => {
    setStorage('user', user);
    setStorage('token', user.token);
    setUser(user);
    setIsAuth(true);
  };

  const logout = () => {
    clearStorage();
    setUser(null);
    setIsAuth(false);
  };

  useEffect(() => {
    if (!user) {
      const fresh = getStorage('user') as User | null;
      if (fresh) {
        setUser(fresh);
        setIsAuth(true);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
