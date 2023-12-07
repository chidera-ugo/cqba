import clsx from 'clsx';
import { FullScreenLoader } from 'components/commons/FullScreenLoader';
import { CreatePin } from 'components/modules/core/CreatePin';
import { IdleTimer } from 'components/modules/IdleTimer';
import { VerifyYourAccount } from 'components/modules/kyc/VerifyYourAccount';
import { PageHead } from 'components/primary/PageHead';
import { ChevronRight } from 'components/svgs/navigation/Chevrons';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useNavigationItems } from 'hooks/dashboard/useNavigationItems';
import { useIsKycFlow } from 'hooks/kyc/useIsKycFlow';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NotFound from 'pages/404';
import { PropsWithChildren, ReactNode } from 'react';
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
  breadCrumbsSlot?: ReactNode;
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
  breadCrumbsSlot,
}: PropsWithChildren<Props>) => {
  const { userExists } = useProtectedRoutesGuard();

  const { screenSize, user } = useAppContext().state;

  const { isVerified } = useIsVerified();
  const { isKycFlow } = useIsKycFlow();
  const { pathname } = useRouter();

  const { isValidRoute } = useNavigationItems(user?.role);

  if ((!isVerified && pathname !== '/kyc') || !isValidRoute())
    return <NotFound />;

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
              <div className='app-container x-between sticky left-0 top-16 z-[1000] -ml-3 overflow-x-auto bg-white bg-opacity-80 backdrop-blur-md 640:h-16 1024:top-20'>
                <div className='flex gap-1'>
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

                {breadCrumbsSlot}
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
