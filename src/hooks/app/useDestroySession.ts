import { useQueryClient } from '@tanstack/react-query';
import { useAppContext } from 'context/AppContext';

export const useDestroySession = () => {
  const { dispatch } = useAppContext();

  const queryClient = useQueryClient();

  return {
    destroySession(removeRedirectUrl?: boolean) {
      if (removeRedirectUrl) {
        dispatch({ type: 'setRedirectUrl', payload: 'no_redirect' });
      }

      dispatch({ type: 'signout' });
      queryClient.clear();
    },
  };
};
