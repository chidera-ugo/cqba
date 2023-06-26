import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import {
  IBudget,
  useGetAllBudgets,
} from 'hooks/api/budgeting/useGetAllBudgets';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PaginationState } from '@tanstack/react-table';
import { PaginatedResponse } from 'types/Table';
import {
  LargeRightModalWrapper,
  RightModalWrapper,
} from 'components/modal/ModalWrapper';
import { AllBudgetsCardView } from 'components/modules/budgeting/AllBudgetsCardView';
import { AllBudgetsTable } from 'components/tables/budgeting/AllBudgetsTable';
import { BudgetCard } from 'components/modules/budgeting/BudgetCard';
import { ApproveBudget } from 'components/modules/budgeting/ApproveBudget';
import { ApprovedBudgetDetails } from 'components/modules/budgeting/ApprovedBudgetDetails';

interface Props {
  viewMode: ViewMode;
  filters: Record<string, unknown>;
  setFilters: Dispatch<SetStateAction<Record<string, string>>>;
  search: string;
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

export const AllBudgets = ({ viewMode, ...props }: Props) => {
  const [showPinModal, setShowPinModal] = useState(false);

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
  });

  useEffect(() => {
    if (!!res) setData(res);
  }, [res]);

  useEffect(() => {
    refetch();
  }, [props.filters]);

  const [data, setData] = useState<PaginatedResponse<IBudget> | undefined>(res);

  return (
    <>
      <RightModalWrapper
        title='Approve Budget'
        show={showPinModal}
        closeModal={() => {
          setShowPinModal(false);
        }}
        closeOnClickOutside
        childrenClassname='p-8'
      >
        <ApproveBudget
          close={() => {
            setShowPinModal(false);
          }}
        />
      </RightModalWrapper>

      <RightModalWrapper
        title='Budget Details'
        show={
          !showPinModal &&
          !!currentBudget &&
          currentBudget.status !== 'approved'
        }
        closeModal={() => {
          setShowPinModal(false);
          setCurrentBudget(null);
        }}
        closeOnClickOutside
        childrenClassname='p-8'
      >
        {currentBudget && (
          <AppErrorBoundary>
            <BudgetCard {...currentBudget} showFullDetails />

            {currentBudget.status === 'pending' && (
              <div className='mt-8 flex gap-4'>
                <button className='secondary-button h-11 w-full'>Reject</button>
                <button
                  onClick={() => setShowPinModal(true)}
                  className='dark-button h-11 w-full'
                >
                  Approve
                </button>
              </div>
            )}
          </AppErrorBoundary>
        )}
      </RightModalWrapper>

      <LargeRightModalWrapper
        title='Budget Details'
        show={
          !showPinModal &&
          !!currentBudget &&
          currentBudget.status === 'approved'
        }
        {...{
          close() {
            setCurrentBudget(null);
          },
        }}
        closeOnClickOutside
        childrenClassname='p-8'
      >
        {currentBudget && (
          <AppErrorBoundary>
            <ApprovedBudgetDetails budget={currentBudget} />
          </AppErrorBoundary>
        )}
      </LargeRightModalWrapper>

      <AppErrorBoundary>
        <AllBudgetsList
          {...props}
          title='budgets'
          emptyTableText='You have not received any requests yet.'
          {...{
            viewMode,
            onItemClick(res) {
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
