import clsx from 'clsx';
import { Filter } from 'components/form-elements/Filter';
import { SearchInput } from 'components/form-elements/SearchInput';
import { AppLayout } from 'components/layouts/AppLayout';
import { CreateDepartment } from 'components/modules/employees/CreateDepartment';
import { CreateEmployee } from 'components/modules/employees/CreateEmployee';
import { Spinner } from 'components/svgs/dashboard/Spinner';
import { PlusCircle } from 'components/svgs/others/Plus';
import { AllEmployeesTable } from 'components/tables/employees/AllEmployeesTable';
import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { useGetAllDepartments } from 'hooks/api/departments/useGetAllDepartments';
import { useDebouncer } from 'hooks/common/useDebouncer';
import { useState } from 'react';

export type EmployeeModalType = 'department' | 'employee' | null;

export default function Employees() {
  const tableTypeFilters = [
    { name: 'Accounts', value: 'accounts' },
    { name: 'Departments', value: 'departments' },
  ];

  const [filters, setFilters] = useState<Record<string, any>>({
    department: { name: 'All Departments', value: '' },
    currentTable: tableTypeFilters[0],
  });

  const [search, setSearch] = useState('');

  const [formRecoveryValues, setFormRecoveryValues] = useState<Record<
    string,
    any
  > | null>(null);

  const [currentEmployee, setCurrentEmployee] = useState<IEmployee | null>(
    null
  );

  const [modal, setModal] = useState<EmployeeModalType>(null);

  const [debouncedSearch] = useDebouncer({
    value: search,
  });

  const { isLoading, data } = useGetAllDepartments();

  const departmentFilterOptions = !data?.content.length
    ? []
    : [
        { name: 'All Departments', value: '' },
        ...data?.content.map(({ title, id }) => ({
          name: title!,
          value: id!,
        })),
      ];

  function closeModal() {
    setCurrentEmployee(null);
    setModal(null);
    setFormRecoveryValues(null);
  }

  return (
    <AppLayout title='Employees'>
      <div className='my-5 justify-between gap-2 640:my-7 690:flex'>
        <div className='gap-5 360:flex'>
          {!!data?.content?.length && (
            <div className='mb-auto flex w-full gap-2 360:w-1/2 690:w-fit'>
              <Filter
                withChevron
                filterKey='department'
                id='employees-table-filter'
                {...{ filters, setFilters }}
                className='w-full 690:w-auto'
                dropdownClassName='left-0 min-w-[180px]'
                options={departmentFilterOptions}
              />
            </div>
          )}

          <div className='hidden gap-5 1280:flex'>
            {tableTypeFilters.map((item) => {
              const { name, value } = item;
              const isActive = value === filters.currentTable.value;

              return (
                <button
                  key={name}
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, currentTable: item }));
                  }}
                  className={clsx(
                    'relative mb-auto text-sm font-medium capitalize',
                    isActive && 'text-primary-main'
                  )}
                >
                  <span>{name}</span>

                  {isActive && (
                    <div className='x-center bottom-0 left-0 mt-2 w-full'>
                      <div className='h-1.5 w-1.5 rounded-full bg-primary-main'></div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className='my-auto flex w-full gap-2 360:w-1/2 360:w-fit 1280:mb-auto 1280:hidden'>
            <Filter
              withChevron
              filterKey='currentTable'
              id='sub-accounts-current-table-filter'
              {...{ filters, setFilters }}
              className='w-full 690:w-auto'
              dropdownClassName='left-0 min-w-[180px]'
              options={tableTypeFilters}
            />
          </div>
        </div>

        <div className='mt-4 gap-2 640:flex 768:mt-0'>
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
            {isLoading ? (
              <Spinner className={'my-auto h-6 w-6'} />
            ) : !!data ? (
              <button
                onClick={() => {
                  setModal('employee');
                }}
                className='dark-button x-center h-11 w-full px-2 text-sm 640:px-4'
              >
                <span className={'my-auto mr-2'}>Add Employee</span>
                <span className={'my-auto'}>
                  <PlusCircle />
                </span>
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <CreateEmployee
        {...{
          setModal,
          closeModal,
          setFormRecoveryValues,
          formRecoveryValues,
          currentEmployee,
          modal,
        }}
      />

      <CreateDepartment
        showModal={modal === 'department'}
        closeModal={() => {
          setModal('employee');
        }}
      />

      <AllEmployeesTable
        {...{
          filters,
          setFilters,
          search: debouncedSearch,
          onRowClick(employee) {
            setCurrentEmployee(employee);
            setModal('employee');
          },
          currentEmployee,
        }}
      />
    </AppLayout>
  );
}
