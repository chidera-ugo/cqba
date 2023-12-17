import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { TPagination } from 'hooks/client_api/hooks/useUrlManagedState';
import { useColumns } from './useColumns';
import { Table } from 'components/core/Table';

import { Props as BudgetsListProps } from 'components/modules/budgeting/Budgets/Grid';

export const BudgetsTable = ({
  pagination,
  setPagination,
  isError,
  isLoading,
  onRowClick,
  isRefetching,
  isProjectPaused,
  data,
}: {
  onRowClick: (budget: IBudget) => void;
  isProjectPaused?: boolean;
} & BudgetsListProps &
  Partial<TPagination>) => {
  const { columns } = useColumns(isProjectPaused);

  return (
    <Table<IBudget>
      className={'mt-20 640:mt-4'}
      title='budgets'
      onRowClick={onRowClick}
      returnOriginalOnRowClick
      accessor='_id'
      mustHaveRange
      getRowStyling={(row) => {
        if (row?.original?.paused || isProjectPaused) return 'opacity-50';
        return '';
      }}
      {...{
        isLoading,
        data,
        pagination,
        columns,
        setPagination,
        isError,
        isRefetching,
      }}
    />
  );
};
