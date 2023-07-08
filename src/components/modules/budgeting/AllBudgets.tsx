import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import {
  IBudget,
  useGetAllBudgets,
} from 'hooks/api/budgeting/useGetAllBudgets';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PaginationState } from '@tanstack/react-table';
import { PaginatedResponse } from 'types/Table';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { AllBudgetsCardView } from 'components/modules/budgeting/AllBudgetsCardView';
import { AllBudgetsTable } from 'components/tables/budgeting/AllBudgetsTable';
import { PendingBudgetDetails } from './PendingBudgetDetails';

interface Props {
  viewMode: ViewMode;
  search: string;
  status?: string;
  currentTab?: { name: string; value: string };
}

export type BudgetListProps = {
  isLoading?: boolean;
  isRefetching?: boolean;
  emptyTableText: string;
  isError?: boolean;
  data: PaginatedResponse<IBudget> | undefined;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  onItemClick?: ((res: any) => void) | undefined;
  className?: string;
  title: string;
};

export type ViewMode = 'table' | 'cards';

export const AllBudgets = ({
  viewMode,
  currentTab,
  status,
  ...props
}: Props) => {
  const [showPinModal, setShowPinModal] = useState(false);

  const { push } = useRouter();

  const [currentBudget, setCurrentBudget] = useState<IBudget | null>(null);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: viewMode === 'cards' ? 9 : 10,
  });

  const {
    isLoading,
    isError,
    data: res,
    isRefetching,
  } = useGetAllBudgets({
    page: pagination.pageIndex,
    size: pagination.pageSize,
    status,
  });

  useEffect(() => {
    if (!currentTab) return;

    if (!res) return setData(undefined);

    setData(res);
  }, [res, currentTab]);

  const [data, setData] = useState<PaginatedResponse<IBudget> | undefined>(res);

  function closeModal() {
    setShowPinModal(false);
    setCurrentBudget(null);
  }

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
            <PendingBudgetDetails id={currentBudget.id} close={closeModal} />
          </AppErrorBoundary>
        )}
      </RightModalWrapper>

      <AppErrorBoundary>
        <AllBudgetsList
          {...props}
          title='budgets'
          emptyTableText='You have not received any requests yet.'
          {...{
            viewMode,
            onItemClick(res: IBudget) {
              if (res.status === 'declined') return null;

              if (res.status === 'approved')
                return push(`/budgeting/${res.id}`);

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

export const AllBudgetsList = ({
  viewMode,
  ...props
}: { viewMode: ViewMode } & BudgetListProps) => {
  if (viewMode === 'cards') return <AllBudgetsCardView {...props} />;

  return <AllBudgetsTable {...props} />;
};
