import Image from 'next/image';
import shield from '/public/assets/commons/secure_shield.png';

export const IssueWithSubscription = ({
  title,
  subTitle,
  action,
  actionText,
}: {
  title: string;
  subTitle: string;
  actionText: string;
  action: () => void;
}) => {
  return (
    <div className={'x-center'}>
      <div
        className={
          'rounded-xl border border-neutral-140 bg-neutral-160 px-8 pt-5 pb-10'
        }
      >
        <Image
          src={shield}
          alt={'shield'}
          height={175}
          width={175}
          className={'mx-auto'}
        />

        <h3 className='mx-auto max-w-[432px] text-center text-xl font-semibold text-black 640:text-2xl'>
          {title}
        </h3>

        <p className='mx-auto mt-3 max-w-[325px] text-center text-sm font-normal text-neutral-500 640:text-base'>
          {subTitle}
        </p>

        <div className='x-center'>
          <button onClick={action} className='primary-button mx-auto mt-5'>
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
};
