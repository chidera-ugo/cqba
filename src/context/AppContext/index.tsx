import { FullScreenLoader } from 'components/commons/FullScreenLoader';
import { Action, State, StoreApi, Tokens } from 'context/AppContext/types';
import { useRouter } from 'next/router';
import {
  PropsWithChildren,
  Reducer,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import useMediaQuery from 'hooks/commons/useMediaQuery';
import { useGetCurrentUser } from 'hooks/api/auth/useGetCurrentUser';
import { reducer } from 'context/AppContext/methods';
import { getFromLocalStore } from 'lib/localStore';

const initialState: State = {
  user: null,
  redirectUrl: '',
  hasSetPin: false,
  hasChoosenPlan: false,
  isInitializing: true,
  screenSize: null,
  tokens: null,
};

const AppContext = createContext<StoreApi>({
  state: initialState,
  dispatch: () => null,
});

function AppContextProvider({ children, ...props }: PropsWithChildren<any>) {
  const { query, pathname } = useRouter();

  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    initialState
  );

  const { mutate } = useGetCurrentUser(
    (tokens) => {
      dispatch({ type: 'saveTokens', payload: tokens });
    },
    state?.tokens?.accessToken,
    {
      onSuccess(data) {
        if (!data) return;

        dispatch({ type: 'setCurrentUser', payload: data });
        dispatch({ type: 'setIsInitializing', payload: false });
      },
      onError() {
        dispatch({ type: 'setIsInitializing', payload: false });
      },
    }
  );

  const tablet = useMediaQuery('(max-width: 1023px)');
  const miniTablet = useMediaQuery('(max-width: 767px)');
  const mobile = useMediaQuery('(max-width: 639px)');

  const value = useMemo(
    () => ({
      state,
      dispatch,
      refetchCurrentUser: mutate,
    }),
    [state, dispatch]
  );

  useEffect(() => {
    const _token = query['auth_token'];

    const tokenFromWebView =
      !!_token && typeof _token === 'string' ? _token : null;

    let tokens: Tokens;

    if (!!tokenFromWebView && pathname === '/kyc') {
      tokens = {
        accessToken: tokenFromWebView,
        refreshToken: tokenFromWebView,
      };
    } else {
      tokens = getFromLocalStore('tokens', true);
    }

    if (!tokens || !tokens.accessToken || !tokens.refreshToken)
      return dispatch({ type: 'setIsInitializing', payload: false });

    dispatch({ type: 'saveTokens', payload: tokens });

    initializeSession(tokens?.accessToken);
  }, [query['auth_token']]);

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

  async function initializeSession(token: string) {
    dispatch({ type: 'setIsInitializing', payload: true });

    mutate(token);
  }

  if (state.isInitializing) return <FullScreenLoader id='app_context' asPage />;

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
