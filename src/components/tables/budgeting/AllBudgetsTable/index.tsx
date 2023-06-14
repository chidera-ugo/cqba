import { useState } from 'react';
import { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { useColumns } from './useColumns';
import { IBudget } from 'types/budgeting/Budget';
import { Table } from 'components/core/Table';
import { BudgetListProps } from 'components/modules/budgeting/AllBudgets';

export const AllBudgetsTable = ({ onItemClick, ...props }: BudgetListProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [currentSearchColumn, setCurrentSearchColumn] = useState('');

  const { columns } = useColumns();

  return (
    <Table<IBudget>
      dontScrollToTopOnPageChange
      onRowClick={onItemClick}
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
