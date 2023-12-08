import clsx from 'clsx';
import { Spinner } from 'components/svgs/dashboard/Spinner';
import { PropsWithChildren } from 'react';
import { formatAmount } from 'utils/formatters/formatAmount';

interface Props {
  className?: string;
  planName: string;
  amount: number;
  description: string;
  isMostPopular?: boolean;
  isActive?: boolean;
  minimal?: boolean;
  duration?: string;
  buttonClassname?: string;
  choosePlan: () => void;
  processing?: boolean;
  isEligibleForTrial?: boolean;
}

export const PlanCard = ({
  className,
  planName,
  buttonClassname,
  description,
  amount,
  isMostPopular,
  duration,
  minimal,
  choosePlan,
  isActive,
  processing,
  isEligibleForTrial,
}: PropsWithChildren<Props>) => {
  return (
    <div className={clsx('card y-between relative rounded-2xl', className)}>
      <div className={clsx(!minimal && '640:min-h-[140px]')}>
        <div className='flex gap-2'>
          <h6
            className={clsx(
              'text-lg font-medium text-black',

              'capitalize',
              isMostPopular ? 'text-white' : 'text-black'
            )}
          >
            {planName}
          </h6>

          {isMostPopular && (
            <span className={'pill_gray my-auto'}>Most Popular</span>
          )}
        </div>

        <p
          className={clsx(
            'mt-4 text-base',
            isMostPopular ? 'text-white' : 'text-black'
          )}
        >
          {description}
        </p>

        <div
          className={clsx(
            'mt-6 flex min-h-[42px] gap-1',
            isMostPopular ? 'text-white' : 'text-black'
          )}
        >
          <h5
            className={
              'my-auto text-[34px] font-semibold leading-none text-inherit'
            }
          >
            {isNaN(Number(amount))
              ? amount
              : amount > 0
              ? `₦${formatAmount({
                  value:
                    duration === 'MONTHLY'
                      ? amount / 100
                      : (amount * 12 * 0.7) / 100,
                  decimalPlaces: 0,
                })}`
              : 'Free'}
          </h5>
          {duration && amount > 0 && (
            <span className={'text-[28px] font-medium'}>
              /{duration === 'MONTHLY' ? 'mo' : 'yr'}
            </span>
          )}
        </div>

        <p
          className={clsx(
            'mt-1 text-base font-light',
            isMostPopular ? 'text-white' : 'text-black'
          )}
        >
          + Processing Fees
        </p>
      </div>

      <div className={'mt-8'}>
        {isActive || processing ? (
          <div
            className={clsx(
              'y-center w-full',
              buttonClassname,
              processing && 'opacity-80'
            )}
          >
            {processing ? <Spinner className={'mx-auto'} /> : 'Current Plan'}
          </div>
        ) : (
          <button
            type={'button'}
            onClick={choosePlan}
            className={clsx('w-full', buttonClassname)}
          >
            Get Started{amount > 0 ? '' : ` For Free`}
          </button>
        )}

        {isEligibleForTrial && (
          <p
            className={clsx(
              'mt-3 text-center text-sm italic',
              isMostPopular ? 'text-white' : 'text-neutral-500'
            )}
          >
            5 days free trial
          </p>
        )}
      </div>
    </div>
  );
};
