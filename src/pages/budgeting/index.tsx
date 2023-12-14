import clsx from 'clsx';
import { WideTabs } from 'components/commons/WideTabs';
import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { SearchInput } from 'components/form-elements/SearchInput';
import { SelectBudgetTypeForm } from 'components/forms/budgeting/SelectBudgetTypeForm';
import { AppLayout } from 'components/layouts/AppLayout';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { Budgets } from 'components/modules/budgeting/Budgets';
import { ManageBudgetCreation } from 'components/modules/budgeting/ManageBudgetCreation';
import { ManageProjectCreation } from 'components/modules/budgeting/ManageProjectCreation';
import { Grid, List } from 'components/svgs/GridAndList';
import { SimplePlus } from 'components/svgs/others/Plus';
import { budgetingFilterOptions } from 'constants/budgeting/filters';
import { useUserPlan } from 'hooks/access_control/useUserPlan';
import { useUrlManagedState } from 'hooks/client_api/hooks/useUrlManagedState';
import { useDebouncer } from 'hooks/commons/useDebouncer';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { getFromLocalStore, saveToLocalStore } from 'lib/localStore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { budgetingFiltersSchema } from 'zod_schemas/budgeting_schema';

type TLayout = 'grid' | 'list';

export default function Budgeting() {
  const { query, pathname, push } = useRouter();

  const [layout, setLayout] = useState<TLayout>(
    getFromLocalStore('preferences')?.['budgeting_layout'] ?? 'grid'
  );
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<
    'create_budget' | 'create_project' | 'choose_action' | null
  >(null);

  const [debouncedSearch] = useDebouncer({
    value: search,
  });

  const { isVerified } = useIsVerified();
  const { isPremiumUser } = useUserPlan();

  const tabs = budgetingFilterOptions.filter(({ isForPremium }) => {
    if (!isForPremium) return true;
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
      <div
        className={clsx(
          'sticky top-14 left-0 z-[800] flex gap-2 border-neutral-310 bg-white bg-opacity-80 px-3 backdrop-blur-md 640:block 640:border-b-0 640:px-8 640:pb-5 1024:top-20',
          isPremiumUser ? 'border-b' : ''
        )}
      >
        {isPremiumUser && (
          <div className='x-between my-auto mb-0 w-full gap-5 640:mb-auto'>
            <WideTabs
              className={clsx('block h-12 w-fit 640:h-14')}
              layoutId={'budget_status'}
              action={(tab) => {
                setFilters((prev) => ({ ...prev, status: tab }));
              }}
              currentTab={filters?.status?.value}
              tabs={tabs}
            />
          </div>
        )}

        <div
          className={clsx(
            'x-between my-auto h-full w-full gap-2 640:mt-5',
            !isPremiumUser && 'py-2 640:py-0'
          )}
        >
          <div className='flex w-full gap-2'>
            <SearchInput
              placeholder='Search budgets'
              value={search}
              id={'search_employees'}
              wrapperClassname={clsx(
                isPremiumUser ? 'w-full 640:block hidden my-auto' : 'w-full'
              )}
              className={clsx('h-10 w-full pr-0 640:w-[240px] 640:pr-3.5')}
              onChange={(e) => setSearch(e.target.value)}
              clear={() => setSearch('')}
            />
          </div>

          <div className='my-auto flex h-full flex-shrink-0 gap-2'>
            <div className='hidden h-10 flex-shrink-0 overflow-hidden rounded-full border border-neutral-200 640:flex'>
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
                    onClick={() => {
                      setLayout(id as TLayout);
                      saveToLocalStore('preferences', { budgeting_layout: id });
                    }}
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

            <div className='y-center my-auto h-full w-fit flex-shrink-0 640:mt-auto 640:mb-auto'>
              <button
                onClick={() => {
                  if (!isVerified) return;

                  setModal(isPremiumUser ? 'choose_action' : 'create_budget');
                }}
                className='primary-button x-center my-auto h-6 w-6 px-2 text-sm 640:h-10 640:w-full 640:px-4'
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

      <ManageBudgetCreation
        show={modal === 'create_budget'}
        close={() => setModal(null)}
      />

      <ManageProjectCreation show={query['modal'] === 'create_project'} />

      <RightModalWrapper
        show={modal === 'choose_action'}
        title={'Create New Budget'}
        closeOnClickOutside
        closeModal={() => setModal(null)}
        childrenClassname='px-4 640:px-8'
      >
        <SelectBudgetTypeForm
          onSubmit={({ project }) => {
            if (project) {
              push({
                pathname,
                query: {
                  ...query,
                  modal: 'create_project',
                },
              }).then(() => {
                setModal(null);
              });
            } else {
              setModal('create_budget');
            }
          }}
        />
      </RightModalWrapper>

      <div
        className={clsx(
          'px-3 640:mt-0 640:px-8',
          isPremiumUser ? 'mt-5' : 'mt-3 640:mt-5'
        )}
      >
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
