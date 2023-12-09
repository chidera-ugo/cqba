import clsx from 'clsx';
import { SimpleToast } from 'components/commons/SimpleToast';
import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { NoData } from 'components/core/Table/NoData';
import { Pagination } from 'components/core/Table/Pagination';
import { TableDataStates } from 'components/core/Table/TableDataStates';
import { PendingBudgetCard } from 'components/modules/budgeting/PendingBudgetCard';
import { Spinner } from 'components/svgs/dashboard/Spinner';
import {
  IBudget,
  useGetAllBudgets,
} from 'hooks/api/budgeting/useGetAllBudgets';
import { TPagination } from 'hooks/client_api/hooks/useUrlManagedState';
import { useGetColorByChar } from 'hooks/commons/useGetColorByChar';
import { className } from 'postcss-selector-parser';
import { useEffect, useState } from 'react';
import { PaginatedResponse } from 'types/Table';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { PendingBudgetDetails } from './PendingBudgetDetails';
import budgeting from '/public/mockups/budgeting.jpg';

interface Props {
  search: string;
}

export const PendingBudgets = ({
  pagination,
  setPagination,
  search,
}: Props & TPagination) => {
  const [showPinModal, setShowPinModal] = useState(false);

  const { getColor } = useGetColorByChar();

  const [currentBudget, setCurrentBudget] = useState<IBudget | null>(null);

  const {
    isLoading,
    isError,
    data: res,
    isRefetching,
  } = useGetAllBudgets({
    page: search ? 1 : pagination.pageIndex + 1,
    limit: pagination.pageSize,
    status: 'pending',
    search,
  });

  useEffect(() => {
    if (!res) return;

    setData(res);
  }, [res]);

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [search]);

  const [data, setData] = useState<PaginatedResponse<IBudget> | undefined>(res);

  function closeModal() {
    setShowPinModal(false);
    setCurrentBudget(null);
  }

  const isEmpty = data && !data?.docs?.length;

  const showData = !isError && !!data?.docs?.length;

  return (
    <>
      <RightModalWrapper
        title='Pending Approval'
        show={
          !showPinModal &&
          !!currentBudget &&
          currentBudget.status !== 'approved'
        }
        closeModal={closeModal}
        closeOnClickOutside
      >
        {currentBudget && (
          <AppErrorBoundary>
            <PendingBudgetDetails id={currentBudget._id} close={closeModal} />
          </AppErrorBoundary>
        )}
      </RightModalWrapper>

      {isEmpty ? (
        <NoData
          processing={isLoading || isRefetching}
          imageSrc={budgeting}
          title='Create Budget'
          toastClassname={'bottom-24'}
          subTitle={`Creating a budget is the first step to financial success. Define your spending limits and allocate resources strategically to achieve your business goals`}
        />
      ) : (
        <AppErrorBoundary>
          <div className={clsx(className)}>
            <SimpleToast
              show={!!data?.docs.length && (isLoading || isRefetching)}
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
                      return (
                        <PendingBudgetCard
                          className={
                            'col-span-12 768:col-span-6 1340:col-span-4'
                          }
                          {...{ getColor }}
                          {...budget}
                          onClick={() => setCurrentBudget(budget)}
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

            {pagination &&
              data?.docs?.length &&
              (pagination?.pageIndex > 0 || // Hide pagination if first page and items count is less than pageSize
                (pagination?.pageIndex === 0 &&
                  data?.docs?.length === pagination?.pageSize)) && (
                <Pagination
                  {...data}
                  {...{ isLoading, isRefetching, pagination, setPagination }}
                />
              )}
          </div>
        </AppErrorBoundary>
      )}
    </>
  );
};
