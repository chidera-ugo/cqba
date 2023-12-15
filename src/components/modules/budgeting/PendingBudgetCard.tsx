import clsx from 'clsx';
import { Avatar } from 'components/commons/Avatar';
import { BudgetPriorities, getPriorityAsText } from 'enums/budget';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { formatAmount } from 'utils/formatters/formatAmount';
import { formatDate } from 'utils/formatters/formatDate';
import { handleSort } from 'utils/handlers/handleSort';

type Props = IBudget & {
  onClick?: () => void;
  getColor?: (char: string) => string;
  className?: string;
  stripDown?: boolean;
  isDetails?: boolean;
};

export const PendingBudgetCard = ({
  getColor,
  stripDown,
  onClick,
  isDetails,
  ...budget
}: Props) => {
  const {
    expiry,
    name,
    priority,
    currency,
    beneficiaries,
    amount,
    description,
  } = budget;

  return (
    <button
      type={'button'}
      className={clsx(
        'y-between relative col-span-12 w-full text-left 640:col-span-6 1280:col-span-4',
        !stripDown ? 'card' : 'pb-2',
        isDetails ? 'cursor-default' : 'cursor-pointer hover:border-neutral-300'
      )}
      onClick={onClick}
    >
      <div className={'w-full'}>
        {!stripDown && (
          <div className={'text-sm font-medium 640:text-xl'}>{name}</div>
        )}
        <div className={'mt-1 text-sm text-neutral-500'}>{description}</div>

        <div className='mt-4 flex gap-2'>
          {priority && (
            <span
              className={clsx(
                priority === BudgetPriorities.Low
                  ? 'pill_green'
                  : priority === BudgetPriorities.Medium
                  ? 'pill_yellow'
                  : 'pill_red',
                'my-auto h-5'
              )}
            >
              Priority: {getPriorityAsText(priority)}
            </span>
          )}
          {expiry && (
            <div className={'my-auto text-xs text-neutral-500'}>
              Due Date: {formatDate(expiry, 'short', true)}
            </div>
          )}
        </div>
      </div>

      <div className='x-between relative mt-5 w-full border-t border-neutral-310 pt-4'>
        <div className={'flex gap-1 text-[20px] font-medium'}>
          <span className={'my-auto h-full pt-1 text-sm'}>{currency}</span>
          <span>{formatAmount({ value: amount / 100 })}</span>
        </div>

        {!stripDown && (
          <div className={clsx('relative flex')}>
            {handleSort({
              data: beneficiaries,
              sortBy: 'email',
            })?.map(({ email, avatar }, i) => {
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
                    avatar={avatar}
                    key={email}
                    char={email.charAt(0)}
                    getBackgroundColor={getColor}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </button>
  );
};
