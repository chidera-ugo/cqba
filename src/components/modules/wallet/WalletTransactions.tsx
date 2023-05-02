import { Filter } from 'components/form-elements/Filter';
import { SearchInput } from 'components/form-elements/SearchInput';
import { AllTransactionsTable } from 'components/tables/wallet/AllTransactionsTable';
import { useState } from 'react';

export const WalletTransactions = () => {
  const [filters, setFilters] = useState<Record<string, any>>({});

  return (
    <>
      <div className='my-5 flex justify-between gap-2 640:my-7'>
        <Filter
          id='wallet-transactions-filter'
          title='Duration'
          {...{
            filters,
            setFilters,
          }}
          withChevron
          dropdownClassName='left-0'
          options={[
            { value: 7, name: 'Last 7 Days' },
            { value: 30, name: 'Last 30 Days' },
          ]}
        />

        <SearchInput
          placeholder='Search transactions'
          className='w-full 640:w-[300px]'
        />
      </div>

      <AllTransactionsTable {...{ filters, setFilters }} />
    </>
  );
};
