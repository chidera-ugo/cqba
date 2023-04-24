import clsx from 'clsx';
import { PropsWithChildren } from 'react';

interface Props {
  title?: string;
}

export const AppHeader = ({ title, children }: PropsWithChildren<Props>) => {
  return (
    <header
      className={clsx(
        'sticky -top-[1px] left-0 z-[1000] h-16 border-b border-neutral-200 bg-white bg-opacity-80 backdrop-blur-md 640:h-20'
      )}
    >
      <div className='x-between app-container relative z-10 my-auto h-16 1024:h-[82px]'>
        <div className='my-auto text-2xl font-semibold text-neutral-1000'>
          {title}
        </div>

        {children}
      </div>
    </header>
  );
};
