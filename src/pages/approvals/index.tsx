import clsx from 'clsx';
import { WideTabs } from 'components/commons/WideTabs';
import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { SearchInput } from 'components/form-elements/SearchInput';
import { AppLayout } from 'components/layouts/AppLayout';
import { Budgets } from 'components/modules/budgeting/Budgets';
import { Grid, List } from 'components/svgs/GridAndList';
import { approvalsFilterOptions } from 'constants/approvals/filters';
import { useUrlManagedState } from 'hooks/client_api/hooks/useUrlManagedState';
import { useDebouncer } from 'hooks/commons/useDebouncer';
import { getFromLocalStore, saveToLocalStore } from 'lib/localStore';
import { useState } from 'react';
import { approvalsFiltersSchema } from 'zod_schemas/approvals_schema';

type TLayout = 'grid' | 'list';

export default function Approvals() {
  const [layout, setLayout] = useState<TLayout>(
    getFromLocalStore('preferences')?.['budgeting_layout'] ?? 'grid'
  );
  const [search, setSearch] = useState('');

  const [debouncedSearch] = useDebouncer({
    value: search,
  });

  const { filters, setFilters, pagination, setPagination } = useUrlManagedState(
    approvalsFiltersSchema,
    30,
    undefined,
    9
  );

  const currentTab = filters?.status?.value;

  return (
    <AppLayout title='Approvals' childrenClassName={'mb-7'}>
      <div
        className={clsx(
          'sticky top-14 left-0 z-[800] flex gap-2 border-b border-neutral-310 bg-white bg-opacity-80 px-3 backdrop-blur-md 640:block 640:border-b-0 640:px-8 640:pb-5 1024:top-20'
        )}
      >
        <div className='x-between my-auto mb-0 w-full gap-5 640:mb-auto'>
          <WideTabs
            className={clsx('block h-12 w-fit 640:h-14')}
            layoutId={'budget_status'}
            action={(tab) => {
              setFilters((prev) => ({ ...prev, status: tab }));
              setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            }}
            currentTab={filters?.status?.value}
            tabs={approvalsFilterOptions}
          />
        </div>

        <div className={clsx('x-between my-auto h-full w-full gap-2 640:mt-5')}>
          <div className='flex w-full gap-2'>
            <SearchInput
              placeholder='Search budgets'
              value={search}
              id={'search_employees'}
              wrapperClassname={clsx('w-full 640:block hidden my-auto')}
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
          </div>
        </div>
      </div>

      <div className={clsx('mt-5 px-3 640:mt-0 640:px-8')}>
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
