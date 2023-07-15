import { CentredModalWrapper } from 'components/modal/ModalWrapper';
import { ActivePlan } from 'components/modules/settings/license/ActivePlan';
import { Dispatch, SetStateAction } from 'react';

export const CancelPlan = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <CentredModalWrapper
      show={showModal}
      closeModal={() => setShowModal(false)}
      title={'Cancel your plan'}
      closeOnClickOutside
      className={'max-w-[460px] px-4'}
    >
      <div className='mt-2 rounded-xl bg-neutral-100 p-4'>
        <ActivePlan onlyShowHeader />
      </div>

      <p className={'mt-4 font-medium leading-6'}>
        Your plan will be canceled, but is still available until the end of your
        billing period on 22 July 2023. If you change your mind, you can renew
        your subscription.
      </p>

      <div className='mt-8 flex justify-end pb-6'>
        <button
          onClick={() => setShowModal(false)}
          className={'dark-button h-11'}
        >
          Cancel Plan
        </button>
      </div>
    </CentredModalWrapper>
  );
};
