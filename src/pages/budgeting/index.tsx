import clsx from 'clsx';
import { WideTabs } from 'components/commons/WideTabs';
import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { SearchInput } from 'components/form-elements/SearchInput';
import { SelectBudgetTypeForm } from 'components/forms/budgeting/SelectBudgetTypeForm';
import { AppLayout } from 'components/layouts/AppLayout';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { Budgets } from 'components/modules/budgeting/Budgets';
import { ManageSingleBudgetCreation } from 'components/modules/budgeting/ManageSingleBudgetCreation';
import { Grid, List } from 'components/svgs/GridAndList';
import { SimplePlus } from 'components/svgs/others/Plus';
import { budgetingFilterOptions } from 'constants/budgeting/filters';
import { useUserPlan } from 'hooks/access_control/useUserPlan';
import { useUrlManagedState } from 'hooks/client_api/hooks/useUrlManagedState';
import { useDebouncer } from 'hooks/commons/useDebouncer';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useState } from 'react';
import { budgetingFiltersSchema } from 'zod_schemas/budgeting_schema';

type TLayout = 'grid' | 'list';

export default function Budgeting() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [layout, setLayout] = useState<TLayout>('grid');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<
    'create_budget' | 'choose_budget_type' | null
  >(null);

  const [debouncedSearch] = useDebouncer({
    value: search,
  });

  const { isVerified } = useIsVerified();
  const { isPremiumUser, isReady } = useUserPlan();

  const tabs = budgetingFilterOptions.filter(({ isPremium }) => {
    if (!isPremium) return true;
    return isPremiumUser;
  });

  const { filters, setFilters, pagination, setPagination } = useUrlManagedState(
    budgetingFiltersSchema(tabs[0]!),
    30,
    undefined,
    9
  );

  const currentTab = filters?.status?.value;

  return (
    <AppLayout title='Budgets' childrenClassName={'mb-7'}>
      <div className='sticky top-14 left-0 z-[800] gap-2 border-b border-neutral-310 bg-white bg-opacity-80 py-5 px-3 backdrop-blur-md 640:border-b-0 640:px-8 1024:top-20'>
        {isReady && (
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
              tabs={tabs}
            />
          </div>
        )}

        <div className='x-between mt-5'>
          <div className='flex gap-2'>
            <SearchInput
              placeholder='Search budgets'
              value={search}
              id={'search_employees'}
              wrapperClassname={clsx(
                '960:block hidden my-auto',
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

          <div className='flex gap-2'>
            <div className='flex overflow-hidden rounded-full border border-neutral-200'>
              {[
                {
                  id: 'grid',
                  icon: <Grid />,
                  className: 'pr-1.5 pl-2.5',
                },
                {
                  id: 'list',
                  icon: <List />,
                  className: 'pl-1.5 pr-2.5',
                },
              ].map(({ id, icon, className }, i) => {
                return (
                  <button
                    key={id}
                    onClick={() => setLayout(id as TLayout)}
                    className={clsx(
                      className,
                      'y-center my-auto h-full w-full',
                      i > 0 && 'border-l border-neutral-200',
                      layout === id
                        ? 'bg-neutral-100 text-primary-main'
                        : 'text-neutral-500'
                    )}
                  >
                    <div className='mx-auto'>{icon}</div>
                  </button>
                );
              })}
            </div>

            <div className='x-center my-auto mt-4 w-fit flex-shrink-0 640:mt-auto 640:mb-auto'>
              <button
                onClick={() => {
                  if (!isVerified) return;

                  setModal(
                    isPremiumUser ? 'choose_budget_type' : 'create_budget'
                  );
                }}
                className='primary-button x-center h-6 w-6 px-2 text-sm 640:h-10 640:w-full 640:px-4'
              >
                <span className={'my-auto mr-2 hidden 640:block'}>
                  Add Budget
                </span>
                <span className={'my-auto'}>
                  <SimplePlus />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ManageSingleBudgetCreation
        show={modal === 'create_budget'}
        close={() => setModal(null)}
      />

      <RightModalWrapper
        show={modal === 'choose_budget_type'}
        title={'Create New Budget'}
        closeOnClickOutside
        closeModal={() => setModal(null)}
        childrenClassname='px-4 640:px-8'
      >
        <SelectBudgetTypeForm
          onSubmit={(budgetType) => {
            if (budgetType === 'project') {
            } else {
              setModal('create_budget');
            }
          }}
        />
      </RightModalWrapper>

      <div className={'mt-5 px-3 640:mt-0 640:px-8'}>
        <AppErrorBoundary>
          <Budgets
            layout={layout}
            currentTab={currentTab}
            search={debouncedSearch}
            {...{
              pagination,
              setPagination,
            }}
          />
        </AppErrorBoundary>
      </div>
    </AppLayout>
  );
}
