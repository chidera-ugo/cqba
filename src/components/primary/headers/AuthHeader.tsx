import clsx from 'clsx';
import { LogoutButton } from 'components/buttons/Logout';
import { Logo } from 'components/primary/headers/AppHeader';
import { Right } from 'components/svgs/navigation/Arrows';
import { useAppContext } from 'context/AppContext';

export const AuthHeader = () => {
  const { user } = useAppContext().state;

  return (
    <header
      className={clsx(
        'nav_bar sticky -top-[1px] left-0 z-[1000] h-14 border-b border-neutral-200 640:h-20'
      )}
    >
      <div className='x-between app-container relative z-10 my-auto h-full'>
        <Logo />

        <div className='y-center'>
          {!!user ? (
            <LogoutButton />
          ) : (
            <a
              href='https://chequebase.io'
              target='_blank'
              rel='noreferrer noopenner'
              className='text-button flex text-xs font-medium text-black 640:text-sm'
            >
              <span className='my-auto block 640:hidden'>Learn More</span>
              <span className='my-auto hidden 640:block'>Visit Website</span>
              <span className='my-auto ml-2 hidden 640:block'>
                <Right className='h-5 w-5' />
              </span>
            </a>
          )}
        </div>
      </div>
    </header>
  );
};
