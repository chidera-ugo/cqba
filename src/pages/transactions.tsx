import { GenerateStatementForm } from 'components/forms/transactions/GenerateStatementForm';
import { AppLayout } from 'components/layouts/AppLayout';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { WalletTransactions } from 'components/modules/wallet/WalletTransactions';
import { Download } from 'components/svgs/others/Download';
import { useState } from 'react';

export default function Transactions() {
  const [showModal, setShowModal] = useState(false);

  function closeModal() {
    setShowModal(false);
  }

  return (
    <AppLayout title='Transactions'>
      <RightModalWrapper
        show={showModal}
        title='Generate statement'
        closeModal={closeModal}
        closeOnClickOutside
        childrenClassname='py-0 640:px-8 px-4'
      >
        <GenerateStatementForm close={closeModal} />
      </RightModalWrapper>

      <WalletTransactions showAllTransactions>
        <div className='mt-3 hidden gap-2 880:mt-0 1180:flex'>
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
      </WalletTransactions>
    </AppLayout>
  );
}
