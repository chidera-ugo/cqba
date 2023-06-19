import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { CreatePinSteps } from 'components/modules/core/CreatePin/CreatePinSteps';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const CreatePin = () => {
  const [showModal, setShowModal] = useState(false);

  const { pathname } = useRouter();

  useEffect(() => {
    if (pathname.includes('/kyc')) return;

    setShowModal(false);
  }, [pathname]);

  function closeModal() {
    setShowModal(false);
  }

  return (
    <>
      <RightModalWrapper
        show={showModal}
        className='bg-white'
        title={'Create Transaction Pin'}
      >
        <CreatePinSteps closeModal={closeModal} />
      </RightModalWrapper>
    </>
  );
};
