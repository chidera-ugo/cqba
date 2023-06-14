import { useAppContext } from 'context/AppContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useAuthenticationRoutesGuard = () => {
  const { user, redirectUrl } = useAppContext().state;
  const { replace } = useRouter();

  const isVerified = false;

  const url = isVerified ? '/' : '/setup';

  useEffect(() => {
    // Redirect to saved url if auth session is valid
    if (!user) return;

    if (redirectUrl === 'no_redirect') {
      replace(url);
      return;
    }

    for (const item of authPaths) {
      if (redirectUrl.includes(item)) {
        replace(url);
        return;
      }
    }

    replace(redirectUrl ? redirectUrl : url);
  }, [user]);

  const authPaths = ['signin', 'signup', 'forgot-password', 'new-password'];

  return {
    userExists: !!user,
  };
};
