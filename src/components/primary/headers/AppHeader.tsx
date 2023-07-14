import logo from '/public/logos/main-logo.svg';
import clsx from 'clsx';
import { MobileMenu } from 'components/primary/MobileMenu';
import { PointerLeft } from 'components/svgs/navigation/Arrows';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

interface Props {
  title?: string;
  back?: string;
  hideSideNavigation?: boolean;
}

export const AppHeader = ({
  title,
  back,
  children,
  hideSideNavigation,
}: PropsWithChildren<Props>) => {
  return (
    <header
      className={clsx(
        'sticky top-0 left-0 z-[1000] h-16 border-b border-neutral-200 bg-white bg-opacity-80 backdrop-blur-md 1024:h-20'
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
        ) : (
          <div className='my-auto text-xl font-semibold text-neutral-1000 640:text-2xl'>
            {title}
          </div>
        )}

        {children}

        <MobileMenu />
      </div>
    </header>
  );
};
