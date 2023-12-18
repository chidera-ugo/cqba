import clsx from 'clsx';
import { SimpleToast } from 'components/commons/SimpleToast';
import { Pagination } from 'components/core/Table/Pagination';
import { TableDataStates } from 'components/core/Table/TableDataStates';
import { ActiveBudgetCard } from 'components/modules/budgeting/ActiveBudgetCard';
import { PendingBudgetCard } from 'components/modules/budgeting/PendingBudgetCard';
import { Spinner } from 'components/svgs/dashboard/Spinner';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { TPagination } from 'hooks/client_api/hooks/useUrlManagedState';
import { useGetColorByChar } from 'hooks/commons/useGetColorByChar';
import { Dispatch, SetStateAction } from 'react';
import { PaginatedResponse } from 'types/Table';

export interface Props {
  setCurrentBudget?: Dispatch<SetStateAction<IBudget | null>>;
  data?: PaginatedResponse<IBudget>;
  isLoading: boolean;
  isRefetching?: boolean;
  isError: boolean;
  currentTab?: string;
  isProjectsList?: boolean;
  isProjectPaused?: boolean;
  isApprovalsPage?: boolean;
  onCardClick?: (budget: IBudget) => void;
}

export const BudgetsGrid = ({
  currentTab,
  setCurrentBudget,
  isRefetching,
  isLoading,
  data,
  isError,
  pagination,
  setPagination,
  isProjectsList,
  isApprovalsPage,
  onCardClick,
  isProjectPaused,
}: Props & Partial<TPagination>) => {
  const { getColor } = useGetColorByChar();

  const showData = !isError && !!data?.docs?.length;

  return (
    <div>
      <SimpleToast
        show={!!data?.docs.length && (isLoading || !!isRefetching)}
        className='bottom-24 left-0 1180:left-[122px]'
      >
        <div className='flex py-2'>
          <Spinner className='my-auto mr-1 h-4 text-white' />
          <span className='my-auto'>Fetching</span>
        </div>
      </SimpleToast>

      <div
        className={clsx(
          'mb-0',
          !showData && `rounded-[10px] border border-neutral-200 bg-white`
        )}
      >
        <div className='grid w-full grid-cols-12 gap-5'>
          {showData
            ? data?.docs?.map((budget) => {
                if (currentTab === 'pending')
                  return (
                    <PendingBudgetCard
                      className={'col-span-12 768:col-span-6 1340:col-span-4'}
                      {...{ getColor }}
                      {...budget}
                      onClick={
                        !setCurrentBudget
                          ? undefined
                          : () => setCurrentBudget(budget)
                      }
                      key={budget._id}
                    />
                  );

                return (
                  <ActiveBudgetCard
                    onClick={
                      !onCardClick ? undefined : () => onCardClick(budget)
                    }
                    isProject={isProjectsList}
                    className={'col-span-12 768:col-span-6 1340:col-span-4'}
                    {...{ getColor, isApprovalsPage, isProjectPaused }}
                    {...budget}
                    key={budget._id}
                  />
                );
              })
            : null}
        </div>

        <TableDataStates
          title={'budgets'}
          {...{
            isLoading,
            isError,
            data,
          }}
        />
      </div>

      {!!pagination &&
        !!setPagination &&
        data?.docs?.length &&
        (pagination?.pageIndex > 0 || // Hide pagination if first page and items count is less than pageSize
          (pagination?.pageIndex === 0 &&
            data?.docs?.length >= pagination?.pageSize)) && (
          <Pagination
            noPadding
            {...data}
            {...{ isLoading, isRefetching, pagination, setPagination }}
          />
        )}
    </div>
  );
};
