import create from 'zustand';

import { apolloCache } from '../config';
import { LOCAL_STORAGE_AUTH_KEY } from '../constants';

interface UserStore {
  user?: { id: string; email: string };
  token: string | null;
  setUser: (user: { id: string; email: string } | null) => void;
  setToken: (token: string | null) => void;
}

export const useUserStore = create<UserStore>((set, get) => {
  return {
    user: null,
    token: sessionStorage.getItem(LOCAL_STORAGE_AUTH_KEY),
    setUser: (user: { id: string; email: string } | null) => {
      set({
        ...get(),
        user: user,
      });
    },
    setToken: (token: string | null) => {
      if (!token) {
        sessionStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
      } else {
        sessionStorage.setItem(LOCAL_STORAGE_AUTH_KEY, token);
      }

      apolloCache?.reset();

      set({
        ...get(),
        token,
        ...(!token ? { user: null } : {}),
      });
    },
  };
});
