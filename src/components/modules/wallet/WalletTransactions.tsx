import { Filter } from 'components/form-elements/Filter';
import { SearchInput } from 'components/form-elements/SearchInput';
import { AllTransactionsTable } from 'components/tables/wallet/AllTransactionsTable';
import { useState } from 'react';

export const WalletTransactions = () => {
  const [_filter, setFilter] = useState('');

  return (
    <>
      <div className='my-5 gap-2 640:my-7 640:flex'>
        <Filter
          id='transactions-filter'
          onChange={(option) => {
            setFilter(option.name);
          }}
          dropdownClassName='640:right-0 640:left-auto left-0'
          options={[
            { value: 7, name: 'Last 7 Days' },
            { value: 30, name: 'Last 30 Days' },
          ]}
        />

        <SearchInput className='mt-3 w-full 640:mt-0 640:w-[300px]' />
      </div>

      <AllTransactionsTable />
    </>
  );
};
