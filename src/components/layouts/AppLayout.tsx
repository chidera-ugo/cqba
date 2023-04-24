import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { PageHead } from 'components/primary/PageHead';
import { useAuthRedirector } from 'hooks/dashboard/useAuthRedirector';
import { PropsWithChildren } from 'react';
import { SideNavigation } from 'components/primary/SideNavigation';

export interface Props {
  title?: string;
}

export const AppLayout = ({ children, title }: PropsWithChildren<Props>) => {
  const { userExists } = useAuthRedirector();

  if (!userExists) return <FullScreenLoader asPage />;

  return (
    <>
      <PageHead title={title} />
      <div className='no-scroll flex'>
        <div className='w-[324px]'>
          <SideNavigation />
        </div>
        <main
          className='h-screen'
          style={{
            width: 'calc(100vw - 324px)',
          }}
        >
          <div className='container'>{children}</div>
        </main>
      </div>
    </>
  );
};
