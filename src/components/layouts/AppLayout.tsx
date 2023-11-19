import clsx from 'clsx';
import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { CreatePin } from 'components/modules/core/CreatePin';
import { IdleTimer } from 'components/modules/IdleTimer';
import { VerifyYourAccount } from 'components/modules/kyc/VerifyYourAccount';
import { PageHead } from 'components/primary/PageHead';
import { Right } from 'components/svgs/navigation/Arrows';
import { ChevronRight } from 'components/svgs/navigation/Chevrons';
import { LineInfo } from 'components/svgs/others/Info';
import { useAccountVerificationStatus } from 'hooks/dashboard/kyc/useAccountVerificationStatus';
import { useCurrentAccountSetupStepUrl } from 'hooks/dashboard/kyc/useCurrentAccountSetupStepUrl';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useIsKycFlow } from 'hooks/kyc/useIsKycFlow';
import Link from 'next/link';
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
  childrenClassName?: string;
  breadCrumbs?: { title: string; url?: string }[];
}

export const AppLayout = ({
  children,
  headerSlot,
  title,
  back,
  requiresVerification,
  hideSideNavigation,
  childrenClassName,
  breadCrumbs,
}: PropsWithChildren<Props>) => {
  const { userExists } = useProtectedRoutesGuard();

  const { screenSize } = useAppContext().state;

  const { isVerified } = useIsVerified();
  const { isKycFlow } = useIsKycFlow();

  const { getCurrentAccountSetupStepUrl } = useCurrentAccountSetupStepUrl();

  const { isUnderReview } = useAccountVerificationStatus();

  if (!userExists) return <FullScreenLoader asPage />;

  return (
    <div className={'min-w-screen min-h-screen bg-black'}>
      <div
        id={'app_wrapper'}
        style={{
          backgroundColor: 'white',
        }}
      >
        <PageHead title={title} />

        <CreatePin />

        <IdleTimer />

        <div className='disable-scrolling 1024:flex'>
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
            <AppHeader
              {...{
                back,
                hideSideNavigation,
                title,
              }}
              className={!isKycFlow ? 'border-b' : ''}
            >
              {headerSlot}
            </AppHeader>

            {breadCrumbs && (
              <div className='app-container sticky left-0 top-16 z-[1000] -ml-3 flex h-12 gap-1 overflow-x-auto bg-white bg-opacity-80 backdrop-blur-md 1024:top-20'>
                {breadCrumbs?.map(({ url, title }, i) => {
                  return (
                    <div key={title} className={'flex gap-1'}>
                      {url ? (
                        <Link
                          href={url}
                          className={clsx(
                            'my-auto gap-3 px-3 py-2.5 text-center text-sm font-medium transition-colors',
                            i === breadCrumbs.length - 1
                              ? 'text-primary-main'
                              : 'text-neutral-400 hover:text-black'
                          )}
                        >
                          {title}
                        </Link>
                      ) : (
                        <div
                          className={clsx(
                            'my-auto gap-3 px-3 py-2.5 text-center text-sm font-medium transition-colors',
                            i === breadCrumbs.length - 1
                              ? 'text-primary-main'
                              : 'text-neutral-400 hover:text-black'
                          )}
                        >
                          {title}
                        </div>
                      )}

                      {i < breadCrumbs.length - 1 && (
                        <span className={'my-auto'}>
                          <ChevronRight />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {!isVerified && !isKycFlow && (
              <div className='x-between block bg-warning-600 p-4 text-white 690:flex 690:p-6'>
                <div className='flex'>
                  <span className={'mt-1 mr-2 hidden 640:mr-3 690:block'}>
                    <LineInfo />
                  </span>

                  <div>
                    <h6
                      className={'text-base font-medium text-white'}
                    >{`You're currently in test mode`}</h6>
                    <p className={'mt-2 text-sm text-white'}>
                      {isUnderReview
                        ? `We're reviewing your application, this may take a while. You will be notified once this process has been completed.`
                        : 'Activate your business to start using Chequebase in live mode'}
                    </p>
                  </div>
                </div>

                {!isUnderReview && (
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
                )}
              </div>
            )}

            <div
              className={clsx(
                !!childrenClassName
                  ? childrenClassName
                  : !!breadCrumbs
                  ? 'app-container mb-5 mt-3 640:mb-7'
                  : 'app-container my-5 640:my-7'
              )}
            >
              {requiresVerification && !isVerified ? (
                <VerifyYourAccount />
              ) : (
                children
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
