import { Building } from 'components/illustrations/Building';
import {
  ISubAccountsDepartment,
  useGetSubAccountsByDepartment,
} from 'hooks/api/sub-accounts/useGetSubAccountsByDepartment';
import { useRouter } from 'next/router';
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

export const SubAccountsDepartmentTable = ({ search }: Props) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { push } = useRouter();

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

  const [data, setData] = useState<
    PaginatedResponse<ISubAccountsDepartment> | undefined
  >(res);

  return (
    <Table<ISubAccountsDepartment>
      title='departments'
      dontScrollToTopOnPageChange
      onRowClick={(id) => push(`/sub-accounts/departments/${id}`)}
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
