import { useNavigationItems } from 'hooks/dashboard/useNavigationItems';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { convertToUrlString } from 'utils/helpers/converters/convertToUrlString';
import clsx from 'clsx';
import { Fragment } from 'react';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';
import { TooltipWrapper } from 'components/common/Tooltip';
import { useDismiss } from 'hooks/common/useDismiss';
import { generatePlaceholderArray } from 'utils/helpers/generators/generatePlaceholderArray';

export const SideNavigationItems = () => {
  const { pathname } = useRouter();
  const { navigationItems } = useNavigationItems();

  function checkIsActive(query: string, isRoot?: boolean) {
    if (isRoot && pathname === '/') return true;
    if (pathname.includes(convertToUrlString(query))) return true;
    return false;
  }

  const [dismiss, isDismissed, checkIsSideNavItemToolTipDismissed] =
    useDismiss('side_nav_tooltip');

  const { isLoading, isError, data } = useMakeDummyHttpRequest({
    method: 'get',
    res: {
      verified: false,
    },
  });

  if (isLoading) return <IsLoadingIsError type='loading' />;
  if (isError) return <IsLoadingIsError type='error' />;

  return (
    <>
      {Object.keys(navigationItems).map((item) => {
        return (
          <div key={item} className='mt-8'>
            <div className='mb-3 text-sm font-semibold text-neutral-1000'>
              {item}
            </div>

            <div>
              {navigationItems[item]?.map(
                ({ icon, title, showWhenUnverified, isRoot }) => {
                  const titleAsUrl = convertToUrlString(title);

                  if (showWhenUnverified && data?.verified)
                    return <Fragment key={title}></Fragment>;

                  const isActive = checkIsActive(title, isRoot);
                  const tooltipId = `side_nav_tooltip_id_${titleAsUrl}`;

                  return (
                    <div key={title}>
                      <Link
                        href={isRoot ? '/' : titleAsUrl}
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
                            !checkIsSideNavItemToolTipDismissed(titleAsUrl) &&
                            !isDismissed
                          }
                          close={() => {
                            dismiss(titleAsUrl);
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

const IsLoadingIsError = ({ type }: { type: 'loading' | 'error' }) => {
  return (
    <div className='mt-8'>
      {generatePlaceholderArray(3).map((p, i) => {
        return (
          <div key={p} className={clsx(i > 0 && 'mt-12')}>
            <div
              className={clsx(
                type === 'loading' ? 'skeleton' : 'skeleton-error',
                'mb-3 h-4 w-20'
              )}
            ></div>

            {generatePlaceholderArray(3).map((p) => {
              return (
                <div
                  key={p}
                  className={clsx(
                    type === 'loading' ? 'skeleton' : 'skeleton-error',
                    'my-5 h-5 w-full'
                  )}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
