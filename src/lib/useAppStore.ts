import { AuthSlice, createAuthSlice } from 'lib/authSlice';
import { AppSlice, createAppSlice } from 'lib/appSlice';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type AppState = AppSlice & AuthSlice;

export const useAppStore = create<AppState>()(
  devtools(
    (...a) => ({
      ...createAppSlice(...a),
      ...createAuthSlice(...a),
    }),
    {
      name: 'app-store',
    }
  )
);
