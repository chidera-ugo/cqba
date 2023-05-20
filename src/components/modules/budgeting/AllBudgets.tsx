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
    pageSize: 10,
  });

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [props.filters]);

  const {
    isLoading,
    isError,
    data: res,
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
        status: 'pending',
        priority: 'high',
        request: {
          title: 'Ergonomic office furniture',
          description:
            'Request for budget allocation to create or improve meeting rooms, conference areas.',
        },
        createdAt: new Date().toISOString(),
        dueDate: new Date().toISOString(),
      },
      10
    ),
  });

  useEffect(() => {
    if (!!res) setData(res.data);
  }, [res]);

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
        show={!!currentBudget}
        {...{ close }}
        closeOnClickOutside
        childrenClassname='p-0'
      ></RightModalWrapper>

      <AllBudgetsList
        {...props}
        title='budgets'
        emptyTableText='You have not received any requests yet.'
        {...{
          viewMode,
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
