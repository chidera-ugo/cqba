import clsx from 'clsx';
import { LogoutButton } from 'components/buttons/Logout';
import { FullScreenLoader } from 'components/commons/FullScreenLoader';
import { CreatePin } from 'components/modules/core/CreatePin';
import { ChoosePlan } from 'components/modules/subscriptions/ChoosePlan';
import { IdleTimer } from 'components/modules/IdleTimer';
import { PageHead } from 'components/primary/PageHead';
import { ChevronRight } from 'components/svgs/navigation/Chevrons';
import { copyrightText } from 'constants/copyrightText';
import { UserRole } from 'enums/employee_enum';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useNavigationItems } from 'hooks/dashboard/useNavigationItems';
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
  back?: string;
  hideSideNavigation?: boolean;
  childrenClassName?: string;
  breadCrumbs?: { title: string; url?: string }[];
  breadCrumbsSlot?: ReactNode;
  enabledFor?: UserRole;
  headerClassname?: string;
}

export const AppLayout = ({
  children,
  headerSlot,
  title,
  headerClassname = 'border-b',
  back,
  childrenClassName,
  breadCrumbs,
  enabledFor,
  breadCrumbsSlot,
  ...props
}: PropsWithChildren<Props>) => {
  const { userExists } = useProtectedRoutesGuard();

  const { screenSize, user, hasChoosenPlan } = useAppContext().state;

  const role = user?.role;

  const shouldSelectFirstPlan =
    !hasChoosenPlan &&
    !user?.organization?.subscription?.object &&
    role === 'owner';

  const hideSideNavigation = props.hideSideNavigation || shouldSelectFirstPlan;

  const { isVerified } = useIsVerified();
  const { pathname } = useRouter();

  const { isValidRoute } = useNavigationItems(role);

  if (!userExists) return <FullScreenLoader asPage />;

  if (!enabledFor) {
  } else if (enabledFor !== role) return <NotFound />;

  if ((!isVerified && pathname !== '/kyc') || !isValidRoute())
    return <NotFound />;

  return (
    <div className={'min-w-screen min-h-screen'}>
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
          {!hideSideNavigation &&
          !shouldSelectFirstPlan &&
          (!screenSize || screenSize?.['desktop']) ? (
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
                title,
                hideSideNavigation,
              }}
              className={headerClassname}
            >
              {shouldSelectFirstPlan ? <LogoutButton /> : headerSlot}
            </AppHeader>

            {breadCrumbs && !shouldSelectFirstPlan && (
              <div className='app-container x-between nav_bar sticky left-0 top-14 z-[1000] -ml-2 overflow-x-auto 640:h-16 1024:top-20'>
                <div className='flex gap-1'>
                  {breadCrumbs?.map(({ url, title }, i) => {
                    return (
                      <div key={title} className={'flex gap-1'}>
                        {url ? (
                          <Link
                            href={url}
                            className={clsx(
                              'my-auto gap-3 px-2 py-2.5 text-center text-sm font-medium transition-colors',
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
                              'my-auto gap-3 px-2 py-2.5 text-center text-sm font-medium transition-colors',
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
                shouldSelectFirstPlan
                  ? 'my-5 640:my-7'
                  : !!childrenClassName
                  ? childrenClassName
                  : !!breadCrumbs
                  ? 'app-container mb-5 mt-3 640:mb-7'
                  : 'app-container my-5 640:my-7',
                'relative z-10'
              )}
            >
              {shouldSelectFirstPlan ? <ChoosePlan /> : children}
            </div>

            {hideSideNavigation && (
              <p
                className={
                  'absolute bottom-0 w-full pb-3 text-center text-xs text-neutral-700 640:text-sm'
                }
              >
                {copyrightText}
              </p>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
