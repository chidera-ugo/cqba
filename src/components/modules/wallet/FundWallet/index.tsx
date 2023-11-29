import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { VirtualAccounts } from 'components/modules/wallet/FundWallet/methods/VirtualAccounts';
import { Inbound } from 'components/svgs/navigation/Arrows';
import { useState } from 'react';

export const FundWallet = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <RightModalWrapper
        show={showModal}
        closeModal={() => setShowModal(false)}
        closeOnClickOutside
        title={'Bank Transfer'}
      >
        <VirtualAccounts />
      </RightModalWrapper>

      <button
        onClick={() => setShowModal(true)}
        className='secondary-button 640:dark-button x-center h-11 w-full px-4 text-sm font-semibold 1180:w-auto'
      >
        <span className='my-auto mr-2'>Fund wallet</span>
        <span className='my-auto'>
          <Inbound />
        </span>
      </button>
    </>
  );
};
