import {
  IEmployee,
  useGetAllEmployees,
} from 'hooks/api/employees/useGetAllEmployees';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from '@tanstack/react-table';
import { PaginatedResponse } from 'types/Table';
import { useColumns } from './useColumns';
import { Table } from 'components/core/Table';

interface Props {
  reset?: () => void;
  search?: string;
  filters?: Record<string, unknown>;
  setFilters?: Dispatch<SetStateAction<Record<string, string>>>;
  slot?: JSX.Element;
  currentEmployee: IEmployee | null;
  onRowClick: Dispatch<SetStateAction<IEmployee | null>>;
}

export const AllEmployeesTable = ({
  slot,
  reset,
  filters,
  setFilters,
  onRowClick,
}: Props) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [currentSearchColumn, setCurrentSearchColumn] = useState('');

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [filters, columnFilters]);

  const {
    isLoading,
    isError,
    data: res,
  } = useGetAllEmployees({
    page: pagination.pageIndex,
    size: pagination.pageSize,
  });

  useEffect(() => {
    if (!!res) setData(res);
  }, [res]);

  const [data, setData] = useState<PaginatedResponse<IEmployee> | undefined>(
    res
  );

  const { columns } = useColumns();

  return (
    <Table<IEmployee>
      title='employees'
      headerSlot={slot}
      dontScrollToTopOnPageChange
      onRowClick={(employee) => {
        onRowClick(employee);
      }}
      onFilterClick={
        !setFilters
          ? undefined
          : (filter) => setFilters(({ [filter]: _, ...rest }) => rest)
      }
      returnOriginalOnRowClick
      accessor='id'
      mustHaveRange
      {...{
        isLoading,
        filters,
        data,
        setColumnFilters,
        columnFilters,
        currentSearchColumn,
        pagination,
        columns,
        setPagination,
        setCurrentSearchColumn,
        setSorting,
        sorting,
        isError,
      }}
      reset={() => {
        setFilters && setFilters({});
        setPagination({
          pageIndex: 0,
          pageSize: 10,
        });
        setSorting([]);
        reset && reset();
      }}
      emptyTableText='You have not added any employees yet.'
    />
  );
};
