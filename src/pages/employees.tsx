import { Filter } from 'components/form-elements/Filter';
import { SearchInput } from 'components/form-elements/SearchInput';
import { AppLayout } from 'components/layouts/AppLayout';
import { CreateDepartment } from 'components/modules/employees/CreateDepartment';
import { CreateEmployee } from 'components/modules/employees/CreateEmployee';
import { Spinner } from 'components/svgs/dashboard/Spinner';
import { PlusCircle } from 'components/svgs/others/Plus';
import { AllEmployeesTable } from 'components/tables/employees/AllEmployeesTable';
import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { useGetDepartments } from 'hooks/api/employees/useGetDepartments';
import { useDebouncer } from 'hooks/common/useDebouncer';
import { useState } from 'react';

export type EmployeeModalType = 'department' | 'employee' | null;

export default function Employees() {
  const [filters, setFilters] = useState<Record<string, any>>({
    department: { name: 'All Departments', value: '' },
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

  const { isLoading, data } = useGetDepartments();

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
        <div className='gap-2 360:flex'>
          {!!data?.content?.length && (
            <div className='flex w-full gap-2 360:w-1/2 690:w-fit'>
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

          <div className='x-center mt-3 w-full 360:mt-0 360:w-1/2 690:w-fit'>
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

        <SearchInput
          placeholder='Search employees'
          value={search}
          className='mt-3 w-full 690:mt-0 690:w-[300px]'
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          clear={() => setSearch('')}
        />
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
