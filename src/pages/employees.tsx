import { AlertBox } from 'components/common/AlertBox';
import { Filter } from 'components/form-elements/Filter';
import { SearchInput } from 'components/form-elements/SearchInput';
import { UpdateEmployeeForm } from 'components/forms/employess/UpdateEmployeeForm';
import { AppLayout } from 'components/layouts/AppLayout';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import {
  CreateDepartment,
  CreateDepartmentButton,
} from 'components/modules/employees/CreateDepartment';
import { Spinner } from 'components/svgs/dashboard/Spinner';
import { PlusCircle } from 'components/svgs/others/Plus';
import { AllEmployeesTable } from 'components/tables/employees/AllEmployeesTable';
import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { useGetDepartments } from 'hooks/api/employees/useGetDepartments';
import { useDebouncer } from 'hooks/common/useDebouncer';
import { useState } from 'react';

export default function Employees() {
  const [filters, setFilters] = useState<Record<string, any>>({});

  const [search, setSearch] = useState('');

  const [formRecoveryValues, setFormRecoveryValues] = useState<Record<
    string,
    any
  > | null>(null);

  const [currentEmployee, setCurrentEmployee] = useState<IEmployee | null>(
    null
  );

  const [modal, setModal] = useState<'department' | 'employee' | null>(null);

  function closeModal() {
    setCurrentEmployee(null);
    setModal(null);
    setFormRecoveryValues(null);
  }

  const { isLoading, data } = useGetDepartments();

  const [debouncedSearch] = useDebouncer({
    value: search,
  });

  return (
    <AppLayout title='Employees'>
      <div className='my-5 justify-between gap-2 640:my-7 690:flex'>
        <div className='gap-2 360:flex'>
          {!!data?.content?.length && (
            <div className='flex w-full gap-2 360:w-1/2 690:w-fit'>
              <Filter
                id='department-filter'
                title='Department'
                {...{
                  filters,
                  setFilters,
                  isLoading,
                }}
                withChevron
                className='w-full 690:w-auto'
                dropdownClassName='left-0'
                options={data.content.map(({ title, id }) => ({
                  name: title!,
                  value: id!,
                }))}
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

      <CreateDepartment
        showModal={modal === 'department'}
        closeModal={() => {
          setModal('employee');
        }}
      />

      <RightModalWrapper
        show={modal === 'employee'}
        title='Add Employee'
        closeModal={closeModal}
        closeOnClickOutside
        childrenClassname='py-0 640:px-8 px-4'
      >
        {!data?.content?.length ? (
          <>
            <AlertBox
              message={
                <span>
                  You need to create a department before you can add an employee
                </span>
              }
            />

            <div className='x-center mx-auto w-fit'>
              <CreateDepartmentButton
                onClick={() => setModal('department')}
                className={'dark-button mx-auto mt-5 h-12 w-fit text-white'}
              />
            </div>
          </>
        ) : (
          <UpdateEmployeeForm
            handleClickCreateDepartment={(values) => {
              setModal('department');
              setFormRecoveryValues(values);
            }}
            {...{
              currentEmployee,
              formRecoveryValues,
            }}
            departments={data.content}
            onSuccess={closeModal}
          />
        )}
      </RightModalWrapper>

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
