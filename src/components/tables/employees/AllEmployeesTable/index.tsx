import { useQueryClient } from '@tanstack/react-query';
import { SimpleToast } from 'components/common/SimpleToast';
import { Confirmation } from 'components/modals/Confirmation';
import { Spinner } from 'components/svgs/dashboard/Spinner';
import { SimplePlus } from 'components/svgs/others/Plus';
import { EmployeeAction } from 'components/tables/employees/AllEmployeesTable/EmployeeActions';
import { useBlockEmployee } from 'hooks/api/employees/useBlockEmployee';
import { useDeleteEmployee } from 'hooks/api/employees/useDeleteEmployee';
import {
  IEmployee,
  useGetAllEmployees,
} from 'hooks/api/employees/useGetAllEmployees';
import { useUnblockEmployee } from 'hooks/api/employees/useUnblockEmployee';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from '@tanstack/react-table';
import { PaginatedResponse } from 'types/Table';
import { useColumns } from './useColumns';
import { Table } from 'components/core/Table';
import employees from '/public/mockups/employees.png';

interface Props {
  reset?: () => void;
  search?: string;
  filters?: Record<string, any>;
  setFilters?: Dispatch<SetStateAction<Record<string, string>>>;
  slot?: JSX.Element;
  currentEmployee: IEmployee | null;
  onRowClick: Dispatch<SetStateAction<IEmployee | null>>;
  createEmployee?: () => void;
}

export const AllEmployeesTable = ({
  slot,
  reset,
  filters,
  setFilters,
  onRowClick,
  createEmployee,
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

  if (data?.empty)
    return (
      <div className='relative min-h-[480px] grid-cols-10 overflow-hidden rounded-2xl bg-neutral-100 640:grid'>
        <SimpleToast
          show={isLoading || isRefetching}
          className='left-0 top-32 1180:left-[122px]'
        >
          <div className='flex py-2'>
            <Spinner className='my-auto mr-1 h-4 text-white' />
            <span className='my-auto'>Fetching</span>
          </div>
        </SimpleToast>

        <div className='col-span-6 my-auto h-full p-7 640:p-12 1280:col-span-5'>
          <div className='y-center h-full'>
            <h4 className='text-2xl 640:text-4xl'>Invite Employee</h4>

            <p className='mt-4 font-light leading-6 text-neutral-600'>
              Building a strong team is essential for business success. Invite
              new employees to collaborate and manage your finances effectively
            </p>

            <div className='flex'>
              <button
                onClick={createEmployee}
                className='dark-button x-center mt-4 flex h-11 w-full rounded-full px-4 480:w-auto'
              >
                <span className='my-auto mr-2'>Add Employee</span>
                <span className='my-auto'>
                  <SimplePlus />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className='relative col-span-4 640:pt-12 1280:col-span-5'>
          <div className='x-center bottom-0 -right-24 w-full 640:absolute 1280:right-0'>
            <Image
              src={employees}
              alt='card-mockup'
              className='mx-auto -mb-20 mt-auto min-w-[500px] max-w-[500px]'
            />
          </div>
        </div>
      </div>
    );

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
