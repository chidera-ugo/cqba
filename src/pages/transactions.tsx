import { SearchInput } from 'components/form-elements/SearchInput';
import { GenerateStatementForm } from 'components/forms/transactions/GenerateStatementForm';
import { AppLayout } from 'components/layouts/AppLayout';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { Download } from 'components/svgs/others/Download';
import { AllTransactionsTable } from 'components/tables/wallet/AllTransactionsTable';
import { useDebouncer } from 'hooks/common/useDebouncer';
import { useState } from 'react';

export default function Transactions() {
  const [filters, setFilters] = useState<Record<string, any>>({});

  const [showModal, setShowModal] = useState(false);

  const [search, setSearch] = useState('');

  const [debouncedSearch] = useDebouncer({
    value: search,
  });

  function closeModal() {
    setShowModal(false);
  }

  return (
    <AppLayout title='Transactions'>
      <div className='my-5 justify-between gap-2 640:my-7 880:flex'>
        <SearchInput
          placeholder='Search transactions'
          value={search}
          className='w-full 640:w-[300px]'
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          clear={() => setSearch('')}
        />

        <div className='mt-3 flex gap-2 880:mt-0'>
          <div className='flex gap-2'></div>

          <button
            onClick={() => setShowModal(true)}
            className='secondary-button x-center flex h-11 w-full rounded-full px-4 480:w-auto'
          >
            <span className='my-auto mr-2'>Generate statement</span>
            <span className='my-auto'>
              <Download />
            </span>
          </button>
        </div>
      </div>

      <RightModalWrapper
        show={showModal}
        title='Generate statement'
        closeModal={closeModal}
        closeOnClickOutside
        childrenClassname='py-0 640:px-8 px-4'
      >
        <GenerateStatementForm close={closeModal} accountNumber='01848828848' />
      </RightModalWrapper>

      <AllTransactionsTable
        search={debouncedSearch}
        {...{ filters, setFilters }}
      />
    </AppLayout>
  );
}
