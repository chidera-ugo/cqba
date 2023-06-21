import { Filter } from 'components/form-elements/Filter';
import { SearchInput } from 'components/form-elements/SearchInput';
import { AddEmployeeForm } from 'components/forms/employess/AddEmployeeForm';
import { AppLayout } from 'components/layouts/AppLayout';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { PlusCircle } from 'components/svgs/others/Plus';
import { AllEmployeesTable } from 'components/tables/employees/AllEmployeesTable';
import { useQueryValidator } from 'hooks/common/useQueryValidator';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Employees() {
  const [filters, setFilters] = useState<Record<string, any>>({});

  const { getValidQuery } = useQueryValidator();

  const { replace } = useRouter();

  const showModal = getValidQuery('_m') === 'true';

  function closeModal() {
    replace('/employees');
  }

  return (
    <AppLayout title='Employees'>
      <div className='my-5 justify-between gap-2 640:my-7 880:flex'>
        <div className='gap-2 480:flex'>
          <div className='flex gap-2'>
            <Filter
              id='department-filter'
              title='Department'
              {...{
                filters,
                setFilters,
              }}
              withChevron
              className='w-full 480:w-auto'
              dropdownClassName='left-0'
              options={['Engineering', 'Finance']}
            />
          </div>

          <SearchInput
            placeholder='Search employees'
            className='mt-3 w-full 640:w-[300px] 880:mt-0'
          />
        </div>

        <Link
          href={'/employees?_m=true'}
          className='dark-button x-center h-10 px-4 text-sm'
        >
          <span className={'my-auto mr-2'}>Add Employee</span>
          <span className={'my-auto'}>
            <PlusCircle />
          </span>
        </Link>
      </div>

      <RightModalWrapper
        show={showModal}
        title='Add Employee'
        closeModal={closeModal}
        closeOnClickOutside
        childrenClassname='py-0 640:px-8 px-4'
      >
        <AddEmployeeForm onSuccess={closeModal} />
      </RightModalWrapper>

      <AllEmployeesTable {...{ filters, setFilters }} />
    </AppLayout>
  );
}
