import { FullScreenLoader } from 'components/common/FullScreenLoader';
import {
  Dispatch,
  PropsWithChildren,
  Reducer,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { CurrentUserRes, IUser } from 'types/Auth';
import useMediaQuery from 'hooks/common/useMediaQuery';
import { useGetCurrentUser } from 'hooks/api/auth/useGetCurrentUser';
import { reducer } from './_helpers';
import { getFromLocalStore } from 'lib/localStore';
import { deleteFromLocalStore } from 'lib/localStore';
import { useQueryClient } from '@tanstack/react-query';

export interface State {
  isInitializing: boolean;
  user: null | IUser;
  redirectUrl: string;
  tokens: Tokens | null;
  screenSize: {
    tablet: boolean;
    miniTablet: boolean;
    mobile: boolean;
    desktop: boolean;
  } | null;
}

export type Action =
  | { type: 'setRedirectUrl'; payload: string }
  | { type: 'setIsInitializing'; payload: boolean }
  | { type: 'setScreenSize'; payload: State['screenSize'] }
  | { type: 'accessToken'; payload: string }
  | { type: 'saveTokens'; payload: Tokens }
  | { type: 'removeTokens' }
  | { type: 'saveCurrentUser'; payload: CurrentUserRes }
  | { type: 'signout' };

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

const initialState: State = {
  user: null,
  redirectUrl: '',
  isInitializing: true,
  screenSize: null,
  tokens: null,
};

type StoreApi = {
  state: State;
  dispatch: Dispatch<Action>;
};

const AppContext = createContext<StoreApi>({
  state: initialState,
  dispatch: () => null,
});

function AppContextProvider({ children, ...props }: PropsWithChildren<any>) {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    initialState
  );

  const queryClient = useQueryClient();

  const { refetch: getCurrentUser } = useGetCurrentUser(
    state.tokens?.accessToken,
    {
      onSuccess(data) {
        if (!data) {
          dispatch({ type: 'setIsInitializing', payload: false });
          dispatch({ type: 'removeTokens' });
          return;
        }

        queryClient.setQueryData(['current-user'], data);

        return dispatch({ type: 'saveCurrentUser', payload: data });
      },
      onError(e: any) {
        dispatch({ type: 'setIsInitializing', payload: false });
        dispatch({ type: 'removeTokens' });

        const statusCode = e?.response?.data?.statusCode;

        if (statusCode === 401) deleteFromLocalStore('tokens');

        return null;
      },
      enabled: !!state.user,
    }
  );

  const tablet = useMediaQuery('(max-width: 1023px)');
  const miniTablet = useMediaQuery('(max-width: 767px)');
  const mobile = useMediaQuery('(max-width: 639px)');

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  useEffect(() => {
    const tokens = getFromLocalStore('tokens');

    if (!tokens || !tokens.accessToken || !tokens.refreshToken)
      return dispatch({ type: 'setIsInitializing', payload: false });

    dispatch({ type: 'saveTokens', payload: tokens });
  }, []);

  useEffect(() => {
    initializeSession();
  }, [state.tokens]);

  useEffect(() => {
    dispatch({
      type: 'setScreenSize',
      payload: {
        mobile,
        tablet,
        miniTablet,
        desktop: !mobile && !tablet && !miniTablet,
      },
    });
  }, [mobile, tablet, miniTablet]);

  async function initializeSession() {
    const token = state.tokens?.accessToken;

    if (!token) return dispatch({ type: 'setIsInitializing', payload: false });

    dispatch({ type: 'setIsInitializing', payload: true });

    getCurrentUser();
  }

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
