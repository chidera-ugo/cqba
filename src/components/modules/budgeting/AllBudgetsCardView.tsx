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
  const showData = !isError && !!res?.docs?.length;

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
            ? res?.docs?.map((budget) => {
                return (
                  <BudgetCard
                    className={'col-span-12 768:col-span-6 1340:col-span-4'}
                    {...{ onItemClick, getColor }}
                    {...budget}
                    key={budget._id}
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

      {!res?.docs.length ||
      isError ||
      (isLoading && !res?.docs.length) ? null : (
        <Pagination {...props} {...{ isLoading, isRefetching, res }} />
      )}
    </div>
  );
};
