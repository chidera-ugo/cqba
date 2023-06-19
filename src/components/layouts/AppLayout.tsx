import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { CreatePin } from 'components/modules/core/CreatePin';
import { VerifyYourAccount } from 'components/modules/kyc/VerifyYourAccount';
import { PageHead } from 'components/primary/PageHead';
import { PropsWithChildren } from 'react';
import { SideNavigation } from 'components/primary/SideNavigation';
import { AppHeader } from 'components/primary/headers/AppHeader';
import { useAppContext } from 'context/AppContext';
import { useProtectedRoutesGuard } from 'hooks/app/useProtectedRoutesGuard';

export interface Props {
  title?: string;
  headerSlot?: JSX.Element;
  requiresVerification?: boolean;
}

export const AppLayout = ({
  children,
  headerSlot,
  title,
  requiresVerification,
}: PropsWithChildren<Props>) => {
  const { userExists } = useProtectedRoutesGuard();
  const { screenSize, user } = useAppContext().state;

  const isVerified = user?.kybStatus === 'DONE';

  if (!userExists) return <FullScreenLoader asPage />;

  return (
    <>
      <PageHead title={title} />
      <CreatePin />

      <div className='no-scroll 1024:flex'>
        {!screenSize || screenSize?.['desktop'] ? (
          <div className='hidden w-[324px] 1024:block'>
            <SideNavigation />
          </div>
        ) : null}

        <main className='1024:app-layout-desktop-width h-screen overflow-y-auto'>
          <AppHeader title={title}>{headerSlot}</AppHeader>
          <div className='app-container my-7'>
            {requiresVerification && !isVerified ? (
              <VerifyYourAccount />
            ) : (
              children
            )}
          </div>
        </main>
      </div>
    </>
  );
};
