import { SearchInput } from 'components/form-elements/SearchInput';
import { AppLayout } from 'components/layouts/AppLayout';
import { ManageEmployee } from 'components/modules/employees/ManageEmployee';
import { SimplePlus } from 'components/svgs/others/Plus';
import { AllEmployeesTable } from 'components/tables/employees/AllEmployeesTable';
import { useDebouncer } from 'hooks/common/useDebouncer';
import { useManageEmployee } from 'hooks/employees/useManageEmployee';
import { useState } from 'react';

export type EmployeeModalType = 'department' | 'employee' | null;

export default function Employees() {
  const [search, setSearch] = useState('');

  const [debouncedSearch] = useDebouncer({
    value: search,
  });

  const { currentEmployee, setCurrentEmployee, setModal, ...rest } =
    useManageEmployee();

  return (
    <AppLayout title='Employees' childrenClassName={'mb-7'}>
      <div className='sticky top-16 left-0 z-[800] mb-5 justify-between gap-2 border-b border-neutral-200 bg-white bg-opacity-80 px-3 py-5 backdrop-blur-md 640:mb-7 640:px-8 1024:top-20 1180:flex'>
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

      <ManageEmployee
        {...rest}
        {...{
          setCurrentEmployee,
          setModal,
          currentEmployee,
        }}
      />

      <div className={'px-3 640:px-8'}>
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
      </div>
    </AppLayout>
  );
}
