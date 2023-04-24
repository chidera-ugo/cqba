import { useAppStore } from 'lib/useAppStore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useAuthRedirector = () => {
  const user = useAppStore((state) => state.user);
  const redirectUrl = useAppStore((state) => state.redirectUrl);
  const setRedirectUrl = useAppStore((state) => state.setRedirectUrl);

  const { replace, pathname } = useRouter();

  useEffect(() => {
    if (user) {
      if (!redirectUrl) replace('/');
      replace(redirectUrl);
      return;
    }

    let path = window.location.href.replace(window.location.origin, '');

    for (const i of authPaths) {
      if (path.includes(i)) {
        replace('/signin');
        return;
      }
    }

    const query: Record<string, string> = {};

    if (path.includes('timedout=true')) {
      path = path.replace('timedout=true', '');
      query['timedout'] = 'true';
    }

    setRedirectUrl(path);

    replace({
      pathname: '/signin',
      query,
    });
  }, [user, pathname]);

  return {
    userExists: !!user,
  };
};

const authPaths = ['/signin', '/signup', '/forgot-password', '/new-password'];
