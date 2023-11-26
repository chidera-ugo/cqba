import { SearchInput } from 'components/form-elements/SearchInput';
import { AllTransactionsTable } from 'components/tables/wallet/AllTransactionsTable';
import { useDebouncer } from 'hooks/common/useDebouncer';
import { useState } from 'react';

export const WalletTransactions = () => {
  const [filters, setFilters] = useState<Record<string, any>>({});

  const [search, setSearch] = useState('');

  const [debouncedSearch] = useDebouncer({
    value: search,
  });

  return (
    <>
      <div className='my-5 flex justify-between gap-2 640:my-7'>
        <SearchInput
          placeholder='Search transactions'
          value={search}
          className='w-full 640:w-[300px]'
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          clear={() => setSearch('')}
        />
      </div>

      {/* Todo: Add filters */}
      <AllTransactionsTable
        search={debouncedSearch}
        {...{ filters, setFilters }}
      />
    </>
  );
};
