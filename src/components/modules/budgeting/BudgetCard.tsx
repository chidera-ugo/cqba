import clsx from 'clsx';
import { DisplayValue } from 'components/common/DisplayValue';
import { Pill } from 'components/common/Pill';
import { ProfileCard } from 'components/common/ProfileCard';
import { TableAction } from 'components/core/Table/TableAction';
import { Lock, Pause } from 'components/svgs/budgeting/Budget_Icons';
import { IBudget } from 'types/budgeting/Budget';
import { formatDate } from 'utils/formatters/formatDate';

export const BudgetCard = ({
  onItemClick,
  showFullDetails,
  ...budget
}: IBudget & {
  showFullDetails?: boolean;
  onItemClick?: (res: any) => void;
}) => {
  const {
    id,
    employee,
    request,
    status,
    amount,
    dueDate,
    priority,
    createdAt,
  } = budget;

  const { options } = useBudgetActionOptions();

  return (
    <div
      className={clsx(
        'card col-span-4 transition-colors',
        !showFullDetails &&
          'cursor-pointer hover:ring-4 hover:ring-primary-main hover:ring-opacity-20'
      )}
      key={id}
      onClick={() => {
        if (showFullDetails || !onItemClick) return;
        onItemClick(budget);
      }}
    >
      <div
        className={clsx(
          'x-between mb-4',
          showFullDetails && 'mb-5 border-b border-neutral-200 pb-5'
        )}
      >
        <ProfileCard
          title={employee.fullName}
          subTitle={`${employee.department} Department`}
          avatar={employee.avatar}
        />

        {status === 'approved' && (
          <TableAction options={options} id={'budget-card-table-action'} />
        )}
      </div>

      <div className='text-left'>
        <h4 className='text-lg'>{request.title}</h4>
        <p
          className={clsx(
            'mt-1 text-sm leading-6 text-neutral-500',
            !showFullDetails && 'line-clamp-2'
          )}
        >
          {status === 'approved'
            ? `Approved by Admin - ${formatDate(dueDate, 'short')}`
            : request.description}
        </p>
      </div>

      <div className={clsx('mt-3 flex gap-3', showFullDetails && 'pt-3')}>
        <Pill
          config={{
            failed: 'high',
            pending: 'low',
          }}
          suffix='priority'
          value={priority}
        />

        <div className='my-auto text-sm text-neutral-500'>
          {formatDate(createdAt, 'short')}
        </div>
      </div>

      {status === 'pending' && (
        <div
          className={clsx(
            'mt-3 text-left',
            showFullDetails && 'mt-5 border-t border-neutral-200 pt-4'
          )}
        >
          <DisplayValue
            titleClassName={clsx('mt-0 text-2xl', showFullDetails && 'mt-1')}
            value={amount}
            title={showFullDetails ? 'Amount' : undefined}
            isAmount
          />
        </div>
      )}
    </div>
  );
};

export const useBudgetActionOptions = () => {
  return {
    options: [
      {
        title: 'Pause Budget',
        icon: <Pause />,
      },
      {
        title: 'Close Budget',
        icon: <Lock />,
      },
    ],
  };
};
