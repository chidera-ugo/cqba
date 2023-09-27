import { IBudget } from 'hooks/api/budgeting/useGetAllBudgets';
import { useState } from 'react';
import { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { useColumns } from './useColumns';
import { Table } from 'components/core/Table';
import { BudgetListProps } from 'components/modules/budgeting/AllBudgets';

export const AllBudgetsTable = ({ onItemClick, ...props }: BudgetListProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [currentSearchColumn, setCurrentSearchColumn] = useState('');

  const { columns } = useColumns();

  return (
    <Table<IBudget>
      hideFetchingToast
      dontScrollToTopOnPageChange
      onRowClick={onItemClick}
      shouldDisableClicking={{
        key: 'status',
        value: 'declined',
      }}
      returnOriginalOnRowClick
      accessor='id'
      mustHaveRange
      {...props}
      {...{
        setColumnFilters,
        columnFilters,
        currentSearchColumn,
        columns,
        setCurrentSearchColumn,
        setSorting,
        sorting,
      }}
      reset={() => {
        props.setPagination({
          pageIndex: 0,
          pageSize: 10,
        });
        setSorting([]);
      }}
    />
  );
};
