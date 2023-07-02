import clsx from 'clsx';
import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { CreatePin } from 'components/modules/core/CreatePin';
import { VerifyYourAccount } from 'components/modules/kyc/VerifyYourAccount';
import { PageHead } from 'components/primary/PageHead';
import { Right } from 'components/svgs/navigation/Arrows';
import { LineInfo } from 'components/svgs/others/Info';
import { useCurrentAccountSetupStepUrl } from 'hooks/dashboard/kyc/useCurrentAccountSetupStepUrl';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import { SideNavigation } from 'components/primary/SideNavigation';
import { AppHeader } from 'components/primary/headers/AppHeader';
import { useAppContext } from 'context/AppContext';
import { useProtectedRoutesGuard } from 'hooks/app/useProtectedRoutesGuard';

export interface Props {
  title?: string;
  headerSlot?: JSX.Element;
  requiresVerification?: boolean;
  back?: string;
  hideSideNavigation?: boolean;
}

export const AppLayout = ({
  children,
  headerSlot,
  title,
  back,
  requiresVerification,
  hideSideNavigation,
}: PropsWithChildren<Props>) => {
  const { userExists } = useProtectedRoutesGuard();

  const { pathname } = useRouter();

  const { screenSize } = useAppContext().state;

  const { isVerified } = useIsVerified();

  const { getCurrentAccountSetupStepUrl } = useCurrentAccountSetupStepUrl();

  if (!userExists) return <FullScreenLoader asPage />;

  return (
    <>
      <PageHead title={title} />
      <CreatePin />

      <div className='no-scroll 1024:flex'>
        {!hideSideNavigation && (!screenSize || screenSize?.['desktop']) ? (
          <div className='hidden w-[324px] 1024:block'>
            <SideNavigation />
          </div>
        ) : null}

        <main
          className={clsx(
            'h-screen overflow-y-auto',
            hideSideNavigation ? 'w-full' : '1024:app-layout-desktop-width'
          )}
        >
          <AppHeader {...{ back, title }}>{headerSlot}</AppHeader>

          {!isVerified && !pathname.includes('/kyc') && (
            <div className='x-between block bg-warning-600 p-4 text-white 690:flex 690:p-6'>
              <div className='flex'>
                <span className={'mt-1 mr-2 hidden 690:block'}>
                  <LineInfo />
                </span>

                <div>
                  <h6
                    className={'text-base font-semibold text-white'}
                  >{`You're currently in test mode`}</h6>
                  <p className={'mt-1 text-sm text-white'}>
                    Activate your business to start using Chequebase in live
                    mode
                  </p>
                </div>
              </div>

              <div className='mt-4 flex 690:mt-0'>
                <Link
                  href={getCurrentAccountSetupStepUrl()}
                  className='light-button x-center h-10 border-none px-3 text-sm text-black 690:h-12 690:px-5'
                >
                  <span className={'my-auto mr-1'}>Activate Business</span>
                  <span className={'my-auto'}>
                    <Right />
                  </span>
                </Link>
              </div>
            </div>
          )}

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
