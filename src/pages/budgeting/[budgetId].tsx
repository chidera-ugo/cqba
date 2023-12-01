import clsx from 'clsx';
import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { SearchInput } from 'components/form-elements/SearchInput';
import { AppLayout } from 'components/layouts/AppLayout';
import { ApprovedBudgetDetails } from 'components/modules/budgeting/ApprovedBudgetDetails';
import { FilterWithRangePreset } from 'components/modules/commons/FilterWithRangePreset';
import { useGetBudgetById } from 'hooks/api/budgeting/useGetBudgetById';
import { useUrlManagedState } from 'hooks/client_api/hooks/useUrlManagedState';
import { useDebouncer } from 'hooks/commons/useDebouncer';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { walletFiltersSchema } from 'zod_schemas/wallet_schema';

export default function BudgetDetails() {
  const { query } = useRouter();

  const _q = query['budgetId'];
  const budgetId = typeof _q === 'string' ? _q : '';

  const { isLoading, isError, data } = useGetBudgetById(budgetId, {
    enabled: !!budgetId,
  });

  const searchParams = useSearchParams();

  const { filters, setFilters, pagination, setPagination, range, setRange } =
    useUrlManagedState(walletFiltersSchema, searchParams, 7);

  const [search, setSearch] = useState('');

  const [debouncedSearch] = useDebouncer({
    value: search,
  });

  return (
    <AppLayout
      title={'Budgeting'}
      breadCrumbs={[
        {
          title: 'Budgeting',
          url: '/budgeting',
        },
        {
          title: 'Track Expense',
        },
      ]}
      breadCrumbsSlot={
        data?.status === 'closed' ? null : (
          <div className={clsx('my-auto hidden gap-2 1180:flex')}>
            <SearchInput
              placeholder='Search by Transaction ID'
              value={search}
              wrapperClassname={'640:w-auto w-full'}
              className='w-full 640:w-[300px]'
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              clear={() => setSearch('')}
            />

            <FilterWithRangePreset
              processing={isLoading}
              {...{
                filters,
                setFilters,
                range,
                setRange,
              }}
              selectFilters={[
                {
                  id: 'transactionType',
                  label: 'Transaction Type',
                  options: [
                    { label: 'Credit', value: 'credit' },
                    { label: 'Debit', value: 'debit' },
                  ],
                },
              ]}
            />
          </div>
        )
      }
    >
      {isLoading ? (
        <IsLoading />
      ) : isError ||
        (data?.status !== 'active' && data?.status !== 'closed') ? (
        <IsError description={'Failed to get budget details'} />
      ) : (
        <AppErrorBoundary>
          <ApprovedBudgetDetails
            search={debouncedSearch}
            {...{
              filters,
              setFilters,
              pagination,
              setPagination,
              range,
              setRange,
            }}
            budget={data}
          />
        </AppErrorBoundary>
      )}
    </AppLayout>
  );
}
