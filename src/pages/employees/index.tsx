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
import { employeesFilterOptions } from 'constants/employees/filters';
import { useUrlManagedState } from 'hooks/client_api/hooks/useUrlManagedState';
import { useDebouncer } from 'hooks/commons/useDebouncer';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useManageEmployee } from 'hooks/employees/useManageEmployee';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { employeesFiltersSchema } from 'zod_schemas/employees';

// Todo: Disable button clicks for unverified users

export default function Employees() {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState('');

  const [debouncedSearch] = useDebouncer({
    value: search,
  });

  const { isVerified } = useIsVerified();

  const [showSearchBar, setShowSearchBar] = useState(false);

  const { filters, setFilters } = useUrlManagedState(
    employeesFiltersSchema,
    searchParams
  );

  const { currentEmployee, setCurrentEmployee, setModal, ...rest } =
    useManageEmployee();

  function close() {
    setModal(null);
    setCurrentEmployee(null);
    setFilters((prev) => ({ ...prev, employeeId: '' }));
  }

  return (
    <AppLayout title='Employees' childrenClassName={'mb-7'}>
      <div className='sticky top-14 left-0 z-[800] h-10 justify-between gap-2 bg-white bg-opacity-80 px-3 backdrop-blur-md 640:flex 640:h-20 640:px-8 1024:top-20'>
        <div className='x-between my-auto h-10 w-full gap-5'>
          <WideTabs
            className={clsx(
              'w-fit',
              showSearchBar ? 'hidden 640:block' : 'block'
            )}
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
            wrapperClassname={clsx(showSearchBar && 'w-full 640:w-auto')}
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

        <div className='x-center my-auto mt-4 w-full flex-shrink-0 640:mt-auto 640:mb-auto 640:w-fit'>
          <button
            onClick={() => {
              if (!isVerified) return;

              setModal('add_employee');
            }}
            className='primary-button x-center w-full px-2 text-sm 640:px-4'
          >
            <span className={'my-auto mr-2'}>Add Employee</span>
            <span className={'my-auto'}>
              <SimplePlus />
            </span>
          </button>
        </div>
      </div>

      <ManageEmployee
        {...rest}
        {...{
          setCurrentEmployee,
          setModal,
          currentEmployee,
        }}
      />

      <RightModalWrapper
        show={!!filters.employeeId}
        closeModal={close}
        title={'Employee Details'}
        closeOnClickOutside
      >
        <AppErrorBoundary>
          <EmployeeDetails
            changeRole={(employee) => {
              setCurrentEmployee(employee); // There's no current employee at this point which the manage employee needs to show the form
              setModal('edit_employee');
            }}
            close={close}
            id={filters?.employeeId}
          />
        </AppErrorBoundary>
      </RightModalWrapper>

      <div className={'px-3 640:px-8'}>
        <AllEmployeesTable
          {...{
            search: debouncedSearch,
            onRowClick(employee, action) {
              if (action === 'view_employee') {
                setFilters((prev) => ({
                  ...prev,
                  employeeId: employee.id,
                }));
              } else {
                setCurrentEmployee(employee);
                setModal('edit_employee');
              }
            },
            currentEmployee,
          }}
          status={filters?.status?.value}
        />
      </div>
    </AppLayout>
  );
}
