import clsx from 'clsx';
import { SearchInput } from 'components/form-elements/SearchInput';
import { AppLayout } from 'components/layouts/AppLayout';
import { ManageEmployee } from 'components/modules/employees/ManageEmployee';
import { SimplePlus } from 'components/svgs/others/Plus';
import { AllEmployeesTable } from 'components/tables/employees/AllEmployeesTable';
import { EmployeesDepartmentTable } from 'components/tables/employees/EmployeesDepartmentTable';
import { useDebouncer } from 'hooks/common/useDebouncer';
import { useQueryParamManagedState } from 'hooks/dashboard/useQueryParamManagedState';
import { useManageEmployee } from 'hooks/employees/useManageEmployee';
import Link from 'next/link';
import { useState } from 'react';

export type EmployeeModalType = 'department' | 'employee' | null;

export default function Employees() {
  const tableTypeFilters = [
    { name: 'Employees', value: 'employees' },
    { name: 'Departments', value: 'departments' },
  ];

  const [search, setSearch] = useState('');

  const [debouncedSearch] = useDebouncer({
    value: search,
  });

  const { currentTab } = useQueryParamManagedState(
    tableTypeFilters,
    '/employees'
  );

  const { currentEmployee, setCurrentEmployee, setModal, ...rest } =
    useManageEmployee();

  return (
    <AppLayout title='Employees' childrenClassName={'mb-7'}>
      <div className='sticky top-16 left-0 z-[800] mb-5 justify-between gap-2 border-b border-neutral-200 bg-white bg-opacity-80 px-3 py-5 backdrop-blur-md 640:mb-7 640:px-8 1024:top-20 1180:flex'>
        <div className='gap-5 360:flex'>
          <div className='flex gap-5'>
            {tableTypeFilters.map((item) => {
              const { name, value } = item;
              const isActive = value === currentTab?.value;

              return (
                <Link
                  key={name}
                  href={`/employees?_t=${value}`}
                  className={clsx(
                    'relative mb-auto text-sm font-medium capitalize',
                    isActive && 'text-primary-main'
                  )}
                >
                  <span>{name}</span>

                  {isActive && (
                    <div className='x-center bottom-0 left-0 mt-2 hidden w-full 690:flex'>
                      <div className='h-1.5 w-1.5 rounded-full bg-primary-main'></div>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <div className='mt-5 gap-2 640:flex 690:mt-0'>
          <SearchInput
            placeholder='Search employees'
            value={search}
            className='w-full 1180:w-[240px]'
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            clear={() => setSearch('')}
          />

          <div className='x-center mt-3 w-full flex-shrink-0 640:mt-0 640:w-fit'>
            <button
              onClick={() => {
                setModal('employee');
              }}
              className='dark-button x-center h-11 w-full px-2 text-sm 640:px-4'
            >
              <span className={'my-auto mr-2'}>Add Employee</span>
              <span className={'my-auto'}>
                <SimplePlus />
              </span>
            </button>
          </div>
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

      <div className={'px-3 640:px-8'}>
        {currentTab?.value === 'employees' ? (
          <AllEmployeesTable
            {...{
              search: debouncedSearch,
              onRowClick(employee) {
                setCurrentEmployee(employee);
                setModal('employee');
              },
              currentEmployee,
            }}
            createEmployee={() => {
              setModal('employee');
            }}
          />
        ) : (
          <EmployeesDepartmentTable
            {...{
              search: debouncedSearch,
            }}
          />
        )}
      </div>
    </AppLayout>
  );
}
