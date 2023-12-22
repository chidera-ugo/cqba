import {
  CentredModalWrapper,
  RightModalWrapper,
} from 'components/modal/ModalWrapper';
import asset from '/public/assets/subscription/locked.jpg';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  show: boolean;
  title: string;
  subText: string;
  buttonText?: string;
  hideBackdrop?: boolean;
  type?: 'right' | 'center';
  close?: () => void;
}

export const SubscriptionExpired = ({
  show,
  title,
  subText,
  buttonText,
  hideBackdrop,
  type,
  close,
}: Props) => {
  if (type === 'right')
    return (
      <RightModalWrapper
        {...{
          show,
          hideBackdrop,
        }}
        closeModal={close}
        closeOnClickOutside
        childrenClassname='py-0 640:px-8 px-4'
      >
        <div className='mt-10 grid justify-items-center rounded-xl bg-neutral-160'>
          <Image
            src={asset}
            alt={'subscription_expired'}
            className={'mx-auto mt-4 pb-2 mix-blend-multiply'}
          />
          <h3 className='px-20 text-center text-2xl font-semibold text-black'>
            {title}
          </h3>
          <p className='mx-auto mt-3 px-7 text-center text-sm font-normal text-neutral-500 640:text-lg'>
            {subText}
          </p>
          <div className='mx-auto mt-5 mb-10 h-full w-fit flex-shrink-0'>
            <button className='primary-button x-center my-auto px-5 text-base 640:h-12 640:w-full 640:px-6'>
              <Link
                href={'/settings/license'}
                className={'my-auto font-medium'}
              >
                {buttonText}
              </Link>
            </button>
          </div>
        </div>
      </RightModalWrapper>
    );

  return (
    <CentredModalWrapper
      undraggable
      hideHeader
      {...{
        show,
        hideBackdrop,
      }}
      className='bg-white p-0'
    >
      <div className='max-w-[550px] p-[50px]'>
        <Image
          src={asset}
          alt={'subscription_expired'}
          className={'mx-auto -mt-2 pb-2'}
        />
        <h2 className='text-center text-3xl font-semibold leading-8 tracking-tight text-black'>
          {title}
        </h2>
        <p className='mx-auto mt-5 px-7 text-center text-sm font-normal text-neutral-500 640:text-lg'>
          {subText}
        </p>
        <div className='mx-auto mt-11 h-full w-fit flex-shrink-0'>
          <button className='primary-button x-center my-auto px-5 text-base 640:h-12 640:w-full 640:px-6'>
            <span className={'my-auto font-medium'}>
              <Link
                href={'/settings/license'}
                className={'my-auto font-medium'}
              >
                Renew Subscription or change plan
              </Link>
            </span>
          </button>
        </div>
      </div>
    </CentredModalWrapper>
  );
};
