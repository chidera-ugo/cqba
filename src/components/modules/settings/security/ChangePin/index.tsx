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
        title={'Change PIN'}
        childrenClassname={'p-0'}
      >
        <div className='mt-8 text-center'>
          <ChangePinSteps closeModal={closeModal} />
        </div>
      </RightModalWrapper>
    </>
  );
};
