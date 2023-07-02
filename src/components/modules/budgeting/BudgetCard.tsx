import clsx from 'clsx';
import { DisplayValue } from 'components/common/DisplayValue';
import { ProfileCard } from 'components/common/ProfileCard';
import { CategoryPill } from 'components/modules/categories/DefaultCategories';
import { Lock, Pause } from 'components/svgs/budgeting/Budget_Icons';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgets';
import { formatAmount } from 'utils/formatters/formatAmount';
import { formatDate } from 'utils/formatters/formatDate';

export const BudgetCard = ({
  onItemClick,
  showFullDetails,
  getColor,
  ...budget
}: IBudget & {
  showFullDetails?: boolean;
  onItemClick?: (res: any) => void;
  getColor: (char: string) => string;
}) => {
  const {
    id,
    description,
    creator,
    deadline,
    departmentTitle,
    title,
    status,
    amount,
    categoryTitle,
    createdAt,
  } = budget;

  const { options: _ } = useBudgetActionOptions();

  return (
    <div
      className={clsx(
        'card y-between col-span-4 transition-colors',
        !showFullDetails &&
          'cursor-pointer hover:ring-4 hover:ring-primary-main hover:ring-opacity-20'
      )}
      key={id}
      onClick={() => {
        if (showFullDetails || !onItemClick) return;
        onItemClick(budget);
      }}
    >
      <div>
        <div
          className={clsx(
            'x-between mb-4',
            showFullDetails && 'mb-5 border-b border-neutral-200 pb-5'
          )}
        >
          <ProfileCard
            getBackgroundColor={getColor}
            title={`${creator?.firstName} ${creator?.lastName}`}
            subTitle={`${departmentTitle} Department`}
          />

          {/*{status === 'approved' && (*/}
          {/*  <TableAction options={options} id={'budget-card-table-action'} />*/}
          {/*)}*/}
        </div>

        <div className='text-left'>
          <h4 className='text-lg'>{title}</h4>
          <p
            className={clsx(
              'mt-1 text-sm font-medium leading-6 text-neutral-500',
              !showFullDetails && 'line-clamp-2'
            )}
          >
            {status === 'approved'
              ? `Approved by Admin - ${formatDate(deadline, 'short')}`
              : description}
          </p>
        </div>
      </div>

      <div>
        <div className={clsx('mt-3 flex gap-3', showFullDetails && 'pt-3')}>
          <CategoryPill
            {...{
              getColor,
            }}
            category={categoryTitle}
          />

          <div className='my-auto text-sm text-neutral-500'>
            {formatDate(createdAt, 'short')}
          </div>
        </div>

        {status === 'open' && (
          <div
            className={clsx(
              'mt-5 border-t border-neutral-200 pt-3 text-left text-2xl font-semibold text-neutral-1000'
            )}
          >
            {showFullDetails ? (
              <DisplayValue value={Number(amount)} isAmount title={'Amount'} />
            ) : (
              <>
                ₦
                {formatAmount({
                  value: amount,
                  decimalPlaces: 2,
                  kFormatter: Number(amount) > 9999999,
                })}
              </>
            )}
          </div>
        )}
      </div>
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
