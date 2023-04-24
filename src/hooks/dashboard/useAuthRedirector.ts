import { useAppContext } from 'context/AppContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useAuthRedirector = () => {
  const { dispatch, state } = useAppContext();
  const { user } = state;

  const { replace } = useRouter();

  useEffect(() => {
    if (user) return;

    let path = window.location.href.replace(window.location.origin, '');

    const query: Record<string, string> = {};

    if (path.includes('timedout=true')) {
      path = path.replace('timedout=true', '');
      query['timedout'] = 'true';
    }

    dispatch({ type: 'set-redirect-url', payload: path });

    replace({
      pathname: '/signin',
      query,
    });
  }, [user]);

  return {
    userExists: !!user,
  };
};
