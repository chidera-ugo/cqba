import { useAppContext } from 'context/AppContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useProtectedRoutesGuard = () => {
  const { dispatch, state } = useAppContext();
  const { replace } = useRouter();
  const { user } = state;

  useEffect(() => {
    // Save current url and redirect to signin page if http session is invalid
    if (!!user) return;

    let path = window.location.href.replace(window.location.origin, '');
    const query: Record<string, string> = {};

    if (path.includes('timedout=true')) {
      path = path.replace('timedout=true', '');
      query['timedout'] = 'true';
    }

    if (state.redirectUrl !== 'no_redirect') {
      dispatch({ type: 'setRedirectUrl', payload: path });
    }

    replace({
      pathname: '/http/signin',
      query,
    });
  }, [user]);

  return {
    userExists: !!user,
  };
};
