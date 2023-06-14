import clsx from 'clsx';
import { IsEmpty } from 'components/core/Table';
import { Pagination } from 'components/core/Table/Pagination';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { BudgetListProps } from 'components/modules/budgeting/AllBudgets';
import { BudgetCard } from 'components/modules/budgeting/BudgetCard';

export const AllBudgetsCardView = ({
  emptyTableText,
  className,
  isRefetching,
  isLoading,
  isError,
  title,
  data: res,
  onItemClick,
  ...props
}: BudgetListProps) => {
  const showData = !isError && res?.hasContent && res.content.length;

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

        <>
          {(isLoading &&
            typeof res?.hasContent === 'boolean' &&
            !res?.hasContent) ||
          (!res && isLoading) ||
          (typeof res?.hasContent === 'boolean' &&
            !res?.hasContent &&
            isRefetching) ? (
            <IsLoading />
          ) : isError ? (
            <IsError
              title='An error occurred'
              description={`Failed to fetch ${title}`}
            />
          ) : (typeof res?.hasContent === 'boolean' && !res?.hasContent) ||
            res?.empty ? (
            <div className='y-center h-full px-5 py-32'>
              {emptyTableText && (
                <IsEmpty
                  {...{
                    emptyTableText,
                  }}
                />
              )}
            </div>
          ) : null}
        </>
      </div>

      <Pagination {...props} {...{ isLoading, isRefetching, res }} />
    </div>
  );
};
