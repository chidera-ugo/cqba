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
      className: 'bg-neutral-300',
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
    <div className={'card col-span-4'}>
      <div className='x-between'>
        <div>
          <div className={'text-base font-medium'}>{name}</div>
          {expiry && (
            <div className={'text-[10px] text-neutral-500'}>
              Due Date: {formatDate(expiry, 'semi-full')}
            </div>
          )}
        </div>

        <Avatar char={name.charAt(0)} getBackgroundColor={getColor} />
      </div>

      <div className={'text-sm font-medium'}>
        Total Budget: {currency}
        {formatAmount({ value: amount / 100 })}
      </div>

      <div className='relative mt-3 h-2 w-full overflow-hidden rounded-full bg-neutral-200'>
        {threshold !== amount && (
          <div
            className={'absolute left-0 top-0 h-full rounded-full bg-green-300'}
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

      <div className='mt-4 flex gap-5'>
        {breakdown.map(({ title, disabled, value, className }) => {
          if (disabled) return <Fragment key={title} />;

          return (
            <div key={title}>
              <div className='flex'>
                <div className={'text-[10px] text-neutral-500'}>{title}</div>

                <span
                  className={clsx(className, 'my-auto ml-1 rounded-full')}
                  style={{
                    height: 7,
                    width: 7,
                  }}
                ></span>
              </div>

              <div className='mt-0.5 text-xs font-medium'>
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
