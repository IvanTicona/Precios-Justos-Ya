import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../interfaces/userInterface';
import { clearStorage, setStorage } from '../helpers/localStorage';

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user:User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({} as User);
  const [isAuthenticated, setIsAuth] = useState<boolean>(false);
  const login = (user: User) => {
    setStorage("user", user);
    setStorage("token", user.token);

    setUser(user);
    setIsAuth(true);
  };

  const logout = () => {
    clearStorage();
    setUser({} as User);
    setIsAuth(false);
  };
      console.log("En verdad se esta guardando?: ", user, isAuthenticated, login);

  return (
    <UserContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
