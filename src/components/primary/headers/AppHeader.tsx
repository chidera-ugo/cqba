import clsx from 'clsx';
import { MobileMenu } from 'components/primary/MobileMenu';
import { PropsWithChildren } from 'react';

interface Props {
  title?: string;
}

export const AppHeader = ({ title, children }: PropsWithChildren<Props>) => {
  return (
    <header
      onClick={() => {}}
      className={clsx(
        'sticky top-0 left-0 z-[1000] h-16 border-b border-neutral-200 bg-white bg-opacity-80 backdrop-blur-md 1024:h-20'
      )}
    >
      <div className='x-between app-container relative z-10 my-auto h-full'>
        <div className='my-auto text-xl font-semibold text-neutral-1000 640:text-2xl'>
          {title}
        </div>
        {children}
        <MobileMenu />
      </div>
    </header>
  );
};
