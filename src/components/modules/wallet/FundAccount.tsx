import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { Inbound } from 'components/svgs/navigation/Arrows';
import { useState } from 'react';

export const FundAccount = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <RightModalWrapper
        {...{
          show: showModal,
          close() {
            setShowModal(false);
          },
        }}
        closeOnClickOutside
        title='Fund wallet'
      >
        hello world
      </RightModalWrapper>

      <button
        onClick={() => setShowModal(true)}
        className='dark-button x-center h-11 w-full px-4 text-sm font-semibold 768:w-auto'
      >
        <span className='my-auto mr-2'>Fund wallet</span>
        <span className='my-auto'>
          <Inbound />
        </span>
      </button>
    </>
  );
};
