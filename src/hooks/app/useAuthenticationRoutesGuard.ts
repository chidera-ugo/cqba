import { useAppContext } from 'context/AppContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useAuthenticationRoutesGuard = () => {
  const { user, redirectUrl } = useAppContext().state;
  const { replace } = useRouter();

  const isVerified = false;

  const url = isVerified ? '/' : '/kyc';

  useEffect(() => {
    // Redirect to saved url if auth session is valid
    if (!user) return;

    if (redirectUrl === 'no_redirect') {
      replace(url);
      return;
    }

    if (redirectUrl.includes('/auth')) {
      replace(url);
      return;
    }

    replace(redirectUrl ? redirectUrl : url);
  }, [user]);

  return {
    userExists: !!user,
  };
};
