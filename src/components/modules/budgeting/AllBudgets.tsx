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
  filters: Record<string, any>;
  setFilters: Dispatch<SetStateAction<Record<string, string>>>;
  search: string;
}

export type BudgetListProps = {
  isLoading?: boolean;
  isRefetching?: boolean;
  filters: Record<string, any>;
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

export const AllBudgets = ({ viewMode, ...props }: Props) => {
  const [showPinModal, setShowPinModal] = useState(false);

  const { push } = useRouter();

  const [currentBudget, setCurrentBudget] = useState<IBudget | null>(null);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: viewMode === 'cards' ? 9 : 10,
  });

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [props.filters]);

  const {
    isLoading,
    isError,
    data: res,
    refetch,
  } = useGetAllBudgets({
    page: pagination.pageIndex,
    size: pagination.pageSize,
    // status: props.filters?.status?.value,
  });

  useEffect(() => {
    if (!!res) setData(res);
  }, [res]);

  useEffect(() => {
    refetch();
  }, [props.filters]);

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
        childrenClassname='p-8'
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
            onItemClick(res) {
              // if (res.status === 'approved')
              return push(`/budgeting/${res.id}`);

              setCurrentBudget(res);
            },
            data,
            isLoading,
            isError,
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
