import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { SubAccounts } from 'components/modules/wallet/MakeTransfer/SubAccounts';
import { Outbound } from 'components/svgs/navigation/Arrows';
import { useEffect, useState } from 'react';

export const MakeTransfer = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  useEffect(() => {
    setModalTitle('Make a transfer');
  }, [showModal]);

  return (
    <>
      <RightModalWrapper
        {...{
          show: showModal,
          closeModal() {
            setShowModal(false);
          },
        }}
        closeOnClickOutside
        title={modalTitle}
        childrenClassname='py-0 640:px-8 px-4'
      >
        <SubAccounts
          close={() => setShowModal(false)}
          {...{
            setModalTitle,
          }}
        />
      </RightModalWrapper>

      <button
        onClick={() => setShowModal(true)}
        className='primary-button x-center mt-3 h-11 w-full px-4 text-sm font-semibold 425:mt-0 768:w-auto'
      >
        <span className='my-auto mr-2'>Make a transfer</span>
        <span className='my-auto'>
          <Outbound />
        </span>
      </button>
    </>
  );
};
