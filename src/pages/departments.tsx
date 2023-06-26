import { SearchInput } from 'components/form-elements/SearchInput';
import { AppLayout } from 'components/layouts/AppLayout';
import { CreateDepartment } from 'components/modules/employees/CreateDepartment';
import { PlusCircle } from 'components/svgs/others/Plus';
import { AllDepartmentsTable } from 'components/tables/departments/AllDepartmentsTable';
import { useDebouncer } from 'hooks/common/useDebouncer';
import { useState } from 'react';

export type SubAccountModalsType = 'department' | null;

export default function Departments() {
  const [search, setSearch] = useState('');

  const [debouncedSearch] = useDebouncer({
    value: search,
  });

  const [modal, setModal] = useState<SubAccountModalsType>(null);

  return (
    <AppLayout title='Departments'>
      <div className='my-5 justify-between gap-2 640:my-7 690:flex'>
        <SearchInput
          placeholder='Search departments'
          value={search}
          className='mt-3 w-full 690:mt-0 690:w-[300px]'
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          clear={() => setSearch('')}
        />

        <div className='x-center mt-3 w-full 360:mt-0 360:w-1/2 690:w-fit'>
          <button
            onClick={() => {
              setModal('department');
            }}
            className='dark-button x-center h-11 w-full px-2 text-sm 640:px-4'
          >
            <span className={'my-auto mr-2'}>Add Department</span>
            <span className={'my-auto'}>
              <PlusCircle />
            </span>
          </button>
        </div>
      </div>

      <CreateDepartment
        showModal={modal === 'department'}
        closeModal={() => {
          setModal(null);
        }}
      />

      <AllDepartmentsTable
        {...{
          search: debouncedSearch,
        }}
      />
    </AppLayout>
  );
}
