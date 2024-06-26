import clsx from 'clsx';
import { SearchInput } from 'components/form-elements/SearchInput';
import { FilterWithRangePreset } from 'components/modules/commons/FilterWithRangePreset';
import { WalletTransactionsTable } from 'components/tables/wallet/WalletTransactionsTable';
import { useGetAllBudgetsUnpaginated } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { useUrlManagedState } from 'hooks/client_api/hooks/useUrlManagedState';
import { useDebouncer } from 'hooks/commons/useDebouncer';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
import { PropsWithChildren, useState } from 'react';
import { walletFiltersSchema } from 'zod_schemas/wallet_schema';

export const WalletTransactions = ({
  showAllTransactions,
  children,
}: PropsWithChildren<{
  showAllTransactions?: boolean;
}>) => {
  const {
    primaryWallet,
    isLoading: gettingWallet,
    isError: walletErrored,
    getAmountWithCurrency,
  } = useManageWallets();

  const { filters, setFilters, pagination, setPagination, range, setRange } =
    useUrlManagedState(walletFiltersSchema, 7);

  const [search, setSearch] = useState('');

  const [debouncedSearch] = useDebouncer({
    value: search,
  });

  const { isLoading, data } = useGetAllBudgetsUnpaginated();

  return (
    <>
      <div className='my-5 block justify-between gap-2 640:my-7 1180:flex'>
        <div
          className={clsx(
            showAllTransactions ? 'flex gap-2' : 'hidden gap-2 1180:flex'
          )}
        >
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
                id: 'budgetId',
                label: 'Budget',
                options:
                  data?.docs.map(({ name, balance, _id }) => ({
                    label: `${name} - ${getAmountWithCurrency(balance)}`,
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

        {children}
      </div>

      <WalletTransactionsTable
        search={debouncedSearch}
        walletId={showAllTransactions ? undefined : primaryWallet?._id}
        canNotShowData={!primaryWallet}
        {...{
          filters,
          isLoading: gettingWallet,
          error: walletErrored,
          setFilters,
          pagination,
          setPagination,
          range,
          setRange,
        }}
      />
    </>
  );
};
