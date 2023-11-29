import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { FullScreenLoader } from 'components/commons/FullScreenLoader';
import { UpdateOwnerInformationForm } from 'components/forms/kyc/UpdateOwnerInformationForm';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { Confirmation } from 'components/modals/Confirmation';
import { OwnersList } from 'components/modules/kyc/ManageBusinessOwnersAndDirectors/OwnersList';
import { Spinner } from 'components/svgs/dashboard/Spinner';
import { useDeleteOwner } from 'hooks/api/kyc/useDeleteOwner';
import { useGetOrganizationInformation } from 'hooks/api/kyc/useGetOrganizationInformation';
import { IOwner } from 'hooks/api/kyc/useUpdateOwnerInformation';
import { useAccountVerificationStatus } from 'hooks/dashboard/kyc/useAccountVerificationStatus';
import Link from 'next/link';
import { useState } from 'react';

export type OwnerType = 'owner' | 'director';

export const ManageBusinessOwnersAndDirectors = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentOwner, setCurrentOwner] = useState<IOwner | null>(null);

  const { hasProvidedAllRequirements } = useAccountVerificationStatus();

  const [type, setType] = useState<OwnerType>('owner');

  const [ownerToDelete, setOwnerToDelete] = useState<null | {
    name: string;
    id: string;
  }>(null);

  const queryClient = useQueryClient();

  const { isUnderReview } = useAccountVerificationStatus();

  const { isLoading, isError, isFetching, data } =
    useGetOrganizationInformation();

  const { mutate: _delete, isLoading: deleting } = useDeleteOwner({
    onSuccess() {
      queryClient.invalidateQueries(['organization-information']);
    },
  });

  function closeModal() {
    /*
    Calling replace here so that it triggers the unsaved changes prompt if needed
    */
    setCurrentOwner(null);
    setShowModal(false);
  }

  function handleShowModal(type: OwnerType) {
    setType(type);
    setShowModal(true);
  }

  const modalTitleSuffix = `Business ${
    type === 'owner' ? 'Owner' : 'Director'
  }`;

  return (
    <>
      <FullScreenLoader show={deleting} />

      <div className={'mt-4 rounded-lg border border-neutral-200 p-5'}>
        <h5 className={'text-base'}>Business Directors</h5>
        <p className={'mt-1 text-sm text-neutral-400'}>
          Please identify at least 1 director of your business
        </p>

        <OwnersList
          {...{
            isLoading,
            isError,
            setCurrentOwner,
            isUnderReview,
            setOwnerToDelete,
          }}
          handleShowModal={() => handleShowModal('director')}
          data={data?.directors}
        />

        {!isUnderReview && (
          <div className={clsx('mt-5 flex gap-4')}>
            <button
              onClick={() => handleShowModal('director')}
              className={clsx(
                'secondary-button rounded-lg border-none bg-neutral-100 text-neutral-500'
              )}
            >
              Add Director
            </button>

            {isFetching && (
              <div className='my-auto'>
                <Spinner className='text-primary-main' />
              </div>
            )}
          </div>
        )}
      </div>

      <div className={'mt-4 rounded-lg border border-neutral-200 p-5'}>
        <h5 className={'text-base'}>Business Owners</h5>
        <p className={'mt-1 text-sm text-neutral-400'}>
          Identify or add at least 1 person who owns a minimum total of 5% of
          the business
        </p>

        <OwnersList
          {...{
            isLoading,
            isError,
            setCurrentOwner,
            isUnderReview,
            setOwnerToDelete,
          }}
          handleShowModal={() => handleShowModal('owner')}
          data={data?.owners}
        />

        {!isUnderReview && (
          <div className={clsx('mt-5 flex gap-4')}>
            <button
              onClick={() => handleShowModal('owner')}
              className={clsx(
                'secondary-button rounded-lg border-none bg-neutral-100 text-neutral-500'
              )}
            >
              Add Owner
            </button>

            {isFetching && (
              <div className='my-auto'>
                <Spinner className='text-primary-main' />
              </div>
            )}
          </div>
        )}
      </div>

      {data?.directors?.length || data?.owners?.length ? (
        <div className={'mt-10 pb-8'}>
          <Link
            href={`/kyc?tab=${
              hasProvidedAllRequirements
                ? 'review-and-submit'
                : 'business-documentation&showSteps=true'
            }`}
          >
            <div className='primary-button w-full min-w-[170px] 640:w-min'>
              <span className='y-center h-full'>Save and Continue</span>
            </div>
          </Link>

          <Link
            href={'/kyc?tab=review-and-submit&showSteps=true'}
            className='x-center mx-auto mt-4 flex w-full py-2 text-center text-sm font-medium 640:hidden'
          >
            Skip for later
          </Link>
        </div>
      ) : null}

      <Confirmation
        title='Confirm Deletion'
        show={!!ownerToDelete}
        subTitle={`Are your sure you want to delete "${ownerToDelete?.name}"? You action cannot be undone`}
        negative={() => setOwnerToDelete(null)}
        positive={() => {
          _delete({
            id: ownerToDelete!.id,
          });
          setOwnerToDelete(null);
        }}
      />

      <RightModalWrapper
        title={
          isUnderReview
            ? 'View Owner'
            : currentOwner
            ? `Edit ${modalTitleSuffix}`
            : `Add ${modalTitleSuffix}`
        }
        show={isUnderReview ? showModal && !!currentOwner : showModal}
        closeOnClickOutside
        childrenClassname='p-4 pt-2 640:p-8 640:pt-4'
        {...{ closeModal }}
      >
        <UpdateOwnerInformationForm
          type={type}
          {...{
            currentOwner,
            closeModal,
          }}
        />
      </RightModalWrapper>
    </>
  );
};
