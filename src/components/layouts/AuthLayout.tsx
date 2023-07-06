import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { PageHead } from 'components/primary/PageHead';
import { AuthHeader } from 'components/primary/headers/AuthHeader';
import { useAuthenticationRoutesGuard } from 'hooks/app/useAuthenticationRoutesGuard';
import { PropsWithChildren } from 'react';

export interface Props {
  title?: string;
}

export const AuthLayout = ({ children, title }: PropsWithChildren<Props>) => {
  const { userExists } = useAuthenticationRoutesGuard();

  if (userExists) return <FullScreenLoader id='auth-layout' asPage />;

  return (
    <div className={'bg-white'}>
      <PageHead title={title} />

      <AuthHeader />

      <main
        style={{
          minHeight: 'calc(100vh - 120px)',
        }}
      >
        {children}
      </main>
    </div>
  );
};
