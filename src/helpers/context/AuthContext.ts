import { createContext, useContext } from 'react';

export const AuthContext = createContext({
  user: undefined,
  isLoading: false,
  setUser: (user: any) => undefined,
});

export const useAuthContext = () => useContext(AuthContext);
