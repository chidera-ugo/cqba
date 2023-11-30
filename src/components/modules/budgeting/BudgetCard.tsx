import clsx from 'clsx';
import { Avatar } from 'components/commons/Avatar';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgets';
import { Fragment } from 'react';
import { formatAmount } from 'utils/formatters/formatAmount';
import { formatDate } from 'utils/formatters/formatDate';

type Props = IBudget & {
  showFullDetails?: boolean;
  onItemClick?: (res: any) => void;
  getColor: (char: string) => string;
  className?: string;
};

export const BudgetCard = ({ getColor, ...budget }: Props) => {
  const {
    // _id,
    // description,
    amountUsed,
    expiry,
    name,
    currency,
    beneficiaries,
    // status,
    amount,
    availableAmount,
    threshold,
  } = budget;

  // const budgetIsActive = status !== 'open' && status !== 'declined';

  function getWidth(val: number) {
    return `${Math.round((val * 100) / amount)}%`;
  }

  const breakdown = [
    {
      title: 'Spent',
      className: 'bg-primary-main',
      value: amountUsed,
    },
    {
      title: 'Available',
      className: 'bg-neutral-200',
      value: availableAmount,
    },
    {
      title: 'Budget Threshold',
      className: 'bg-neutral-300',
      value: threshold,
      disabled: threshold === amount,
    },
  ];

  return (
    <div className={'card col-span-12 640:col-span-6 1280:col-span-4'}>
      <div className='x-between '>
        <div>
          <div className={'text-base font-medium'}>{name}</div>
          {expiry && (
            <div className={'text-[10px] text-neutral-500'}>
              Due Date: {formatDate(expiry, 'semi-full')}
            </div>
          )}
        </div>

        <div className='relative flex'>
          {beneficiaries.map(({ email }, i) => {
            return (
              <div
                key={email}
                className={'absolute right-0 top-0 z-10'}
                style={{
                  zIndex: 10 + i,
                  right: 23 * i,
                }}
              >
                <Avatar
                  className={'-ml-2 ring-2 ring-white'}
                  size={27}
                  key={email}
                  char={email.charAt(0)}
                  getBackgroundColor={getColor}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className={'mt-6 text-sm font-medium'}>
        Total Budget: {currency}
        {formatAmount({ value: amount / 100 })}
      </div>

      <div className='relative mt-3 h-2 w-full overflow-hidden rounded-full bg-neutral-200'>
        {threshold !== amount && (
          <div
            className={
              'absolute left-0 top-0 h-full rounded-full bg-neutral-300'
            }
            style={{
              width: getWidth(threshold),
            }}
          ></div>
        )}

        <div
          className={
            'absolute left-0 top-0 h-full rounded-full bg-primary-main'
          }
          style={{
            width: getWidth(amountUsed),
          }}
        ></div>
      </div>

      <div className='hidden-scrollbar mt-4 flex gap-5 overflow-y-auto'>
        {breakdown.map(({ title, disabled, value, className }) => {
          if (disabled) return <Fragment key={title} />;

          return (
            <div key={title} className={clsx('w-full')}>
              <div className='flex w-full'>
                <div className={'flex-shrink-0 text-[10px] text-neutral-500'}>
                  {title}
                </div>

                <div
                  className={clsx(
                    className,
                    'my-auto ml-1 flex-shrink-0 rounded-full'
                  )}
                  style={{
                    height: 7,
                    width: 7,
                  }}
                ></div>
              </div>

              <div className='mt-0.5 w-full text-xs font-medium'>
                {currency}
                {formatAmount({
                  value: value / 100,
                  kFormatter: value > 99999999,
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
