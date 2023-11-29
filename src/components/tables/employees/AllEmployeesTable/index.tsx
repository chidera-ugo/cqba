import { useQueryClient } from '@tanstack/react-query';
import { EmptyTable } from 'components/core/Table/EmptyTable';
import { Confirmation } from 'components/modals/Confirmation';
import { EmployeeAction } from 'components/tables/employees/AllEmployeesTable/EmployeeActions';
import { useBlockEmployee } from 'hooks/api/employees/useBlockEmployee';
import { useDeleteEmployee } from 'hooks/api/employees/useDeleteEmployee';
import {
  EmployeeStatus,
  IEmployee,
  useGetAllEmployees,
} from 'hooks/api/employees/useGetAllEmployees';
import { useUnblockEmployee } from 'hooks/api/employees/useUnblockEmployee';
import { EmployeeModalType } from 'hooks/employees/useManageEmployee';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from '@tanstack/react-table';
import { PaginatedResponse } from 'types/Table';
import { useColumns } from './useColumns';
import { Table } from 'components/core/Table';
import clock from '/public/mockups/clock.jpg';

interface Props {
  reset?: () => void;
  search?: string;
  filters?: Record<string, any>;
  setFilters?: Dispatch<SetStateAction<Record<string, string>>>;
  slot?: JSX.Element;
  currentEmployee: IEmployee | null;
  onRowClick: (employee: IEmployee, action: EmployeeModalType) => void;
  status?: EmployeeStatus;
}

export const AllEmployeesTable = ({
  slot,
  reset,
  filters,
  setFilters,
  status = 'active',
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
      if (action === 'edit') {
        onRowClick(employee, 'edit_employee');
      } else {
        setAction(action);
        setShowConfirmation(true);
        setEmployeeToPerformActionOn(employee);
      }
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
    status,
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

  if (!isLoading && !data?.docs?.length)
    return (
      <EmptyTable
        processing={isLoading || isRefetching}
        imageSrc={clock}
        title={status === 'active' ? 'Invite Employee' : 'No pending invites'}
        subTitle={
          status === 'active'
            ? `Building a strong team is essential for business success. Invite new employees to collaborate and manage your finances effectively`
            : `You do not have any pending invites yet, there is no data to be displayed.`
        }
      />
    );

  return (
    <>
      <Confirmation
        type={'right'}
        show={showConfirmation && !!employeeToPerformActionOn && !!action}
        title={'Remove team member'}
        subTitle={`This means ${employeeToPerformActionOn?.firstName} ${employeeToPerformActionOn?.lastName} will no longer be able to access your dashboard`}
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
        buttonTexts={['Remove User']}
        processing={deletingEmployee || blockingEmployee || unblockingEmployee}
        negative={() => {
          setShowConfirmation(false);
        }}
      />

      <Table<IEmployee>
        className={'mt-20 640:mt-4'}
        title='employees'
        headerSlot={slot}
        dontScrollToTopOnPageChange
        onRowClick={(employee) => {
          onRowClick(employee, 'view_employee');
        }}
        returnOriginalOnRowClick
        accessor='_id'
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
