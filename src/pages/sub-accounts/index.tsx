import clsx from 'clsx';
import { SearchInput } from 'components/form-elements/SearchInput';
import { UpdateSubAccountForm } from 'components/forms/sub-accounts/UpdateSubAccountForm';
import { AppLayout } from 'components/layouts/AppLayout';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { CreateDepartment } from 'components/modules/employees/CreateDepartment';
import { CreateEmployee } from 'components/modules/employees/CreateEmployee';
import { PlusCircle } from 'components/svgs/others/Plus';
import { SubAccountsByDepartmentTable } from 'components/tables/departments/SubAccountsByDepartmentTable';
import { AllSubAccountsTable } from 'components/tables/sub-accounts/AllSubAccountsTable';
import { ISubAccount } from 'hooks/api/sub-accounts/useGetAllSubAccounts';
import { useDebouncer } from 'hooks/common/useDebouncer';
import { useQueryValidator } from 'hooks/common/useQueryValidator';
import { useEffect, useState } from 'react';
import { Filter } from 'components/form-elements/Filter';

export type SubAccountModalsType = 'create' | 'department' | 'employee' | null;

export default function SubAccounts() {
  const accountTypeFilters = [
    { name: 'All Accounts', value: '' },
    { name: 'On Hold', value: 'on-hold' },
    { name: 'Archived', value: 'archived' },
    { name: 'Active', value: 'active' },
  ];

  const tableTypeFilters = [
    { name: 'Accounts', value: 'accounts' },
    { name: 'Departments', value: 'departments' },
  ];

  const { getValidQuery, replace } = useQueryValidator();
  const currentTable = getValidQuery('_c');

  useEffect(() => {
    if (!currentTable) return;

    if (currentTable !== 'accounts' && currentTable !== 'departments') return;

    setFilters((prev) => ({ ...prev, currentTable }));

    replace('/sub-accounts');
  }, [currentTable]);

  const [filters, setFilters] = useState<Record<string, any>>({
    accountStatus: accountTypeFilters[0],
    currentTable: tableTypeFilters[0],
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
      <div className='my-5 block justify-between gap-2 640:my-7 768:flex'>
        <div className='flex gap-5'>
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

          <div className='my-auto flex w-full gap-2 360:w-1/2 690:w-fit 1280:mb-auto 1280:hidden'>
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

          <div className='my-auto block h-5 w-[1px] bg-neutral-200 1280:hidden'></div>

          <div className='my-auto flex w-full gap-2 360:w-1/2 690:w-fit 1280:mb-auto 1280:mt-0'>
            <Filter
              withChevron
              filterKey='accountStatus'
              id='sub-accounts-table-filter'
              {...{ filters, setFilters }}
              className='w-full 690:w-auto'
              dropdownClassName='right-0 640:left-0 min-w-[180px]'
              options={accountTypeFilters}
            />
          </div>
        </div>

        <div className='mt-4 gap-2 640:flex 768:mt-0'>
          <SearchInput
            placeholder='Search sub accounts'
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

      {filters.currentTable.value === 'accounts' ? (
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
      ) : (
        <SubAccountsByDepartmentTable
          {...{
            search: debouncedSearch,
          }}
        />
      )}
    </AppLayout>
  );
}
