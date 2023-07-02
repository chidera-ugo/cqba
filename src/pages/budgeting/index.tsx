import clsx from 'clsx';
import { SearchInput } from 'components/form-elements/SearchInput';
import { CreateBudgetForm } from 'components/forms/budgeting/CreateBudgetForm';
import { AppLayout } from 'components/layouts/AppLayout';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { AllBudgets, ViewMode } from 'components/modules/budgeting/AllBudgets';
import { CreateCategory } from 'components/modules/categories/CreateCategory';
import { CreateDepartment } from 'components/modules/employees/CreateDepartment';
import { PlusCircle } from 'components/svgs/others/Plus';
import { Squares } from 'components/svgs/others/Squares';
import { TableIcon } from 'components/svgs/others/Table';
import { useDebouncer } from 'hooks/common/useDebouncer';
import { getFromLocalStore, saveToLocalStore } from 'lib/localStore';
import { useState } from 'react';

export default function Budgeting() {
  const statusFilters = [
    { name: 'Pending', value: 'pending' },
    { name: 'Approved', value: 'approved' },
    { name: 'Declined', count: 'declined' },
  ];

  const preferences = getFromLocalStore('preferences');

  const [filters, setFilters] = useState<Record<string, any>>({
    status: statusFilters[0],
  });

  const [formRecoveryValues, setFormRecoveryValues] = useState<Record<
    string,
    any
  > | null>(null);

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

  function closeModal() {
    setModal(null);
  }

  return (
    <AppLayout title='Budgeting'>
      <div className='my-5 justify-between gap-2 640:my-7 880:flex'>
        <div className='gap-5 480:flex'>
          {statusFilters.map((item) => {
            const { name, value } = item;
            const isActive = value === filters?.status?.value;

            return (
              <button
                key={name}
                onClick={() => {
                  setFilters((prev) => ({ ...prev, status: item }));
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

        <div className='my-auto flex gap-2'>
          <SearchInput
            placeholder='Search budgets'
            value={search}
            className='mt-3 w-full 640:w-[300px] 880:mt-0'
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            clear={() => setSearch('')}
          />

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
            onClick={() => setModal('budget')}
            className='dark-button x-center mt-3 flex h-11 w-full flex-shrink-0 rounded-full px-4 480:mt-0 480:w-auto'
          >
            <span className='my-auto mr-2'>Create budget</span>
            <span className='my-auto'>
              <PlusCircle />
            </span>
          </button>
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
        <CreateBudgetForm
          {...{ formRecoveryValues, setFormRecoveryValues }}
          createCategory={() => setModal('category')}
          close={closeModal}
          addDepartment={(values) => {
            setModal('department');
            setFormRecoveryValues(values);
          }}
        />
      </RightModalWrapper>

      <AllBudgets
        search={debouncedSearch}
        {...{ viewMode, filters, setFilters }}
      />
    </AppLayout>
  );
}
