import { Building } from 'components/illustrations/Building';
import { IDepartment } from 'hooks/api/departments/useGetAllDepartments';
import { useGetSubAccountsByDepartment } from 'hooks/api/sub-accounts/useGetSubAccountsByDepartment';
import { useEffect, useState } from 'react';
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from '@tanstack/react-table';
import { PaginatedResponse } from 'types/Table';
import { useColumns } from './useColumns';
import { Table } from 'components/core/Table';

interface Props {
  search?: string;
}

export const SubAccountsByDepartmentTable = ({ search }: Props) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [currentSearchColumn, setCurrentSearchColumn] = useState('');

  const { columns } = useColumns();

  const {
    isLoading,
    isError,
    data: res,
    isRefetching,
  } = useGetSubAccountsByDepartment({
    page: pagination.pageIndex,
    size: pagination.pageSize,
    search,
  });

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [columnFilters]);

  useEffect(() => {
    if (!!res) setData(res);
  }, [res]);

  const [data, setData] = useState<PaginatedResponse<IDepartment> | undefined>(
    res
  );

  return (
    <Table<IDepartment>
      title='departments'
      dontScrollToTopOnPageChange
      accessor='id'
      mustHaveRange
      {...{
        isLoading,
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
        isRefetching,
      }}
      reset={() => {
        setPagination({
          pageIndex: 0,
          pageSize: 10,
        });
        setSorting([]);
      }}
      emptyTableText='You have not added any departments yet.'
      emptyTableIcon={<Building />}
    />
  );
};
