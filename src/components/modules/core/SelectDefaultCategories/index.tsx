import { SubmitButton } from 'components/form-elements/SubmitButton';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { DefaultCategoriesPicker } from 'components/modules/core/SelectDefaultCategories/DefaultCategoriesPicker';
import { useAppContext } from 'context/AppContext';
import { useChooseDefaultCategories } from 'hooks/api/categories/useChooseDefaultCategories';
import { useGetDefaultCategories } from 'hooks/api/categories/useGetDefaultCategories';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useIsKycFlow } from 'hooks/kyc/useIsKycFlow';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const SelectDefaultCategories = () => {
  const { pathname } = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<Array<string>>([]);

  const { isKycFlow } = useIsKycFlow();
  const { isVerified } = useIsVerified();
  const { getCurrentUser, state } = useAppContext();

  const { user } = state;

  const { data } = useGetDefaultCategories();

  const { mutate, isLoading } = useChooseDefaultCategories({
    onSuccess() {
      closeModal();
      getCurrentUser!({});
    },
  });

  useEffect(() => {
    if (!isVerified || isKycFlow || !user?.pinSet || !data?.length) {
      setShowModal(false);
      return;
    }

    if (!!user?.defaultCategoryIds?.length) {
      setShowModal(false);
      return;
    }

    setShowModal(false);
  }, [pathname, data, user, isVerified]);

  function closeModal() {
    setShowModal(false);
  }

  return (
    <>
      <RightModalWrapper hideHeader show={showModal}>
        <div className='max-h-[736px] overflow-y-auto bg-white py-6'>
          <div className={'mx-auto max-w-[440px] px-6 text-center'}>
            <h3 className={'relative text-3xl font-semibold leading-9'}>
              Create a budget and stay on top of your expense
            </h3>

            <p className={'mt-3'}>
              Manage expenses the easy way, create a budget before you start
              transacting.
            </p>
          </div>

          <div className='h-auto min-h-[400px] w-full cursor-grab p-5 640:min-w-[400px]'>
            {!!data?.length && (
              <DefaultCategoriesPicker
                {...{
                  data,
                  setSelected,
                }}
              />
            )}
          </div>

          <div className='x-center'>
            <SubmitButton
              onClick={() => {
                mutate(selected);
              }}
              type={'button'}
              submitting={isLoading}
              className='primary-button mx-auto w-[200px]'
            >
              Create Personal Budget
            </SubmitButton>
          </div>
        </div>
      </RightModalWrapper>
    </>
  );
};
