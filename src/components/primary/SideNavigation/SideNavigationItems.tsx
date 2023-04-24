import { ProfileSwitcher } from 'components/primary/SideNavigation/ProfileSwitcher';
import { useNavigationItems } from 'hooks/dashboard/useNavigationItems';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import logo from '/public/logos/main-logo.svg';
import { convertToUrlString } from 'utils/helpers/convertToUrlString';
import clsx from 'clsx';

export const SideNavigationItems = () => {
  const { pathname } = useRouter();
  const { navigationItems } = useNavigationItems();

  function checkIsActive(query: string, isRoot?: boolean) {
    if (isRoot && pathname === '/') return true;
    if (pathname.includes(convertToUrlString(query))) return true;
    return false;
  }

  return (
    <div className='y-between relative z-10 h-full min-h-full'>
      <div className='y-between relative h-screen'>
        <div className='h-max'>
          <ProfileSwitcher />
          <div className='p-8 pt-0'>
            {Object.keys(navigationItems).map((item) => {
              return (
                <div key={item} className='mt-8'>
                  <div className='mb-3 text-sm font-semibold text-neutral-1000'>
                    {item}
                  </div>

                  <div>
                    {navigationItems[item]?.map(({ icon, title, isRoot }) => {
                      const isActive = checkIsActive(title, isRoot);

                      return (
                        <Link
                          href={isRoot ? '/' : convertToUrlString(title)}
                          key={title}
                          className={clsx(
                            'x-between w-full py-1.5',
                            isActive
                              ? 'text-primary-main'
                              : 'smooth text-neutral-400 transition-colors hover:text-neutral-600'
                          )}
                        >
                          <div className='flex'>
                            <span className='mr-2'>{icon}</span>
                            <span className='text-base font-semibold'>
                              {title}
                            </span>
                          </div>

                          {isActive && (
                            <div className='my-auto'>
                              <div className='h-1.5 w-1.5 rounded-full bg-primary-main'></div>
                            </div>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className='sticky bottom-0 left-0 mt-auto bg-neutral-100 py-5 px-8'>
          <div className='flex'>
            <Link href='/' className='my-auto'>
              <Image
                src={logo}
                priority
                alt='chequebase-logo'
                className='my-auto w-[160px] object-contain'
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
