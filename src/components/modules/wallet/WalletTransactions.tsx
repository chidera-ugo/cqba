import { SearchInput } from 'components/form-elements/SearchInput';
import { FilterWithRangePreset } from 'components/modules/commons/FilterWithRangePreset';
import { FundWallet } from 'components/modules/wallet/FundWallet';
import { MakeTransfer } from 'components/modules/wallet/MakeTransfer';
import { WalletTransactionsTable } from 'components/tables/wallet/WalletTransactionsTable';
import { useGetAllBudgetsUnpaginated } from 'hooks/api/budgeting/useGetAllBudgets';
import { useUrlManagedState } from 'hooks/client_api/hooks/useUrlManagedState';
import { useDebouncer } from 'hooks/commons/useDebouncer';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { formatAmount } from 'utils/formatters/formatAmount';
import { walletFiltersSchema } from 'zod_schemas/wallet';

export const WalletTransactions = () => {
  const searchParams = useSearchParams();

  const { filters, setFilters, pagination, setPagination, range, setRange } =
    useUrlManagedState(walletFiltersSchema, searchParams, 7);

  const [search, setSearch] = useState('');

  const [debouncedSearch] = useDebouncer({
    value: search,
  });

  const { isLoading, data } = useGetAllBudgetsUnpaginated();

  return (
    <>
      <div className='my-5 block justify-between gap-2 640:my-7 1180:flex'>
        <div className='hidden gap-2 1180:flex'>
          <SearchInput
            placeholder='Search by transaction ID'
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
                id: 'budgetId',
                label: 'Budget',
                options:
                  data?.docs.map(({ name, availableAmount, _id }) => ({
                    label: `${name} - ${formatAmount({
                      value: availableAmount,
                    })}`,
                    value: _id,
                  })) ?? [],
              },
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

        <div className='mt-4 w-full gap-3 375:flex 1180:mt-0 1180:w-auto'>
          <FundWallet />
          <MakeTransfer />
        </div>
      </div>

      <WalletTransactionsTable
        search={debouncedSearch}
        {...{ filters, setFilters, pagination, setPagination, range, setRange }}
      />
    </>
  );
};
