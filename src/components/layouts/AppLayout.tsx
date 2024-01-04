import clsx from 'clsx';
import { LogoutButton } from 'components/buttons/Logout';
import { FullScreenLoader } from 'components/commons/FullScreenLoader';
import { AuthLayout } from 'components/layouts/AuthLayout';
import { CentredModalWrapper } from 'components/modal/ModalWrapper';
import { IssueWithSubscription } from 'components/modules/app/IssueWithSubscription';
import { CreatePin } from 'components/modules/core/CreatePin';
import { IdleTimer } from 'components/modules/IdleTimer';
import { ChooseInitialSubscriptionPlan } from 'components/modules/settings/license/ChooseInitialSubscriptionPlan';
import { AppHeader } from 'components/primary/headers/AppHeader';
import { PageHead } from 'components/primary/PageHead';
import { SideNavigation } from 'components/primary/SideNavigation';
import { ChevronRight } from 'components/svgs/navigation/Chevrons';
import { useAppContext } from 'context/AppContext';
import { UserRole } from 'enums/employee_enum';
import { useUserRole } from 'hooks/access_control/useUserRole';
import { useGetActiveSubscription } from 'hooks/api/subscriptions/useGetActiveSubscription';
import { SubscriptionStatus } from 'hooks/api/subscriptions/useGetSubscriptionHistory';
import { useDestroySession } from 'hooks/app/useDestroySession';
import { useProtectedRoutesGuard } from 'hooks/app/useProtectedRoutesGuard';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useNavigationItems } from 'hooks/dashboard/useNavigationItems';
import { useRouter } from 'next/router';
import NotFound from 'pages/404';
import { PropsWithChildren, ReactNode, useEffect } from 'react';

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

  const { screenSize, user, hasChoosenPlan, hasSetPin } = useAppContext().state;

  useProtectedRoutesGuard();
  const { isOwner } = useUserRole();
  const { destroySession } = useDestroySession();

  const role = user?.role;

  const shouldSelectFirstPlan =
    !hasChoosenPlan &&
    !user?.organization?.subscription?.object &&
    role === 'owner';

  const hideSideNavigation = props.hideSideNavigation || shouldSelectFirstPlan;
  const isKycFlow = pathname === '/kyc';
  const isLicensePage = pathname === '/settings/license';
  const isPlanExpired =
    user?.organization?.subscription?.object?.status !==
    SubscriptionStatus.Active;

  const { isVerified } = useIsVerified();

  const { isValidRoute } = useNavigationItems(role);

  const { data } = useGetActiveSubscription();

  useEffect(() => {
    if (isForUnverified && isVerified) replace('/');
  }, [isVerified, isForUnverified]);

  if (!user || (!isVerified && !isKycFlow))
    return <FullScreenLoader id={'app_layout'} asPage />;

  if (!shouldSelectFirstPlan && !isOwner && isPlanExpired)
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

  const showRenewPlanPrompt =
    !isKycFlow &&
    isPlanExpired &&
    isOwner &&
    !isLicensePage &&
    !shouldSelectFirstPlan &&
    isVerified &&
    (user?.pinSet || !!hasSetPin) &&
    !!data?._id;

  return (
    <div
      id={'app_wrapper'}
      style={{
        backgroundColor: 'white',
      }}
    >
      <PageHead title={title} />

      <CentredModalWrapper
        id={'app_layout'}
        show={showRenewPlanPrompt}
        className={'px-0'}
        hideHeader
      >
        <IssueWithSubscription
          className={'bg-white'}
          actionText={'Renew Subscription or change plan'}
          action={() => push('/settings/license')}
          title={`Your organization’s ${data?.plan?.name} Subscription Plan has Expired`}
          subTitle='To renew or change plan, click on the button below to Renew or Change Plan to re-activate your organization.'
        />
      </CentredModalWrapper>

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
