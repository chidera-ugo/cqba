import logo from '/public/logos/main-logo.svg';
import white_logo from '/public/logos/white_logo.svg';
import clsx from 'clsx';
import { Avatar } from 'components/commons/Avatar';
import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { Notifications } from 'components/modules/app/Notifications';
import { MobileMenu } from 'components/primary/MobileMenu';
import { PointerLeft } from 'components/svgs/navigation/Arrows';
import { Check } from 'components/svgs/others/Check';
import { useAppContext } from 'context/AppContext';
import { useGetActiveSubscription } from 'hooks/api/subscriptions/useGetActiveSubscription';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

interface Props {
  title?: string;
  back?: string;
  hideSideNavigation?: boolean;
  className?: string;
}

export const AppHeader = ({
  title,
  back,
  children,
  hideSideNavigation,
  className,
}: PropsWithChildren<Props>) => {
  const { user } = useAppContext().state;
  const { data } = useGetActiveSubscription();
  const currentPlan = !data ? '' : data?.plan?.name;

  return (
    <header
      className={clsx(
        'nav_bar sticky top-0 left-0 z-[1000] h-14 border-neutral-310 1024:h-20',
        className
      )}
    >
      <div className='x-between app-container relative z-10 my-auto h-full'>
        {back ? (
          <Link href={back} className={'group my-auto flex'}>
            <span className={'my-auto mr-2'}>
              <PointerLeft />
            </span>

            <span className='my-auto font-medium group-hover:underline'>
              Back
            </span>
          </Link>
        ) : hideSideNavigation ? (
          <Logo />
        ) : (
          <div className='my-auto text-base font-semibold text-neutral-1000 640:text-2xl'>
            {title}
          </div>
        )}

        <div className='flex'>
          {!hideSideNavigation && (
            <div className={'hidden gap-4 1024:flex'}>
              {currentPlan && (
                <Link href={'/settings/license'} className='pill_gray my-auto'>
                  <div className='flex gap-1'>
                    <div className='my-auto'>{currentPlan} Plan</div>
                    <div className='my-auto'>
                      <Check />
                    </div>
                  </div>
                </Link>
              )}

              <Notifications />

              <AppErrorBoundary className={'my-auto'} type={'hidden'}>
                <Link href={'/settings'}>
                  <Avatar avatar={user?.avatar} />
                </Link>
              </AppErrorBoundary>
            </div>
          )}

          {children ?? <MobileMenu />}
        </div>
      </div>
    </header>
  );
};

export const Logo = ({ white }: { white?: boolean }) => {
  const { isVerified } = useIsVerified();

  return (
    <div className='flex'>
      <Link href={isVerified ? '/' : '/kyc'} className='my-auto flex gap-2'>
        <Image
          src={white ? white_logo : logo}
          priority
          alt='chequebase-logo'
          className='my-auto w-[100px] object-contain 640:w-[160px]'
        />

        <div className='rounded-full border border-neutral-200 bg-white py-0.5 px-1.5 text-[10px] text-black shadow-sm 640:px-2 640:py-1 640:text-sm'>
          Beta
        </div>
      </Link>
    </div>
  );
};
