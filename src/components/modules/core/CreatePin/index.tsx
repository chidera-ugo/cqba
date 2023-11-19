import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { CreatePinSteps } from 'components/modules/core/CreatePin/CreatePinSteps';
import { useAppContext } from 'context/AppContext';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useIsKycFlow } from 'hooks/kyc/useIsKycFlow';
import { useEffect, useState } from 'react';

export const CreatePin = () => {
  const [showModal, setShowModal] = useState(false);
  const { user, hasSetPin } = useAppContext().state;

  const { isKycFlow } = useIsKycFlow();

  const { isVerified } = useIsVerified();

  useEffect(() => {
    if (!isVerified || isKycFlow || user?.pinSet || hasSetPin) return;

    setShowModal(true);
  }, [user, hasSetPin, isVerified, isKycFlow]);

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
