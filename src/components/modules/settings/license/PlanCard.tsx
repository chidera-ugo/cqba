import clsx from 'clsx';
import { SolidCheck } from 'components/svgs/others/Check';
import { PropsWithChildren } from 'react';
import { formatAmount } from 'utils/formatters/formatAmount';

interface Props {
  className?: string;
  planName: string;
  amount: string;
  description: string;
  isBestValue?: boolean;
  color: string;
  benefits: { title: string; minimumPlan?: string }[];
  isActive?: boolean;
  onlyShowHeader?: boolean;
  minimal?: boolean;
}

export const PlanCard = ({
  className,
  planName,
  onlyShowHeader,
  description,
  amount,
  isBestValue,
  color,
  benefits,
  isActive,
  minimal,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div className={clsx('card relative', className)}>
      {isBestValue && !minimal && (
        <div className='absolute -top-3 left-4 rounded-full bg-primary-main px-3 py-1 text-sm text-white'>
          Best Value
        </div>
      )}

      <div className={clsx(!minimal && '640:min-h-[140px]')}>
        <div className='mb-2 text-lg font-medium text-neutral-500'>
          Chequebase{' '}
          <span
            style={{
              color,
            }}
            className={'capitalize'}
          >
            {planName}
          </span>
        </div>

        <div className='flex'>
          <h5 className={'mr-2 text-4xl font-semibold 768:text-5xl'}>
            ₦{formatAmount({ value: amount, decimalPlaces: 0 })}
          </h5>
          <span className={'my-auto text-lg font-medium text-neutral-500'}>
            Monthly
          </span>
        </div>

        <p className={'mt-3 text-sm font-medium text-neutral-800'}>
          {description}
        </p>
      </div>

      {!onlyShowHeader && (
        <div>
          <button
            disabled={isActive}
            className={clsx(
              isBestValue ? 'primary-button' : 'dark-button',
              'mt-5 h-11 w-full disabled:hover:bg-black'
            )}
          >
            {isActive ? 'Active Plan' : 'Get Started'}
          </button>

          <div className={'mt-4'}>
            {benefits.map(({ title, minimumPlan }) => {
              const isAvailable =
                minimumPlan === planName ||
                planName === 'elite' ||
                (planName === 'pro' && minimumPlan === 'basic');

              return (
                <div
                  key={title}
                  className={clsx(
                    'flex py-1.5 text-neutral-400',
                    !isAvailable && 'opacity-20'
                  )}
                >
                  <span className='my-auto mr-2'>
                    <SolidCheck className={'h-5 w-5 640:h-6 640:w-6'} />
                  </span>

                  <span
                    className={
                      'my-auto text-sm text-neutral-1000 640:text-base'
                    }
                  >
                    {title}
                  </span>
                </div>
              );
            })}
          </div>

          {children}
        </div>
      )}
    </div>
  );
};
