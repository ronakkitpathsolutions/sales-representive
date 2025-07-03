import { createContext, useState, useEffect } from 'react';
import { LOCAL_STORAGE_KEY } from '@/utils/constants';
import { decodeToken } from '@/utils/helper';
import { AUTH_ROUTES, DASHBOARD_ROUTES } from '@/routing/routes';
import { useTimeout } from '@mantine/hooks';
import useLocalStorage from '@/hooks/use-local-storage';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken, removeToken] = useLocalStorage(LOCAL_STORAGE_KEY);

  const [user, setUser] = useState(() => {
    if (token) {
      return decodeToken(token);
    }
    return {};
  });

  const role = user.role || '';
  const redirectUrl = role
    ? DASHBOARD_ROUTES.dashboard.url
    : AUTH_ROUTES.login.url;

  const login = newToken => {
    setToken(newToken);
  };

  const resetAllStores = () => {
    // store reset logic (zustand)
  };

  const { start, clear } = useTimeout(() => resetAllStores(), 1000);

  const logout = () => {
    removeToken();
    start();
  };

  useEffect(() => {
    if (token) {
      setUser(decodeToken(token));
    } else {
      setUser({});
    }
  }, [token]);

  useEffect(() => {
    return () => {
      clear();
    };
  }, [clear]);

  return (
    <AuthContext.Provider
      value={{
        role,
        redirectUrl,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
