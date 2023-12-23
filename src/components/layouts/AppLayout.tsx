import clsx from 'clsx';
import { LogoutButton } from 'components/buttons/Logout';
import { FullScreenLoader } from 'components/commons/FullScreenLoader';
import { AuthLayout } from 'components/layouts/AuthLayout';
import { IssueWithSubscription } from 'components/modules/app/IssueWithSubscription';
import { CreatePin } from 'components/modules/core/CreatePin';
import { ChooseInitialSubscriptionPlan } from 'components/modules/settings/license/ChooseInitialSubscriptionPlan';
import { IdleTimer } from 'components/modules/IdleTimer';
import { PageHead } from 'components/primary/PageHead';
import { ChevronRight } from 'components/svgs/navigation/Chevrons';
import { UserRole } from 'enums/employee_enum';
import { useUserRole } from 'hooks/access_control/useUserRole';
import { useDestroySession } from 'hooks/app/useDestroySession';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useNavigationItems } from 'hooks/dashboard/useNavigationItems';
import { useRouter } from 'next/router';
import NotFound from 'pages/404';
import { PropsWithChildren, ReactNode, useEffect } from 'react';
import { SideNavigation } from 'components/primary/SideNavigation';
import { AppHeader } from 'components/primary/headers/AppHeader';
import { useAppContext } from 'context/AppContext';

export interface Props {
  title?: string;
  headerSlot?: JSX.Element;
  back?: string;
  hideSideNavigation?: boolean;
  childrenClassName?: string;
  breadCrumbs?: { title: string; action?: () => void; url?: string }[];
  breadCrumbsSlot?: ReactNode;
  enabledFor?: UserRole;
  isForUnverified?: boolean;
  headerClassname?: string;
}

export const AppLayout = ({
  children,
  headerSlot,
  isForUnverified,
  title,
  headerClassname = 'border-b',
  back,
  childrenClassName,
  breadCrumbs,
  enabledFor,
  breadCrumbsSlot,
  ...props
}: PropsWithChildren<Props>) => {
  const { push, replace, pathname } = useRouter();

  const { screenSize, user, hasChoosenPlan } = useAppContext().state;

  const { isOwner } = useUserRole();
  const { destroySession } = useDestroySession();

  const role = user?.role;

  const shouldSelectFirstPlan =
    !hasChoosenPlan &&
    !user?.organization?.subscription?.object &&
    role === 'owner';

  const hideSideNavigation = props.hideSideNavigation || shouldSelectFirstPlan;
  const isKycFlow = pathname === '/kyc';

  const { isVerified } = useIsVerified();

  const { isValidRoute } = useNavigationItems(role);

  useEffect(() => {
    if (!isForUnverified) return;

    if (isForUnverified && isVerified) replace('/');
  }, [isVerified, isForUnverified]);

  if (!user || (!isVerified && !isKycFlow)) return <FullScreenLoader asPage />;

  if (
    !shouldSelectFirstPlan &&
    !isOwner &&
    user?.organization?.subscription?.object?.status !== 'active'
  )
    return (
      <AuthLayout noRedirect title={'Page Not Found'}>
        <div className='y-center app-container py-10 640:py-20'>
          <IssueWithSubscription
            actionText={'Sign-in with a different account'}
            action={() => destroySession()}
            title={`Your organization’s ChequeBase Account has been suspended`}
            subTitle='Please contact your Chequebase Workspace Organization Administrator to re-activate your organization.'
          />
        </div>
      </AuthLayout>
    );

  if (!enabledFor) {
  } else if (enabledFor !== role) return <NotFound />;

  if (!isValidRoute()) return <NotFound />;

  return (
    <div
      id={'app_wrapper'}
      style={{
        backgroundColor: 'white',
      }}
    >
      <PageHead title={title} />

      <CreatePin />

      <IdleTimer />

      <div className='relative h-full 1024:flex'>
        {!hideSideNavigation &&
        !shouldSelectFirstPlan &&
        (!screenSize || screenSize?.['desktop']) ? (
          <div className='hidden w-[300px] 1024:block'>
            <SideNavigation />
          </div>
        ) : null}

        <main
          className={clsx(
            'pb-12 640:pb-4',
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
                {breadCrumbs?.map(({ url, action, title }, i) => {
                  return (
                    <div key={title} className={'flex gap-1'}>
                      {url || action ? (
                        <button
                          onClick={
                            action ? action : () => (url ? push(url) : null)
                          }
                          className={clsx(
                            'my-auto gap-3 px-2 py-2.5 text-center text-sm font-medium transition-colors',
                            i === breadCrumbs.length - 1
                              ? 'text-primary-main'
                              : 'text-neutral-400 hover:text-black'
                          )}
                        >
                          {title}
                        </button>
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
                : clsx(
                    'app-container my-5',
                    isKycFlow ? '640:my-0' : '640:my-7'
                  ),
              'relative z-10'
            )}
          >
            {shouldSelectFirstPlan ? (
              <ChooseInitialSubscriptionPlan />
            ) : (
              children
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
