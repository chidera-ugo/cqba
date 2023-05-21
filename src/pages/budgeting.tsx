import clsx from 'clsx';
import { SearchInput } from 'components/form-elements/SearchInput';
import { CreateBudgetForm } from 'components/forms/budgeting/CreateBudgetForm';
import { AppLayout } from 'components/layouts/AppLayout';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { AllBudgets, ViewMode } from 'components/modules/budgeting/AllBudgets';
import { PlusCircle } from 'components/svgs/others/Plus';
import { Squares } from 'components/svgs/others/Squares';
import { TableIcon } from 'components/svgs/others/Table';
import { getFromLocalStore, saveToLocalStore } from 'lib/localStore';
import { useState } from 'react';

const filterOptions = [
  { name: 'Pending', count: 10 },
  { name: 'Approved', count: 0 },
  { name: 'Declined', count: 0 },
];

export default function Budgeting() {
  const preferences = getFromLocalStore('preferences');

  const [filters, setFilters] = useState<Record<string, any>>({
    status: filterOptions[0]?.name,
  });
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>(
    preferences?.budgetingViewMode
  );

  function closeModal() {
    setShowModal(false);
  }

  return (
    <AppLayout title='Budgeting'>
      <div className='my-5 justify-between gap-2 640:my-7 880:flex'>
        <div className='gap-2 480:flex'>
          <div className='flex gap-2'>
            {filterOptions.map(({ name, count }) => {
              return (
                <button
                  className={clsx(
                    'h-11 border px-4 text-sm font-semibold',
                    filters['status'] === name
                      ? 'primary-button'
                      : 'secondary-button'
                  )}
                  onClick={() => {
                    setFilters({
                      status: name,
                    });
                  }}
                  key={name}
                >
                  {name}
                  {count ? ` (${count})` : null}
                </button>
              );
            })}

            <SearchInput
              placeholder='Search budgets'
              className='mt-3 w-full 640:w-[300px] 880:mt-0'
              value=''
              onChange={() => null}
            />
          </div>
        </div>

        <div className='my-auto flex gap-2'>
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
            onClick={() => setShowModal(true)}
            className='dark-button x-center mt-3 flex h-11 w-full flex-shrink-0 rounded-full px-4 480:mt-0 480:w-auto'
          >
            <span className='my-auto mr-2'>Create budget</span>
            <span className='my-auto'>
              <PlusCircle />
            </span>
          </button>
        </div>
      </div>

      <RightModalWrapper
        show={showModal}
        title='Create Budget'
        close={closeModal}
        closeOnClickOutside
        childrenClassname='py-0 640:px-8 px-4'
      >
        <CreateBudgetForm close={closeModal} />
      </RightModalWrapper>

      <AllBudgets {...{ viewMode, filters, setFilters }} />
    </AppLayout>
  );
}
