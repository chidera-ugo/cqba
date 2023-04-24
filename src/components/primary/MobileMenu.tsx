import { MobileMenuWrapper } from 'components/modal/ModalWrapper';
import { BoxCancel, Hamburger } from 'components/svgs/navigation/Menu';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import logo from '/public/logos/main-logo.svg';
import { useRouter } from 'next/router';
import { Right } from 'components/svgs/navigation/Arrows';

export const MobileMenu = () => {
  const { replace } = useRouter();
  const [show, setShow] = useState(false);

  function close() {
    setShow(false);
  }

  return (
    <div className='y-center block 1024:hidden'>
      <button
        onClick={() => setShow(!show)}
        className='my-auto h-10 w-10 rounded-lg bg-white'
      >
        <div className='x-center'>
          <Hamburger />
        </div>
      </button>

      <MobileMenuWrapper
        {...{
          show,
          close,
        }}
        className='max-w-[400px] bg-white'
      >
        <div className='x-between mb-4 p-4'>
          <Link href='/' onClick={() => setShow(false)} className='my-auto'>
            <Image
              src={logo}
              alt='chequebase-logo'
              className='my-auto -ml-4 h-7 object-contain'
            />
          </Link>

          <button onClick={() => setShow(!show)} className='my-auto'>
            <div className='x-center'>
              <BoxCancel />
            </div>
          </button>
        </div>

        <div className='px-3 pb-10'>
          <button
            onClick={() => {
              replace('?_a=waitlist', undefined, {
                scroll: false,
              });
              close();
            }}
            className='dark-button y-center mt-8 h-14 w-full text-center'
          >
            <span className='mx-auto'>Join waitlist</span>
          </button>

          <Link
            href='/book-a-demo'
            className='primary-button x-center mt-4 h-14 w-full'
          >
            <span className='my-auto mr-2'>Book a demo</span>
            <span className='my-auto'>
              <Right />
            </span>
          </Link>
        </div>
      </MobileMenuWrapper>
    </div>
  );
};
