import { useNavigationItems } from 'hooks/dashboard/useNavigationItems';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { convertToUrlString } from 'utils/helpers/convertToUrlString';
import clsx from 'clsx';
import { Tooltip } from 'components/common/Tooltip';
import { Fragment, useState } from 'react';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';
import { generatePlaceholderArray } from 'utils/helpers/generatePlaceholderArray';

export const SideNavigationItems = () => {
  const { pathname } = useRouter();
  const { navigationItems } = useNavigationItems();
  const [currentTooltipItem, setCurrentTooltipItem] = useState('');

  function checkIsActive(query: string, isRoot?: boolean) {
    if (isRoot && pathname === '/') return true;
    if (pathname.includes(convertToUrlString(query))) return true;
    return false;
  }

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
                ({ icon, title, showTooltip, showWhenUnverified, isRoot }) => {
                  if (showWhenUnverified && data?.verified)
                    return <Fragment key={title}></Fragment>;

                  const isActive = checkIsActive(title, isRoot);

                  return (
                    <Link
                      href={isRoot ? '/' : convertToUrlString(title)}
                      key={title}
                      className={clsx(
                        'x-between relative w-full py-1.5',
                        isActive
                          ? 'text-primary-main'
                          : 'smooth text-neutral-400 transition-colors hover:text-neutral-600'
                      )}
                    >
                      <div className='flex flex-shrink-0'>
                        <span className='mr-2'>{icon}</span>
                        <span className='text-base font-semibold'>{title}</span>
                      </div>

                      {isActive && (
                        <div
                          onMouseEnter={() => {
                            setCurrentTooltipItem(title);
                          }}
                          onMouseLeave={() => {
                            setCurrentTooltipItem('');
                          }}
                          className='y-center relative my-auto p-3'
                        >
                          <div className='x-center absolute left-[9px] my-auto overflow-visible'>
                            <div className='relative my-auto h-1.5 w-1.5 rounded-full bg-primary-main'></div>

                            {showTooltip && (
                              <Tooltip
                                show={
                                  showTooltip && currentTooltipItem === title
                                }
                                className='z-20 w-full'
                                title='Complete your registration'
                              >
                                Here is some helpful explainer text to assist or
                                guide the user in understanding how a certain
                                feature works.
                              </Tooltip>
                            )}
                          </div>
                        </div>
                      )}
                    </Link>
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
