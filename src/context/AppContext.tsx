import axios from 'axios';
import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { urlModifier } from 'hooks/api/useHttp';
import { useAppStore } from 'lib/useAppStore';
import { createContext, useContext, useEffect, useState } from 'react';
import { getFromLocalStore } from '../lib/localStore';

const AppContext = createContext<{ state: any }>({
  state: null,
});

function AppContextProvider({
  children,
  ...props
}: React.PropsWithChildren<any>) {
  const [isInitializing, setIsInitializing] = useState(true);
  const login = useAppStore((state) => state.login);

  async function init() {
    const user = await getCurrentUser();
    if (!user) return setIsInitializing(false);

    login(user);
    setIsInitializing(false);
  }

  useEffect(() => {
    init();
  }, []);

  if (isInitializing) return <FullScreenLoader asPage />;

  return (
    <AppContext.Provider value={null} {...props}>
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error(`No provider for AppContext`);
  return context;
}

export { AppContextProvider, useAppContext };

async function getCurrentUser() {
  const tokens = getFromLocalStore('tokens');

  const axiosInstance = axios.create({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokens?.['accessToken']}`,
    },
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: process.env.WITH_CREDENTIALS === 'positive' ? true : false,
    timeout: 30 * 1000,
  });

  const modifier = urlModifier();
  if (!tokens) return null;

  try {
    const res = await axiosInstance['get'](`${modifier}/users/profile`);
    return res.data;
  } catch (error) {
    return fakeUser;
  }
}

export const fakeUser = {
  firstName: 'John',
  lastName: 'Doe',
  businessName: 'Gustavo Inc',
  email: 'gustavo@inc.co',
};
