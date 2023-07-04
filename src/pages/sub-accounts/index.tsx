import clsx from 'clsx';
import { SearchInput } from 'components/form-elements/SearchInput';
import { AppLayout } from 'components/layouts/AppLayout';
import { ManageSubAccount } from 'components/modules/sub-accounts/ManageSubAccount';
import { PlusCircle } from 'components/svgs/others/Plus';
import { SubAccountsDepartmentTable } from 'components/tables/sub-accounts/SubAccountsDepartmentTable';
import { AllSubAccountsTable } from 'components/tables/sub-accounts/AllSubAccountsTable';
import { useDebouncer } from 'hooks/common/useDebouncer';
import { useQueryParamManagedState } from 'hooks/dashboard/useQueryParamManagedState';
import { useManageSubAccount } from 'hooks/sub-accounts/useManageSubAccount';
import Link from 'next/link';
import { useState } from 'react';
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

  const [filters, setFilters] = useState<Record<string, any>>({
    accountStatus: accountTypeFilters[0],
  });

  const [search, setSearch] = useState('');

  const [debouncedSearch] = useDebouncer({
    value: search,
  });

  const { currentTab } = useQueryParamManagedState(
    tableTypeFilters,
    '/sub-accounts'
  );

  const { setAccountToEdit, setModal, ...rest } = useManageSubAccount();

  return (
    <AppLayout title='Sub Accounts'>
      <div className='my-5 block justify-between gap-2 640:my-7 768:flex'>
        <div className='flex gap-5'>
          <div className='hidden gap-5 1280:flex'>
            {tableTypeFilters.map((item) => {
              const { name, value } = item;
              const isActive = value === currentTab?.value;

              return (
                <Link
                  key={name}
                  href={`/sub-accounts?_t=${value}`}
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
                </Link>
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

          {currentTab?.value === 'accounts' && (
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
          )}
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

      <ManageSubAccount
        {...{
          setModal,
          setAccountToEdit,
        }}
        {...rest}
      />

      {currentTab?.value === 'accounts' ? (
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
        <SubAccountsDepartmentTable
          {...{
            search: debouncedSearch,
          }}
        />
      )}
    </AppLayout>
  );
}
