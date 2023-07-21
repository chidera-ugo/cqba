import { SubmitButton } from 'components/form-elements/SubmitButton';
import { CentredModalWrapper } from 'components/modal/ModalWrapper';
import { DefaultCategoriesPicker } from 'components/modules/core/SelectDefaultCategories/DefaultCategoriesPicker';
import { useAppContext } from 'context/AppContext';
import { useChooseDefaultCategories } from 'hooks/api/categories/useChooseDefaultCategories';
import { useGetDefaultCategories } from 'hooks/api/categories/useGetDefaultCategories';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const SelectDefaultCategories = () => {
  const { pathname } = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<Array<string>>([]);

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
    if (
      !isVerified ||
      pathname.includes('/kyc') ||
      !user?.pinSet ||
      !data?.length ||
      user?.categoriesSet
    )
      return;

    setShowModal(true);
  }, [pathname, data]);

  function closeModal() {
    setShowModal(false);
  }

  return (
    <>
      <CentredModalWrapper
        show={showModal}
        undraggable
        className='max-h-[80vh] overflow-y-auto bg-white py-6'
      >
        <h3
          className={
            'relative mx-auto max-w-[440px] px-6 text-center text-3xl font-semibold leading-9'
          }
        >
          Manage expenses the easy way, select your top spend category
        </h3>

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
            className='dark-button mx-auto w-[200px]'
          >
            Continue
          </SubmitButton>
        </div>
      </CentredModalWrapper>
    </>
  );
};
