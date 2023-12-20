import { NoData } from 'components/core/Table/NoData';
import { Confirmation } from 'components/modals/Confirmation';
import { MobileEmployeesList } from 'components/modules/employees/MobileEmployeesList';
import { useAppContext } from 'context/AppContext';
import { useBlockEmployee } from 'hooks/api/employees/useBlockEmployee';
import { useDeleteEmployee } from 'hooks/api/employees/useDeleteEmployee';
import { useDeleteInvite } from 'hooks/api/employees/useDeleteInvite';
import {
  EmployeeStatus,
  IEmployee,
  useGetAllEmployees,
} from 'hooks/api/employees/useGetAllEmployees';
import { useUnblockEmployee } from 'hooks/api/employees/useUnblockEmployee';
import { useQueryInvalidator } from 'hooks/app/useQueryInvalidator';
import { TPagination } from 'hooks/client_api/hooks/useUrlManagedState';
import { EmployeeModalType } from 'hooks/employees/useManageEmployee';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { EmployeeAction, useColumns } from './useColumns';
import { Table } from 'components/core/Table';
import clock from '/public/mockups/clock.jpg';

interface Props {
  reset?: () => void;
  filters?: Record<string, any>;
  setFilters?: Dispatch<SetStateAction<Record<string, string>>>;
  slot?: JSX.Element;
  onRowClick: (employee: IEmployee, action: EmployeeModalType) => void;
  status?: EmployeeStatus;
  setEmployeeToPerformActionOn: Dispatch<SetStateAction<IEmployee | null>>;
  employeeToPerformActionOn: IEmployee | null;
  setShowActionConfirmation: Dispatch<SetStateAction<boolean>>;
  showActionConfirmation: boolean;
  setAction: Dispatch<SetStateAction<EmployeeAction>>;
  action: EmployeeAction;
  setCurrentEmployee: Dispatch<SetStateAction<IEmployee | null>>;
  onClose: () => void;
}

export const AllEmployeesTable = ({
  slot,
  action,
  setAction,
  reset,
  filters,
  setFilters,
  showActionConfirmation,
  setCurrentEmployee,
  setShowActionConfirmation,
  status = 'active',
  onRowClick,
  pagination,
  onClose,
  employeeToPerformActionOn,
  setEmployeeToPerformActionOn,
  setPagination,
}: Props & TPagination) => {
  const { invalidate } = useQueryInvalidator();

  const { screenSize } = useAppContext().state;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [currentSearchColumn, setCurrentSearchColumn] = useState('');

  const { columns } = useColumns({
    handleActionClick(employee, action) {
      setAction(action);
      setShowActionConfirmation(true);
      setEmployeeToPerformActionOn(employee);
    },
  });

  const { mutate: blockEmployee, isLoading: blockingEmployee } =
    useBlockEmployee(employeeToPerformActionOn?._id, {
      onSuccess,
    });

  const { mutate: unblockEmployee, isLoading: unblockingEmployee } =
    useUnblockEmployee(employeeToPerformActionOn?._id, {
      onSuccess,
    });

  const { mutate: deleteEmployee, isLoading: deletingEmployee } =
    useDeleteEmployee(employeeToPerformActionOn?._id, {
      onSuccess() {
        onSuccess();
        setCurrentEmployee(null);
      },
    });

  const { isLoading: deletingInvite, mutate: deleteInvite } = useDeleteInvite(
    employeeToPerformActionOn?._id,
    {
      onSuccess() {
        onSuccess();
        setCurrentEmployee(null);
      },
    }
  );

  const { isLoading, isError, data, isRefetching } = useGetAllEmployees({
    status,
    page: pagination.pageIndex + 1,
    size: pagination.pageSize,
  });

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [filters, columnFilters]);

  function onSuccess() {
    invalidate('team');
    setShowActionConfirmation(false);
  }

  const isActive = employeeToPerformActionOn?.status === 'active';

  const identifier = employeeToPerformActionOn?.firstName
    ? `${employeeToPerformActionOn?.firstName} ${employeeToPerformActionOn?.lastName}`
    : employeeToPerformActionOn?.email;

  return (
    <>
      <Confirmation
        type={'right'}
        show={showActionConfirmation && !!employeeToPerformActionOn && !!action}
        title={isActive ? 'Remove User' : 'Delete Invite'}
        subTitle={`This means ${identifier} will no longer be able to ${
          isActive ? 'access your dashboard' : 'join your organization'
        }`}
        positive={() => {
          const id = employeeToPerformActionOn?._id;

          if (action === 'delete_invite') {
            deleteInvite(null);
          } else if (action === 'unblock') {
            unblockEmployee(id);
          } else if (action === 'block') {
            blockEmployee(id);
          } else if (action === 'remove_user') {
            deleteEmployee(id);
          }
        }}
        buttonTexts={[isActive ? 'Remove User' : 'Delete Invite']}
        processing={
          deletingInvite ||
          deletingEmployee ||
          blockingEmployee ||
          unblockingEmployee
        }
        negative={() => {
          setShowActionConfirmation(false);
          onClose();
        }}
      />

      {data && !data.docs.length ? (
        <NoData
          processing={isLoading || isRefetching}
          imageSrc={clock}
          title={status === 'active' ? 'Invite People' : 'No pending invites'}
          subTitle={
            status === 'active'
              ? `Building a strong team is essential for business success. Invite new people to collaborate and manage your finances effectively`
              : `You do not have any pending invites yet, there is no data to be displayed.`
          }
        />
      ) : (
        <>
          {screenSize?.['mobile'] ? (
            <MobileEmployeesList
              {...{
                isLoading,
                isError,
                isRefetching,
                data,
                setPagination,
                pagination,
                onRowClick,
              }}
            />
          ) : (
            <Table<IEmployee>
              className={'mt-20 640:mt-4'}
              title='users'
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
              noDataConfig={{ title: 'You have not added any users yet.' }}
            />
          )}
        </>
      )}
    </>
  );
};
