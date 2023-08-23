import { useQueryClient } from '@tanstack/react-query';
import { Confirmation } from 'components/modals/Confirmation';
import { EmployeeAction } from 'components/tables/employees/AllEmployeesTable/EmployeeActions';
import { useBlockEmployee } from 'hooks/api/employees/useBlockEmployee';
import { useDeleteEmployee } from 'hooks/api/employees/useDeleteEmployee';
import {
  IEmployee,
  useGetAllEmployees,
} from 'hooks/api/employees/useGetAllEmployees';
import { useUnblockEmployee } from 'hooks/api/employees/useUnblockEmployee';
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
  filters?: Record<string, any>;
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
  const queryClient = useQueryClient();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [employeeToPerformActionOn, setEmployeeToPerformActionOn] =
    useState<IEmployee | null>(null);

  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [action, setAction] = useState<EmployeeAction>(null);

  const [currentSearchColumn, setCurrentSearchColumn] = useState('');

  const [showConfirmation, setShowConfirmation] = useState(false);

  const { columns } = useColumns({
    handleActionClick(employee, action) {
      setAction(action);
      setEmployeeToPerformActionOn(employee);
      setShowConfirmation(true);
    },
  });

  const { mutate: blockEmployee, isLoading: blockingEmployee } =
    useBlockEmployee(employeeToPerformActionOn?.id, {
      onSuccess,
    });

  const { mutate: unblockEmployee, isLoading: unblockingEmployee } =
    useUnblockEmployee(employeeToPerformActionOn?.id, {
      onSuccess,
    });

  const { mutate: deleteEmployee, isLoading: deletingEmployee } =
    useDeleteEmployee(employeeToPerformActionOn?.id, {
      onSuccess,
    });

  const {
    isLoading,
    isError,
    data: res,
    isRefetching,
  } = useGetAllEmployees({
    page: pagination.pageIndex,
    size: pagination.pageSize,
    departmentId: filters?.['department']?.['value'],
  });

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [filters, columnFilters]);

  useEffect(() => {
    if (!!res) setData(res);
  }, [res]);

  const [data, setData] = useState<PaginatedResponse<IEmployee> | undefined>(
    res
  );

  function onSuccess() {
    queryClient.invalidateQueries(['employees']);
    setShowConfirmation(false);
  }

  return (
    <>
      <Confirmation
        show={showConfirmation && !!employeeToPerformActionOn && !!action}
        title={<span className={'capitalize'}>{action} Employee</span>}
        subTitle={
          <span>
            Are you sure you want to {action}{' '}
            {employeeToPerformActionOn?.firstName}{' '}
            {employeeToPerformActionOn?.lastName}?
          </span>
        }
        processingMessage={
          action === 'block'
            ? 'Blocking'
            : action === 'unblock'
            ? 'Unblocking'
            : 'Deleting'
        }
        positive={() => {
          const id = employeeToPerformActionOn?.id;

          if (action === 'unblock') {
            unblockEmployee(id);
          } else if (action === 'block') {
            blockEmployee(id);
          } else if (action === 'delete') {
            deleteEmployee(id);
          }
        }}
        processing={deletingEmployee || blockingEmployee || unblockingEmployee}
        negative={() => {
          setShowConfirmation(false);
        }}
      />

      <Table<IEmployee>
        title='employees'
        headerSlot={slot}
        dontScrollToTopOnPageChange
        onRowClick={(employee) => {
          onRowClick(employee);
        }}
        returnOriginalOnRowClick
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
    </>
  );
};
