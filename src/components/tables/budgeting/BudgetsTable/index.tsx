import { IBudget } from 'hooks/api/budgeting/useGetAllBudgets';
import { TPagination } from 'hooks/client_api/hooks/useUrlManagedState';
import { useColumns } from './useColumns';
import { Table } from 'components/core/Table';

import { Props as BudgetsListProps } from 'components/modules/budgeting/Budgets/Grid';

export const BudgetsTable = ({
  pagination,
  setPagination,
  isError,
  setCurrentBudget,
  isLoading,
  isRefetching,
  data,
}: BudgetsListProps & TPagination) => {
  const { columns } = useColumns();

  return (
    <Table<IBudget>
      className={'mt-20 640:mt-4'}
      title='budgets'
      onRowClick={(budget) => setCurrentBudget(budget)}
      returnOriginalOnRowClick
      accessor='_id'
      mustHaveRange
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
