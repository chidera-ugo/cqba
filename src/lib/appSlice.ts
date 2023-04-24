import { AppState } from 'lib/useAppStore';
import { StateCreator } from 'zustand';

type Order = {
  id: string;
  name: string;
  accountNumber: string;
  amount: number;
};

export interface AppSlice {
  order: Order | null;
  isSuccess: boolean;
  setOrder: (query: Order) => void;
  toggleIsSuccess: (query: boolean) => void;
  terminate: () => void;
}

export const createAppSlice: StateCreator<AppState, [], [], AppSlice> = (
  set
) => ({
  order: null,
  isSuccess: false,
  setOrder: (query) =>
    set((state) => ({
      ...state,
      order: query,
    })),
  toggleIsSuccess: (query) =>
    set((state) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      return {
        ...state,
        isSuccess: query,
      };
    }),
  terminate: () =>
    set((state) => ({
      ...state,
      accounts: [],
      reference: '',
      sessionId: '',
      phoneNumber: '',
      isSuccess: false,
    })),
});
