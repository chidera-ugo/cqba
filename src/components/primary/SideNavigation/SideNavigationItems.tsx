import { useAppContext } from 'context/AppContext';
import { useAppCounts } from 'hooks/budgeting/useAppCounts';
import { useCurrentAccountSetupStepUrl } from 'hooks/dashboard/kyc/useCurrentAccountSetupStepUrl';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useNavigationItems } from 'hooks/dashboard/useNavigationItems';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { convertToUrlString } from 'utils/converters/convertToUrlString';
import clsx from 'clsx';
import { Fragment } from 'react';

export const SideNavigationItems = () => {
  const { pathname } = useRouter();

  const { user } = useAppContext().state;

  const appCounts = useAppCounts();

  const { navigationItems } = useNavigationItems(user?.role);

  const isOwner = user?.role === 'owner';

  const { isVerified } = useIsVerified();

  const { getCurrentAccountSetupStep } = useCurrentAccountSetupStepUrl();

  return (
    <>
      {Object.keys(navigationItems).map((item, i) => {
        return (
          <div key={item} className={clsx(i > 0 && 'mt-3')}>
            <div
              className={clsx(
                'mb-3 text-sm font-medium',
                isOwner ? 'text-neutral-1000' : 'font-medium text-neutral-400'
              )}
            >
              {item}
            </div>

            <div>
              {navigationItems[item]?.map(
                ({ icon, title, countId, id, showWhenUnverified, isRoot }) => {
                  const route = `/${convertToUrlString(id ?? title)}`;

                  if (showWhenUnverified && isVerified)
                    return <Fragment key={title}></Fragment>;

                  const isActive = checkIsActive(pathname, id ?? title, isRoot);

                  return (
                    <div key={title}>
                      <Link
                        href={
                          isRoot
                            ? '/'
                            : id === 'kyc'
                            ? `/kyc?tab=${getCurrentAccountSetupStep()}`
                            : route
                        }
                        className={clsx(
                          'x-between relative w-full',
                          isOwner ? 'py-[6px]' : 'py-2.5',
                          isActive
                            ? isOwner
                              ? 'text-primary-main'
                              : 'text-white'
                            : isOwner
                            ? 'smooth text-neutral-500 transition-colors hover:text-black'
                            : 'smooth text-neutral-500 transition-colors hover:text-neutral-100'
                        )}
                      >
                        <div className='flex flex-shrink-0'>
                          <span className='mr-2'>{icon}</span>
                          <span className='text-base font-medium'>{title}</span>
                        </div>

                        {countId && !!appCounts[countId] ? (
                          <div className='y-center h-5 min-w-[20px] rounded-md bg-primary-main px-1 text-center text-sm font-medium text-white'>
                            {appCounts[countId]}
                          </div>
                        ) : (
                          isActive && (
                            <div className='y-center relative my-auto p-2'>
                              <div
                                className={clsx(
                                  'relative my-auto h-1.5 w-1.5 rounded-full',
                                  isOwner ? 'bg-primary-main' : 'bg-white'
                                )}
                              ></div>
                            </div>
                          )
                        )}
                      </Link>
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

function checkIsActive(pathname: string, query: string, isRoot?: boolean) {
  if (isRoot && pathname === '/') return true;
  return !!pathname.split('/')[1]?.includes(convertToUrlString(query));
}
