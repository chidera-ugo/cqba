import clsx from 'clsx';
import { WideTabs } from 'components/commons/WideTabs';
import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { SearchInput } from 'components/form-elements/SearchInput';
import { AppLayout } from 'components/layouts/AppLayout';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { ManageEmployee } from 'components/modules/employees/ManageEmployee';
import { EmployeeDetails } from 'components/modules/employees/EmployeeDetails';
import { SimplePlus } from 'components/svgs/others/Plus';
import { AllEmployeesTable } from 'components/tables/employees/AllEmployeesTable';
import { EmployeeAction } from 'components/tables/employees/AllEmployeesTable/useColumns';
import { employeesFilterOptions } from 'constants/employees/filters';
import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { useUrlManagedState } from 'hooks/client_api/hooks/useUrlManagedState';
import { useDebouncer } from 'hooks/commons/useDebouncer';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import {
  EmployeeModalType,
  useManageEmployee,
} from 'hooks/employees/useManageEmployee';
import { useState } from 'react';
import { employeesFiltersSchema } from 'zod_schemas/employees_schema';

export default function Employees() {
  const [search, setSearch] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [debouncedSearch] = useDebouncer({
    value: search,
  });
  const [action, setAction] = useState<EmployeeAction>(null);
  const [showActionConfirmation, setShowActionConfirmation] = useState(false);
  const [employeeToPerformActionOn, setEmployeeToPerformActionOn] =
    useState<IEmployee | null>(null);
  const [
    shouldRestoreEmployeeDetailsModal,
    setShouldRestoreEmployeeDetailsModal,
  ] = useState(false);

  const { filters, setFilters, pagination, setPagination } = useUrlManagedState(
    employeesFiltersSchema
  );

  const { isVerified } = useIsVerified();

  const { currentEmployee, setCurrentEmployee, setModal, ...rest } =
    useManageEmployee(restoreEmployeeDetailsModal);

  function close() {
    setModal(null);
    setCurrentEmployee(null);
    setEmployeeToPerformActionOn(null);
    setFilters((prev) => ({ ...prev, employeeId: '' }));
  }

  function onRowClick(employee: IEmployee, action: EmployeeModalType) {
    if (action === 'view_employee') {
      setFilters((prev) => ({
        ...prev,
        employeeId: employee._id,
      }));
    } else {
      setModal(action);
    }

    setCurrentEmployee(employee);
    setShouldRestoreEmployeeDetailsModal(false);
  }

  function hideEmployeeDetailsModal() {
    setFilters(({ employeeId: _, ...prev }) => ({
      ...prev!,
    }));
  }

  function restoreEmployeeDetailsModal() {
    if (!shouldRestoreEmployeeDetailsModal) return;

    setFilters((prev) => ({ ...prev, employeeId: currentEmployee?._id }));
    setShouldRestoreEmployeeDetailsModal(false);
  }

  return (
    <AppLayout title='People' childrenClassName={'mb-7'}>
      <div className='sticky top-14 left-0 z-[800] flex h-14 justify-between gap-2 border-b border-neutral-310 bg-white bg-opacity-80 px-3 backdrop-blur-md 640:h-20 640:border-b-0 640:px-8 1024:top-20'>
        <div className='x-between my-auto mb-0 h-10 w-full gap-5 640:mb-auto'>
          <WideTabs
            className={clsx(
              'w-fit',
              showSearchBar ? 'hidden 640:block' : 'block'
            )}
            tabClassname={'mt-1 640:mt-0'}
            layoutId={'invite_status'}
            action={(tab) => {
              setFilters((prev) => ({ ...prev, status: tab }));
            }}
            currentTab={filters?.status?.value}
            tabs={employeesFilterOptions}
          />

          <SearchInput
            placeholder='Search employees'
            value={search}
            id={'search_employees'}
            wrapperClassname={clsx(
              '960:block hidden',
              showSearchBar && 'w-full 640:w-auto'
            )}
            className={clsx(
              'h-10 pr-0 640:w-full 640:pr-3.5 768:w-[240px]',
              showSearchBar ? 'w-full border' : 'w-[40px] border-0 640:border'
            )}
            onBlur={() => setShowSearchBar(false)}
            onClickSearch={() => {
              setShowSearchBar(true);
              document.getElementById('search_employees')?.focus();
            }}
            onChange={(e) => setSearch(e.target.value)}
            clear={() => setSearch('')}
          />
        </div>

        <div className='x-center my-auto mt-4 w-fit flex-shrink-0 640:mt-auto 640:mb-auto'>
          <button
            onClick={() => {
              if (!isVerified) return;
              setModal('add_employee');
            }}
            className='primary-button x-center my-auto h-8 gap-1 px-3 text-sm 640:h-10 640:w-full 640:gap-2 640:px-4'
          >
            <span className={'my-auto'}>
              <SimplePlus />
            </span>

            <span className={'my-auto'}>
              <span className={'hidden 640:block'}>Invite User</span>
              <span className={'block 640:hidden'}>Add</span>
            </span>
          </button>
        </div>
      </div>

      <ManageEmployee
        {...rest}
        onSuccess={() => {
          if (!currentEmployee && filters.status.value !== 'invited') {
            setFilters((prev) => ({
              ...prev,
              status: employeesFilterOptions.find(
                ({ value }) => value === 'invited'
              ),
            }));
          }
        }}
        {...{
          setCurrentEmployee,
          setModal,
          currentEmployee,
        }}
      />

      <RightModalWrapper
        show={!!filters.employeeId}
        closeModal={close}
        title={'User Info'}
        closeOnClickOutside
      >
        <AppErrorBoundary>
          <EmployeeDetails
            handleAction={(action, employee) => {
              setAction(action);
              setShowActionConfirmation(true);
              setEmployeeToPerformActionOn(employee);
              setShouldRestoreEmployeeDetailsModal(true);
              hideEmployeeDetailsModal();
            }}
            close={close}
            id={filters?.employeeId}
          />
        </AppErrorBoundary>
      </RightModalWrapper>

      <div className={'px-3 640:px-8'}>
        <AllEmployeesTable
          {...{
            action,
            setAction,
            setShowActionConfirmation,
            showActionConfirmation,
            employeeToPerformActionOn,
            setEmployeeToPerformActionOn,
            pagination,
            setPagination,
            search: debouncedSearch,
            onRowClick,
            setCurrentEmployee,
          }}
          onClose={restoreEmployeeDetailsModal}
          status={filters?.status?.value}
        />
      </div>
    </AppLayout>
  );
}
