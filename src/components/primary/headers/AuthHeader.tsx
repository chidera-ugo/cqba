import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/logos/main-logo.svg';
import clsx from 'clsx';
import { Right } from 'components/svgs/navigation/Arrows';

export const AuthHeader = () => {
  return (
    <header
      className={clsx(
        'sticky -top-[1px] left-0 z-[1000] h-16 border-b border-neutral-200 bg-white bg-opacity-80 backdrop-blur-md 640:h-20'
      )}
    >
      <div className='x-between relative z-10 my-auto h-16 px-4 640:px-10 1024:h-[82px]'>
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

        <div className='y-center'>
          <a
            href='https://chequebase.io'
            target='_blank'
            rel='noreferrer noopenner'
            className='text-button flex text-sm'
          >
            <span className='my-auto mr-2'>Visit Website</span>
            <span className='my-auto'>
              <Right className='h-5 w-5' />
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};
