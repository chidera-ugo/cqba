import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { PageHead } from 'components/primary/PageHead';
import { useAuthRedirector } from 'hooks/dashboard/useAuthRedirector';
import { PropsWithChildren } from 'react';
import { SideNavigation } from 'components/primary/SideNavigation';
import { AppHeader } from 'components/primary/headers/AppHeader';
import { useAppContext } from 'context/AppContext';

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
  const { screenSize } = useAppContext().state;

  if (!userExists) return <FullScreenLoader asPage />;

  return (
    <>
      <PageHead title={title} />
      <div className='no-scroll 1024:flex'>
        {!screenSize || screenSize === 'desktop' ? (
          <div className='hidden w-[324px] 1024:block'>
            <SideNavigation />
          </div>
        ) : null}
        <main className='1024:app-layout-desktop-width h-screen overflow-y-auto'>
          <AppHeader title={title}>{headerSlot}</AppHeader>
          <div className='app-container my-7'>{children}</div>
        </main>
      </div>
    </>
  );
};
