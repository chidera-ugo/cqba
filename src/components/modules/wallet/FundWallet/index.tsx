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
        type={'button'}
        onClick={() => setShowModal(true)}
        className='dark-button hover:bg-gray-1000 block h-11 w-full min-w-[163px] border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-1000 640:bg-black 640:text-white 640:hover:bg-gray-100 1180:w-auto'
      >
        <div className='x-center'>
          <span className='my-auto mr-2'>Fund wallet</span>
          <span className='my-auto'>
            <Inbound />
          </span>
        </div>
      </button>
    </>
  );
};
