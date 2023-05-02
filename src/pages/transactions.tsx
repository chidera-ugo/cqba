import { Filter } from 'components/form-elements/Filter';
import { SearchInput } from 'components/form-elements/SearchInput';
import { GenerateStatementForm } from 'components/forms/transactions/GenerateStatementForm';
import { AppLayout } from 'components/layouts/AppLayout';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { Download } from 'components/svgs/others/Download';
import { AllTransactionsTable } from 'components/tables/wallet/AllTransactionsTable';
import { useState } from 'react';

export default function Transactions() {
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [showModal, setShowModal] = useState(false);

  function closeModal() {
    setShowModal(false);
  }

  return (
    <AppLayout title='Transactions'>
      <div className='my-5 justify-between gap-2 640:my-7 880:flex'>
        <div className='gap-2 480:flex'>
          <div className='flex gap-2'>
            <Filter
              id='department-filter'
              title='Department'
              {...{
                filters,
                setFilters,
              }}
              withChevron
              className='w-full 480:w-auto'
              dropdownClassName='left-0'
              options={['Engineering', 'Finance']}
            />

            <Filter
              id='duration-filter'
              title='Duration'
              {...{
                filters,
                setFilters,
              }}
              withChevron
              className='w-full 480:w-auto'
              dropdownClassName='left-0'
              options={[
                { value: 7, name: 'Last 7 Days' },
                { value: 30, name: 'Last 30 Days' },
              ]}
            />
          </div>

          <button
            onClick={() => setShowModal(true)}
            className='secondary-button x-center mt-3 flex h-11 w-full flex-shrink-0 rounded-full px-4 480:mt-0 480:w-auto'
          >
            <span className='my-auto mr-2'>Generate statement</span>
            <span className='my-auto'>
              <Download />
            </span>
          </button>
        </div>

        <SearchInput
          placeholder='Search transactions'
          className='mt-3 w-full 640:w-[300px] 880:mt-0'
        />
      </div>

      <RightModalWrapper
        show={showModal}
        title='Generate statement'
        close={closeModal}
        closeOnClickOutside
        childrenClassname='py-0 640:px-8 px-4'
      >
        <GenerateStatementForm close={closeModal} accountNumber='01848828848' />
      </RightModalWrapper>

      <AllTransactionsTable {...{ filters, setFilters }} />
    </AppLayout>
  );
}
