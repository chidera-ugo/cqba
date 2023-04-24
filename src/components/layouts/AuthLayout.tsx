import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { PageHead } from 'components/primary/PageHead';
import { AuthHeader } from 'components/primary/headers/AuthHeader';
import { useAppContext } from 'context/AppContext';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect } from 'react';

export interface Props {
  title?: string;
}

export const AuthLayout = ({ children, title }: PropsWithChildren<Props>) => {
  const { redirectUrl, user } = useAppContext().state;

  const { replace } = useRouter();

  useEffect(() => {
    if (!user) return;

    for (const i of authPaths) {
      if (redirectUrl.includes(i)) {
        replace('/');
        return;
      }
    }

    replace(redirectUrl ? redirectUrl : '/');
  }, [user]);

  if (user) return <FullScreenLoader id='auth-layout' asPage />;

  return (
    <>
      <PageHead title={title} />
      <AuthHeader />
      <main>{children}</main>
    </>
  );
};

export const authPaths = [
  'signin',
  'signup',
  'forgot-password',
  'new-password',
];
