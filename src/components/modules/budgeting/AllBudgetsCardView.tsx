import clsx from 'clsx';
import { Pagination } from 'components/core/Table/Pagination';
import { BudgetListProps } from 'components/modules/budgeting/AllBudgets';
import { BudgetCard } from 'components/modules/budgeting/BudgetCard';

export const AllBudgetsCardView = ({
  className,
  isRefetching,
  isLoading,
  isError,
  data: res,
  onItemClick,
  ...props
}: BudgetListProps) => {
  const showData = !isError && !!res?.content?.length;

  return (
    <div className={clsx(className)}>
      <div
        className={clsx(
          !showData && `rounded-[10px] border border-neutral-200 bg-white`
        )}
      >
        <div className='grid w-full grid-cols-12 gap-5'>
          {showData
            ? res.content.map((budget) => {
                return (
                  <BudgetCard
                    {...{ onItemClick }}
                    {...budget}
                    key={budget.id}
                  />
                );
              })
            : null}
        </div>
      </div>

      <Pagination {...props} {...{ isLoading, isRefetching, res }} />
    </div>
  );
};
