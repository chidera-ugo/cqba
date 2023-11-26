import clsx from 'clsx';
import { SearchInput } from 'components/form-elements/SearchInput';
// import { CreateBudgetForm } from 'components/forms/budgeting/CreateBudgetForm';
import { AppLayout } from 'components/layouts/AppLayout';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { AllBudgets, ViewMode } from 'components/modules/budgeting/AllBudgets';
import { CreateCategory } from 'components/modules/categories/CreateCategory';
import { CreateDepartment } from 'components/modules/employees/CreateDepartment';
import { SimplePlus } from 'components/svgs/others/Plus';
import { Squares } from 'components/svgs/others/Squares';
import { TableIcon } from 'components/svgs/others/Table';
import { BudgetStatus } from 'enums/Budget';
import { useDebouncer } from 'hooks/common/useDebouncer';
import { useQueryParamManagedState } from 'hooks/dashboard/useQueryParamManagedState';
import { getFromLocalStore, saveToLocalStore } from 'lib/localStore';
import Link from 'next/link';
import { useState } from 'react';

export default function Budgeting() {
  const statusFilters: { name: string; value: BudgetStatus }[] = [
    { name: 'Pending', value: 'open' },
    { name: 'Approved', value: 'approved' },
    { name: 'Rejected', value: 'declined' },
  ];

  const preferences = getFromLocalStore('preferences');

  const [search, setSearch] = useState('');

  const [debouncedSearch] = useDebouncer({
    value: search,
  });

  const [modal, setModal] = useState<
    'budget' | 'department' | 'category' | null
  >(null);

  const [viewMode, setViewMode] = useState<ViewMode>(
    preferences?.budgetingViewMode
  );

  const { currentTab } = useQueryParamManagedState(statusFilters, '/budgeting');

  function closeModal() {
    setModal(null);
  }

  function createBudget() {
    setModal('budget');
  }

  return (
    <AppLayout title='Budgeting' childrenClassName={'mb-7'}>
      <div className='sticky top-16 left-0 z-[800] mb-5 justify-between gap-2 border-b border-neutral-200 bg-white bg-opacity-80 px-3 py-5 backdrop-blur-md 640:mb-7 640:px-8 1024:top-20 1180:flex'>
        <div className='flex gap-5'>
          {statusFilters.map((item) => {
            const { name, value } = item;
            const isActive = value === currentTab?.value;

            return (
              <Link
                key={name}
                href={`/budgeting?_t=${value}`}
                className={clsx(
                  'relative mb-auto text-sm font-medium capitalize',
                  isActive && 'text-primary-main'
                )}
              >
                <span>{name}</span>

                {isActive && (
                  <div className='x-center bottom-0 left-0 mt-2 hidden w-full 1180:flex'>
                    <div className='h-1.5 w-1.5 rounded-full bg-primary-main'></div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        <div className='my-auto mt-5 gap-2 640:flex 1180:mt-0'>
          <SearchInput
            placeholder='Search budgets'
            value={search}
            className='w-full 640:w-[300px]'
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            clear={() => setSearch('')}
          />

          <div className='mt-4 flex gap-2 640:mt-0'>
            <button
              onClick={() => {
                const val = viewMode === 'cards' ? 'table' : 'cards';
                saveToLocalStore('preferences', { budgetingViewMode: val });
                setViewMode(val);
              }}
              className='secondary-button h-11 px-5'
            >
              {viewMode === 'cards' ? <Squares /> : <TableIcon />}
            </button>

            <button
              onClick={createBudget}
              className='dark-button x-center flex h-11 w-full rounded-full px-4 480:w-auto'
            >
              <span className='my-auto mr-2'>Create budget</span>
              <span className='my-auto'>
                <SimplePlus />
              </span>
            </button>
          </div>
        </div>
      </div>

      <CreateDepartment
        showModal={modal === 'department'}
        closeModal={() => {
          setModal('budget');
        }}
      />

      <CreateCategory
        showModal={modal === 'category'}
        closeModal={() => {
          setModal('budget');
        }}
      />

      <RightModalWrapper
        show={modal === 'budget'}
        title='Create Budget'
        closeModal={closeModal}
        closeOnClickOutside
        childrenClassname='py-0 640:px-8 px-4'
      >
        {/*<CreateBudgetForm close={closeModal} />*/}
      </RightModalWrapper>

      <div className={'px-3 640:px-8'}>
        <AllBudgets
          status={currentTab?.value}
          search={debouncedSearch}
          {...{ viewMode, currentTab, createBudget }}
        />
      </div>
    </AppLayout>
  );
}
