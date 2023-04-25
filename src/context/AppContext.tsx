import axios from 'axios';
import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { urlModifier } from 'hooks/api/useHttp';
import {
  Reducer,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { deleteFromLocalStore, getFromLocalStore } from 'lib/localStore';
import { User } from 'types/User';
import useMediaQuery from 'hooks/common/useMediaQuery';

export interface State {
  isInitializing: boolean;
  user: null | User;
  redirectUrl: string;
  screenSize: 'tablet' | 'mobile' | 'desktop' | null;
}

type Action =
  | { type: 'set-redirect-url'; payload: string }
  | { type: 'toggle-is-initializing'; payload: boolean }
  | { type: 'set-screen-size'; payload: State['screenSize'] }
  | { type: 'login'; payload: User }
  | { type: 'logout' };

const initialState: State = {
  user: null,
  redirectUrl: '',
  isInitializing: true,
  screenSize: null,
};

type StoreApi = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const AppContext = createContext<StoreApi>({
  state: initialState,
  dispatch: () => null,
});

function AppContextProvider({
  children,
  ...props
}: React.PropsWithChildren<any>) {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    initialState
  );

  const tablet = useMediaQuery('(max-width: 1024px)');
  const mobile = useMediaQuery('(max-width: 640px)');

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  async function init() {
    const user = await getCurrentUser();
    if (!user)
      return dispatch({ type: 'toggle-is-initializing', payload: false });
    return dispatch({ type: 'login', payload: user });
  }

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    dispatch({
      type: 'set-screen-size',
      payload: mobile ? 'mobile' : tablet ? 'tablet' : 'desktop',
    });
  }, [mobile, tablet]);

  if (state.isInitializing) return <FullScreenLoader id='app-context' asPage />;

  return (
    <AppContext.Provider value={value} {...props}>
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

export const fakeUser = {
  firstName: 'John',
  lastName: 'Doe',
  businessName: 'Gustavo Inc',
  email: 'gustavo@inc.co',
};

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

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'set-redirect-url': {
      return { ...state, redirectUrl: action.payload };
    }
    case 'toggle-is-initializing': {
      return { ...state, isInitializing: action.payload };
    }
    case 'set-screen-size': {
      return { ...state, screenSize: action.payload };
    }
    case 'logout': {
      deleteFromLocalStore('tokens');

      return {
        ...state,
        user: null,
        isInitializing: false,
      };
    }
    case 'login': {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
        isInitializing: false,
      };
    }

    default:
      return state;
  }
}
