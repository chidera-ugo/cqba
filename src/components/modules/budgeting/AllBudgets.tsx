import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { EmptyTable } from 'components/core/Table/EmptyTable';
import {
  IBudget,
  useGetAllBudgets,
} from 'hooks/api/budgeting/useGetAllBudgets';
import { TPagination } from 'hooks/client_api/hooks/useUrlManagedState';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PaginationState } from '@tanstack/react-table';
import { PaginatedResponse } from 'types/Table';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { AllBudgetsCardView } from 'components/modules/budgeting/AllBudgetsCardView';
import { PendingBudgetDetails } from './PendingBudgetDetails';
import budgeting from '/public/mockups/budgeting.jpg';

interface Props {
  search: string;
  status?: string;
  currentTab?: { name: string; value: string };
}

export type BudgetListProps = {
  isLoading?: boolean;
  isRefetching?: boolean;
  isError?: boolean;
  data: PaginatedResponse<IBudget> | undefined;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  onItemClick?: ((res: any) => void) | undefined;
  className?: string;
  title: string;
};

export const AllBudgets = ({
  status,
  pagination,
  setPagination,
  ...props
}: Props & TPagination) => {
  const [showPinModal, setShowPinModal] = useState(false);

  const { push } = useRouter();

  const [currentBudget, setCurrentBudget] = useState<IBudget | null>(null);

  const {
    isLoading,
    isError,
    data: res,
    isRefetching,
  } = useGetAllBudgets({
    page: pagination.pageIndex + 1,
    size: pagination.pageSize,
    status: status === 'active' ? undefined : status,
  });

  useEffect(() => {
    if (!res) return;

    setData(res);
  }, [res]);

  const [data, setData] = useState<PaginatedResponse<IBudget> | undefined>(res);

  function closeModal() {
    setShowPinModal(false);
    setCurrentBudget(null);
  }

  console.log(status);

  if (!isLoading && !data?.docs?.length)
    return (
      <EmptyTable
        processing={isLoading || isRefetching}
        imageSrc={budgeting}
        title='Create Budget'
        subTitle={`Creating a budget is the first step to financial success. Define your spending limits and allocate resources strategically to achieve your business goals`}
      />
    );

  return (
    <>
      <RightModalWrapper
        title='Pending Budget'
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

      <AppErrorBoundary>
        <AllBudgetsCardView
          {...props}
          title='budgets'
          {...{
            onItemClick(res: IBudget) {
              if (res.status === 'declined') return null;

              if (res.status === 'approved')
                return push(`/budgeting/${res._id}`);

              setCurrentBudget(res);
            },
            data,
            isLoading,
            isError,
            isRefetching,
            pagination,
            setPagination,
          }}
        />
      </AppErrorBoundary>
    </>
  );
};
