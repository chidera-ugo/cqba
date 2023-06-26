import { SearchInput } from 'components/form-elements/SearchInput';
import { UpdateSubAccountForm } from 'components/forms/sub-accounts/UpdateSubAccountForm';
import { AppLayout } from 'components/layouts/AppLayout';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { CreateDepartment } from 'components/modules/employees/CreateDepartment';
import { CreateEmployee } from 'components/modules/employees/CreateEmployee';
import { PlusCircle } from 'components/svgs/others/Plus';
import { AllSubAccountsTable } from 'components/tables/sub-accounts/AllSubAccountsTable';
import { ISubAccount } from 'hooks/api/sub-accounts/useGetAllSubAccounts';
import { useDebouncer } from 'hooks/common/useDebouncer';
import { useState } from 'react';
import { Filter } from 'components/form-elements/Filter';

const filterOptions = [
  { name: 'All Accounts', value: '' },
  { name: 'On Hold', value: 'on-hold' },
  { name: 'Archived', value: 'archived' },
  { name: 'Active', value: 'active' },
];

export type SubAccountModalsType = 'create' | 'department' | 'employee' | null;

export default function SubAccounts() {
  const [filters, setFilters] = useState<Record<string, any>>({
    accountStatus: filterOptions[0],
  });

  const [search, setSearch] = useState('');

  const [accountToEdit, setAccountToEdit] = useState<ISubAccount | null>(null);

  const [debouncedSearch] = useDebouncer({
    value: search,
  });

  const [modal, setModal] = useState<SubAccountModalsType>(null);

  function closeModal() {
    setModal(null);
    setAccountToEdit(null);
  }

  return (
    <AppLayout title='Sub Accounts'>
      <div className='my-5 justify-between gap-2 640:my-7 690:flex'>
        <div className='gap-2 360:flex'>
          <div className='flex w-full gap-2 360:w-1/2 690:w-fit'>
            <Filter
              withChevron
              filterKey='accountStatus'
              id='sub-accounts-table-filter'
              {...{ filters, setFilters }}
              className='w-full 690:w-auto'
              dropdownClassName='left-0 min-w-[180px]'
              options={filterOptions}
            />
          </div>

          <div className='x-center mt-3 w-full 360:mt-0 360:w-1/2 690:w-fit'>
            <button
              onClick={() => {
                setModal('create');
              }}
              className='dark-button x-center h-11 w-full px-2 text-sm 640:px-4'
            >
              <span className={'my-auto mr-2'}>Add Sub Account</span>
              <span className={'my-auto'}>
                <PlusCircle />
              </span>
            </button>
          </div>
        </div>

        <SearchInput
          placeholder='Search sub accounts'
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
          setModal('create');
        }}
      />

      <CreateEmployee
        {...{
          setModal,
          modal,
        }}
        hideCreateDepartmentButton
        closeModal={() => {
          setModal('create');
        }}
      />

      <RightModalWrapper
        show={modal === 'create'}
        title={`${accountToEdit ? 'Update' : 'Create'} Sub Account`}
        closeModal={closeModal}
        closeOnClickOutside
        childrenClassname='py-0 640:px-8 px-4'
      >
        <UpdateSubAccountForm
          onSuccess={closeModal}
          currentSubAccount={accountToEdit}
          addDepartment={() => setModal('department')}
          addEmployee={() => setModal('employee')}
        />
      </RightModalWrapper>

      <AllSubAccountsTable
        {...{
          filters,
          setFilters,
          search: debouncedSearch,
        }}
        onClickEditAccount={(account) => {
          setAccountToEdit(account);
          setModal('create');
        }}
      />
    </AppLayout>
  );
}
