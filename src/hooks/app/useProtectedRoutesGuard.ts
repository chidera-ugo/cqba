import { useAppContext } from 'context/AppContext';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useProtectedRoutesGuard = () => {
  const { dispatch, state } = useAppContext();
  const { replace, pathname } = useRouter();
  const { user } = state;
  const { isVerified } = useIsVerified();

  useEffect(() => {
    // Save current url and redirect to signin page if auth session is invalid
    if (user) {
      if (!isVerified && pathname !== '/kyc') replace('/kyc');
      return;
    }

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
      pathname: '/auth/signin',
      query,
    });
  }, [user]);

  return {
    userExists: !!user,
  };
};
