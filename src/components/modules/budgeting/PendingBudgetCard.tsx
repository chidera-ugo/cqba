import clsx from 'clsx';
import { Avatar } from 'components/commons/Avatar';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgets';
import { formatAmount } from 'utils/formatters/formatAmount';
import { formatDate } from 'utils/formatters/formatDate';
import { handleSort } from 'utils/handlers/handleSort';

type Props = IBudget & {
  showFullDetails?: boolean;
  onClick?: () => void;
  getColor: (char: string) => string;
  className?: string;
};

export const PendingBudgetCard = ({ getColor, onClick, ...budget }: Props) => {
  const { expiry, name, currency, beneficiaries, amount, description } = budget;

  return (
    <button
      type={'button'}
      className={clsx(
        'card y-between relative col-span-12 w-full cursor-pointer text-left hover:border-neutral-300 640:col-span-6 1280:col-span-4'
      )}
      onClick={onClick}
    >
      <div className={'w-full'}>
        <div className={'text-sm font-medium 640:text-xl'}>{name}</div>
        <div className={'mt-1 text-sm text-neutral-500'}>{description}</div>

        <div className='mt-4 flex'>
          {expiry && (
            <div className={'text-xs text-neutral-500'}>
              Due Date: {formatDate(expiry, 'semi-full')}
            </div>
          )}
        </div>
      </div>

      <div className='x-between relative mt-5 w-full border-t border-neutral-310 pt-4'>
        <div className={'text-base font-medium'}>
          {currency}
          {formatAmount({ value: amount / 100 })}
        </div>

        <div className={clsx('relative flex')}>
          {handleSort({
            data: beneficiaries,
            sortBy: 'email',
          })?.map(({ email }, i) => {
            return (
              <div
                key={email}
                className={clsx('absolute', 'right-0 top-0 z-10')}
                style={{
                  zIndex: 10 + i,
                  right: 23 * i,
                }}
              >
                <Avatar
                  className={clsx('-ml-2 ring-2 ring-white')}
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
    </button>
  );
};
