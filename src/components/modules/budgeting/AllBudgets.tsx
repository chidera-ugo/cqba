import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PaginationState } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';
import { generateTableEntries } from 'utils/helpers/generators/generateTableEntries';
import { IBudget } from 'types/budgeting/Budget';
import { PaginatedResponse } from 'types/core/Table';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { AllBudgetsCardView } from 'components/modules/budgeting/AllBudgetsCardView';
import { AllBudgetsTable } from 'components/tables/budgeting/AllBudgetsTable';
import { BudgetCard } from 'components/modules/budgeting/BudgetCard';

interface Props {
  viewMode: ViewMode;
  filters: Record<string, unknown>;
  setFilters: Dispatch<SetStateAction<Record<string, string>>>;
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
  } = useMakeDummyHttpRequest({
    method: 'get',
    res: generateTableEntries<IBudget>(
      {
        id: '',
        employee: {
          avatar: '',
          fullName: 'John Doe',
          department: 'Security',
        },
        amount: 200000,
        status: String(props.filters.status).toLowerCase(),
        priority: 'low',
        request: {
          title: 'Ergonomic office furniture',
          description:
            'Request for budget allocation to purchase ergonomic chairs, desks, and accessories. Request for budget allocation to purchase ergonomic chairs, desks, and accessories. Request for budget allocation to purchase ergonomic chairs, desks, and accessories. Request for budget allocation to purchase ergonomic chairs, desks, and accessories.',
        },
        createdAt: new Date().toISOString(),
        dueDate: new Date().toISOString(),
      },
      9
    ),
  });

  useEffect(() => {
    if (!!res) setData(res.data);
  }, [res]);

  useEffect(() => {
    refetch();
  }, [props.filters]);

  const [data, setData] = useState<PaginatedResponse<IBudget> | undefined>(
    res?.data
  );

  function close() {
    setCurrentBudget(null);
    push('/budgeting', undefined, {
      scroll: false,
    });
  }

  return (
    <>
      <RightModalWrapper
        title='Budget details'
        show={!!currentBudget && currentBudget.status === 'pending'}
        {...{ close }}
        closeOnClickOutside
        childrenClassname='p-8'
      >
        {currentBudget && (
          <>
            <BudgetCard {...currentBudget} showFullDetails />

            <div className='mt-8 flex gap-4'>
              <button className='secondary-button h-11 w-full'>Reject</button>
              <button className='dark-button h-11 w-full'>Approve</button>
            </div>
          </>
        )}
      </RightModalWrapper>

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
