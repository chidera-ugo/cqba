import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { ChangePinSteps } from 'components/modules/settings/security/ChangePin/ChangePinSteps';
import { useQueryValidator } from 'hooks/commons/useQueryValidator';
import { useRouter } from 'next/router';

export const ChangePin = ({ hasSetPin }: { hasSetPin: boolean }) => {
  const { getValidQuery } = useQueryValidator();
  const { replace } = useRouter();

  const showModal = hasSetPin && getValidQuery('_m') === 'pin';

  function closeModal() {
    replace('/settings/security');
  }

  return (
    <>
      <RightModalWrapper
        show={showModal}
        {...{ closeModal }}
        className='bg-white'
      >
        <div className='text-center'>
          <h5>Change PIN</h5>
          <ChangePinSteps closeModal={closeModal} />
        </div>
      </RightModalWrapper>
    </>
  );
};
