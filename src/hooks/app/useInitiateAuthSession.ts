import { useAppContext } from 'context/AppContext';

export const useInitiateAuthSession = () => {
  const { refetchCurrentUser, dispatch } = useAppContext();

  function initiateAuthSession(accessToken: string, refreshToken: string) {
    refetchCurrentUser!(accessToken);

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
