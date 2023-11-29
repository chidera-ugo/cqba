import { useAppContext } from 'context/AppContext';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useAuthenticationRoutesGuard = (noRedirect?: boolean) => {
  const { user, redirectUrl } = useAppContext().state;

  const { replace } = useRouter();

  const { isVerified } = useIsVerified();

  const url = isVerified ? '/' : '/kyc';

  useEffect(() => {
    // Redirect to saved url if http session is valid
    if (!user || noRedirect) return;

    if (redirectUrl === 'no_redirect' || redirectUrl === '/') {
      replace(url);
      return;
    }

    if (redirectUrl.includes('/auth')) {
      replace(url);
      return;
    }

    replace(!!redirectUrl ? redirectUrl : url);
  }, [user]);

  return {
    userExists: !!user,
  };
};
