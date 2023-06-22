import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { CreatePinSteps } from 'components/modules/core/CreatePin/CreatePinSteps';
import { useAppContext } from 'context/AppContext';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const CreatePin = () => {
  const [showModal, setShowModal] = useState(false);

  const { pathname } = useRouter();

  const { user } = useAppContext().state;

  const { isVerified } = useIsVerified();

  useEffect(() => {
    if (!isVerified || pathname.includes('/kyc') || user?.pinSet) return;

    setShowModal(true);
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
