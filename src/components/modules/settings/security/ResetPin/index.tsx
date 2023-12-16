import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { ResetPinSteps } from 'components/modules/settings/security/ResetPin/ResetPinSteps';
import { useQueryValidator } from 'hooks/commons/useQueryValidator';
import { useRouter } from 'next/router';

export const ResetPin = ({ hasSetPin }: { hasSetPin: boolean }) => {
  const { getValidQuery } = useQueryValidator();
  const { replace } = useRouter();

  const showModal = hasSetPin && getValidQuery('_m') === 'reset-pin';

  function closeModal() {
    replace('/settings/security');
  }

  return (
    <>
      <RightModalWrapper
        closeModal={closeModal}
        show={showModal}
        className='bg-white'
        title={'Reset Transaction PIN'}
      >
        <ResetPinSteps closeModal={closeModal} />
      </RightModalWrapper>
    </>
  );
};
