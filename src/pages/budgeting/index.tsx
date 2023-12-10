import clsx from 'clsx';
import { WideTabs } from 'components/commons/WideTabs';
import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { SearchInput } from 'components/form-elements/SearchInput';
import { AppLayout } from 'components/layouts/AppLayout';
import { ActiveBudgets } from 'components/modules/budgeting/ActiveBudgets';
import { ManageBudgetCreation } from 'components/modules/budgeting/ManageBudgetCreation';
import { PendingBudgets } from 'components/modules/budgeting/PendingBudgets';
import { SimplePlus } from 'components/svgs/others/Plus';
import { budgetingFilterOptions } from 'constants/budgeting/filters';
import { useUrlManagedState } from 'hooks/client_api/hooks/useUrlManagedState';
import { useDebouncer } from 'hooks/commons/useDebouncer';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useState } from 'react';
import { budgetingFiltersSchema } from 'zod_schemas/budgeting_schema';

export default function Budgeting() {
  const { filters, setFilters, pagination, setPagination } = useUrlManagedState(
    budgetingFiltersSchema,
    9
  );

  const { isVerified } = useIsVerified();

  const [showSearchBar, setShowSearchBar] = useState(false);

  const [search, setSearch] = useState('');

  const [debouncedSearch] = useDebouncer({
    value: search,
  });

  const [modal, setModal] = useState<'create_budget' | 'category' | null>(null);

  return (
    <AppLayout title='Budgets' childrenClassName={'mb-7'}>
      <div className='sticky top-14 left-0 z-[800] flex h-14 justify-between gap-2 border-b border-neutral-310 bg-white bg-opacity-80 px-3 backdrop-blur-md 640:h-20 640:border-b-0 640:px-8 1024:top-20'>
        <div className='x-between my-auto mb-0 h-10 w-full gap-5 640:mb-auto'>
          <WideTabs
            className={clsx(
              'w-fit',
              showSearchBar ? 'hidden 640:block' : 'block'
            )}
            tabClassname={'mt-1 640:mt-0'}
            layoutId={'budget_status'}
            action={(tab) => {
              setFilters((prev) => ({ ...prev, status: tab }));
            }}
            currentTab={filters?.status?.value}
            tabs={budgetingFilterOptions}
          />

          <SearchInput
            placeholder='Search budgets'
            value={search}
            id={'search_employees'}
            wrapperClassname={clsx(
              '960:block hidden',
              showSearchBar && 'w-full 640:w-auto'
            )}
            className={clsx(
              'h-10 pr-0 640:w-full 640:pr-3.5 768:w-[240px]',
              showSearchBar ? 'w-full border' : 'w-[40px] border-0 640:border'
            )}
            onBlur={() => setShowSearchBar(false)}
            onClickSearch={() => {
              setShowSearchBar(true);
              document.getElementById('search_budgets')?.focus();
            }}
            onChange={(e) => setSearch(e.target.value)}
            clear={() => setSearch('')}
          />
        </div>

        <div className='x-center my-auto mt-4 w-fit flex-shrink-0 640:mt-auto 640:mb-auto'>
          <button
            onClick={() => {
              if (!isVerified) return;

              setModal('create_budget');
            }}
            className='primary-button x-center h-6 w-6 px-2 text-sm 640:h-10 640:w-full 640:px-4'
          >
            <span className={'my-auto mr-2 hidden 640:block'}>Add Budget</span>
            <span className={'my-auto'}>
              <SimplePlus />
            </span>
          </button>
        </div>
      </div>

      <ManageBudgetCreation
        show={modal === 'create_budget'}
        close={() => setModal(null)}
      />

      <div className={'mt-5 px-3 640:mt-0 640:px-8'}>
        <AppErrorBoundary>
          {filters?.status?.value === 'pending' ? (
            <PendingBudgets
              search={debouncedSearch}
              {...{
                pagination,
                setPagination,
              }}
            />
          ) : (
            <ActiveBudgets
              search={debouncedSearch}
              {...{
                pagination,
                setPagination,
              }}
            />
          )}
        </AppErrorBoundary>
      </div>
    </AppLayout>
  );
}
