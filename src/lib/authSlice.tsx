import { AppState } from 'lib/useAppStore';
import { User } from 'types/User';
import { StateCreator } from 'zustand';

export interface AuthSlice {
  user: null | User;
  redirectUrl: string;
  setRedirectUrl: (url: string) => void;
  login: (user: User) => void;
  logout: () => void;
}

export const createAuthSlice: StateCreator<AppState, [], [], AuthSlice> = (
  set
) => ({
  user: null,
  redirectUrl: '',
  login: (user) =>
    set((state) => ({
      ...state!,
      user,
      loading: false,
    })),
  setRedirectUrl: (url) =>
    set((state) => ({
      ...state,
      redirectUrl: url,
    })),
  logout: () =>
    set((state) => ({
      ...state,
      user: null,
      loading: false,
    })),
});
