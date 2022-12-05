import create from 'zustand';

import { apolloCache } from '../config';
import { LOCAL_STORAGE_AUTH_KEY } from '../constants';

interface UserStore {
  user?: { id: number; email: string };
  token: string | null;
  setUser: (user: { id: number; email: string } | null) => void;
  setToken: (token: string | null) => void;
}

export const useUserStore = create<UserStore>((set, get) => {
  return {
    user: null,
    token: sessionStorage.getItem(LOCAL_STORAGE_AUTH_KEY),
    setUser: (user: UserStore['user']) => {
      set({
        ...get(),
        user: user,
      });
    },
    setToken: (token: UserStore['token']) => {
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
