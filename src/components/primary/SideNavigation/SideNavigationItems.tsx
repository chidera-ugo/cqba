import { useCurrentAccountSetupStepUrl } from 'hooks/dashboard/kyc/useCurrentAccountSetupStepUrl';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useNavigationItems } from 'hooks/dashboard/useNavigationItems';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { convertToUrlString } from 'utils/converters/convertToUrlString';
import clsx from 'clsx';
import { Fragment } from 'react';
import { TooltipWrapper } from 'components/common/Tooltip';
import { useDismiss } from 'hooks/common/useDismiss';

export const SideNavigationItems = () => {
  const { pathname } = useRouter();
  const { navigationItems } = useNavigationItems();

  const [dismiss, isDismissed, checkIsSideNavItemToolTipDismissed] =
    useDismiss('side_nav_tooltip');

  const { isVerified } = useIsVerified();

  const { getCurrentAccountSetupStepUrl } = useCurrentAccountSetupStepUrl();

  return (
    <>
      {Object.keys(navigationItems).map((item, i) => {
        return (
          <div key={item} className={clsx(i > 0 && 'mt-8')}>
            <div className='mb-3 text-sm font-semibold text-neutral-1000'>
              {item}
            </div>

            <div>
              {navigationItems[item]?.map(
                ({ icon, title, id, url, showWhenUnverified, isRoot }) => {
                  const route = url ?? convertToUrlString(title);

                  if (showWhenUnverified && isVerified)
                    return <Fragment key={title}></Fragment>;

                  const isActive = checkIsActive(pathname, title, isRoot, url);

                  const tooltipId = `side_nav_tooltip_id_${route?.replaceAll(
                    '/',
                    ''
                  )}`;

                  return (
                    <div key={title}>
                      <Link
                        href={
                          isRoot
                            ? '/'
                            : id === 'kyc'
                            ? getCurrentAccountSetupStepUrl()
                            : route
                        }
                        className={clsx(
                          'x-between relative w-full py-1.5',
                          isActive
                            ? 'text-primary-main'
                            : 'smooth text-neutral-400 transition-colors hover:text-neutral-600'
                        )}
                      >
                        <div className='flex flex-shrink-0'>
                          <span className='mr-2'>{icon}</span>
                          <span className='text-base font-medium'>{title}</span>
                        </div>

                        {isActive && (
                          <div
                            id={tooltipId}
                            className='y-center relative my-auto p-2'
                          >
                            <div className='relative my-auto h-1.5 w-1.5 rounded-full bg-primary-main'></div>
                          </div>
                        )}
                      </Link>

                      {isActive && (
                        <TooltipWrapper
                          anchorId={tooltipId}
                          show={
                            isActive &&
                            !checkIsSideNavItemToolTipDismissed(route) &&
                            !isDismissed
                          }
                          close={() => {
                            dismiss(route);
                          }}
                          title={title}
                        >
                          Here is some helpful explainer text to assist or guide
                          the user in understanding how a certain feature works.
                        </TooltipWrapper>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

function checkIsActive(
  pathname: string,
  query: string,
  isRoot?: boolean,
  url?: string
) {
  if (isRoot && pathname === '/') return true;
  if (url && pathname.includes(url)) return true;
  return !!pathname.split('/')[1]?.includes(convertToUrlString(query));
}
