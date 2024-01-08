import clsx from 'clsx';
import { useUserRole } from 'hooks/access_control/useUserRole';
import Image from 'next/image';
import shield from '/public/assets/commons/secure_shield.png';
import { ReactNode } from 'react';

interface Props {
  title: ReactNode;
  subTitle: string;
  actionText: string;
  action: () => void;
  employeeCanPerformAction?: boolean;
  className?: string;
  wrapperClassname?: string;
}

export const IssueWithSubscription = ({
  title,
  subTitle,
  action,
  actionText,
  className,
  employeeCanPerformAction = false,
  wrapperClassname,
}: Props) => {
  const { isOwner } = useUserRole();

  return (
    <div className={clsx('mx-auto w-full max-w-[500px]', wrapperClassname)}>
      <div
        className={clsx(
          'rounded-xl px-8 pt-5 pb-10',
          className ?? 'border border-neutral-140 bg-neutral-160'
        )}
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

        <p className='mx-auto mt-3 max-w-[348px] text-center text-sm font-normal text-neutral-500 640:text-base'>
          {subTitle}
        </p>
        {isOwner || employeeCanPerformAction ? (
          <div className='x-center'>
            <button onClick={action} className='primary-button mx-auto mt-5'>
              {actionText}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
