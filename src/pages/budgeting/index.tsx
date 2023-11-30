import clsx from 'clsx';
import { WideTabs } from 'components/commons/WideTabs';
import { SearchInput } from 'components/form-elements/SearchInput';
import { AppLayout } from 'components/layouts/AppLayout';
import { AllBudgets } from 'components/modules/budgeting/AllBudgets';
import { ManageBudgetCreation } from 'components/modules/budgeting/ManageBudgetCreation';
import { SimplePlus } from 'components/svgs/others/Plus';
import { budgetingFilterOptions } from 'constants/budgeting/filters';
import { useUrlManagedState } from 'hooks/client_api/hooks/useUrlManagedState';
import { useDebouncer } from 'hooks/commons/useDebouncer';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { budgetingFiltersSchema } from 'zod_schemas/budgeting_schema';

export default function Budgeting() {
  const searchParams = useSearchParams();

  const { filters, setFilters, pagination, setPagination } = useUrlManagedState(
    budgetingFiltersSchema,
    searchParams,
    undefined,
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
      <div className='sticky top-14 left-0 z-[800] h-10 justify-between gap-2 bg-white bg-opacity-80 px-3 backdrop-blur-md 640:flex 640:h-20 640:px-8 1024:top-20'>
        <div className='x-between my-auto h-10 w-full gap-5'>
          <WideTabs
            className={clsx(
              'w-fit',
              showSearchBar ? 'hidden 640:block' : 'block'
            )}
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
            wrapperClassname={clsx(showSearchBar && 'w-full 640:w-auto')}
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

        <div className='x-center my-auto mt-4 w-full flex-shrink-0 640:mt-auto 640:mb-auto 640:w-fit'>
          <button
            onClick={() => {
              if (!isVerified) return;

              setModal('create_budget');
            }}
            className='primary-button x-center w-full px-2 text-sm 640:px-4'
          >
            <span className={'my-auto mr-2'}>Add Budget</span>
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

      <div className={'px-3 640:px-8'}>
        <AllBudgets
          search={debouncedSearch}
          status={filters?.status?.value}
          {...{
            pagination,
            setPagination,
          }}
        />
      </div>
    </AppLayout>
  );
}
