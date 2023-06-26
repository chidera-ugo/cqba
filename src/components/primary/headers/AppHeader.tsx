import clsx from 'clsx';
import { MobileMenu } from 'components/primary/MobileMenu';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

interface Props {
  title?: string;
  back?: string;
}

export const AppHeader = ({
  title,
  back,
  children,
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
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                className={'h-6 w-6'}
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M17 10C17 10.4142 16.6642 10.75 16.25 10.75L5.61208 10.75L9.76983 14.7094C10.0684 14.9965 10.0777 15.4713 9.79062 15.7698C9.50353 16.0684 9.02875 16.0777 8.73017 15.7906L3.23017 10.5406C3.08311 10.3992 3 10.204 3 10C3 9.79599 3.08311 9.60078 3.23017 9.45938L8.73017 4.20938C9.02875 3.92228 9.50353 3.93159 9.79062 4.23017C10.0777 4.52875 10.0684 5.00353 9.76983 5.29063L5.61208 9.25L16.25 9.25C16.6642 9.25 17 9.58579 17 10Z'
                  fill='#1A44ED'
                />
              </svg>
            </span>

            <span className='my-auto font-medium group-hover:underline'>
              Back
            </span>
          </Link>
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
