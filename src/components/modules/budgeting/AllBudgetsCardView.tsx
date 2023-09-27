import clsx from 'clsx';
import { Pagination } from 'components/core/Table/Pagination';
import { TableDataStates } from 'components/core/Table/TableDataStates';
import { BudgetListProps } from 'components/modules/budgeting/AllBudgets';
import { BudgetCard } from 'components/modules/budgeting/BudgetCard';
import { useGetColorByChar } from 'hooks/common/useGetColorByChar';

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

  const { getColor } = useGetColorByChar();

  return (
    <div className={clsx(className)}>
      <div
        className={clsx(
          'mb-6',
          !showData && `rounded-[10px] border border-neutral-200 bg-white`
        )}
      >
        <div className='grid w-full grid-cols-12 gap-5'>
          {showData
            ? res.content.map((budget) => {
                return (
                  <BudgetCard
                    className={'col-span-12 768:col-span-6 1340:col-span-4'}
                    {...{ onItemClick, getColor }}
                    {...budget}
                    key={budget.id}
                  />
                );
              })
            : null}
        </div>

        <TableDataStates
          {...props}
          {...{
            data: res,
            isError,
            isLoading,
          }}
        />
      </div>

      {res?.empty || isError || (isLoading && !res?.content.length) ? null : (
        <Pagination {...props} {...{ isLoading, isRefetching, res }} />
      )}
    </div>
  );
};
