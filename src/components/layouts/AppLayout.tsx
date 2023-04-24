import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { PageHead } from 'components/primary/PageHead';
import { useAuthRedirector } from 'hooks/dashboard/useAuthRedirector';
import { PropsWithChildren } from 'react';
import { SideNavigation } from 'components/primary/SideNavigation';
import { AppHeader } from 'components/primary/headers/AppHeader';

export interface Props {
  title?: string;
  headerSlot?: JSX.Element;
}

export const AppLayout = ({
  children,
  headerSlot,
  title,
}: PropsWithChildren<Props>) => {
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
          className='h-screen overflow-y-auto'
          style={{
            width: 'calc(100vw - 324px)',
          }}
        >
          <AppHeader title={title}>{headerSlot}</AppHeader>
          <div className='app-container my-7'>{children}</div>
        </main>
      </div>
    </>
  );
};
