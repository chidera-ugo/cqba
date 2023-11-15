import { useAppContext } from 'context/AppContext';

export const useInitiateAuthSession = () => {
  const { getCurrentUser, dispatch } = useAppContext();

  function initiateAuthSession(accessToken: string, refreshToken: string) {
    getCurrentUser!(accessToken);

    dispatch({
      type: 'setIsInitializing',
      payload: true,
    });

    dispatch({
      type: 'saveTokens',
      payload: {
        accessToken,
        refreshToken,
      },
    });
  }

  return { initiateAuthSession };
};
