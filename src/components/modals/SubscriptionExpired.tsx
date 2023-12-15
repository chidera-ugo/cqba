import { CentredModalWrapper } from 'components/modal/ModalWrapper';
import asset from '/public/assets/subscription/locked.jpg';
import Image from 'next/image';

interface Props {
  show: boolean;
  title?: string;
  hideBackdrop?: boolean;
}

export const SubscriptionExpired = ({ show, title, hideBackdrop }: Props) => {
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
          alt={'budget_categories'}
          className={'mx-auto -mt-2 pb-2'}
        />
        <h2 className='text-center text-3xl font-semibold leading-8 tracking-tight text-black'>
          {title}
        </h2>
        <p className='mx-auto mt-5 px-7 text-center text-sm font-normal text-neutral-500 640:text-lg'>
          Business present plan has expired. To renew or change plan, click on
          the button below to Renew or Change Plan
        </p>
        <div className='mx-auto mt-11 h-full w-fit flex-shrink-0'>
          <button className='primary-button x-center my-auto px-5 text-base 640:h-12 640:w-full 640:px-6'>
            <span className={'my-auto font-medium'}>
              Renew Subscription or change plan
            </span>
          </button>
        </div>
      </div>
    </CentredModalWrapper>
  );
};
