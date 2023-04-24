import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { PageHead } from 'components/primary/PageHead';
import { AuthHeader } from 'components/primary/headers/AuthHeader';
import { useAuthRedirector } from 'hooks/dashboard/useAuthRedirector';
import { PropsWithChildren } from 'react';

export interface Props {
  title?: string;
}

export const AuthLayout = ({ children, title }: PropsWithChildren<Props>) => {
  const { userExists } = useAuthRedirector();

  if (userExists) return <FullScreenLoader asPage />;

  return (
    <>
      <PageHead title={title} />
      <AuthHeader />
      <main>{children}</main>
    </>
  );
};
