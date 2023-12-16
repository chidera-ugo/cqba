import clsx from 'clsx';
import { FullScreenLoader } from 'components/commons/FullScreenLoader';
import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { UpdateOwnerInformationForm } from 'components/forms/kyc/UpdateOwnerInformationForm';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { Confirmation } from 'components/modals/Confirmation';
import { OwnersList } from 'components/modules/kyc/ManageBusinessOwnersAndDirectors/OwnersList';
import { Spinner } from 'components/svgs/dashboard/Spinner';
import { UserAdd } from 'components/svgs/kyc/StepsCompletion';
import { useDeleteOwner } from 'hooks/api/kyc/useDeleteOwner';
import { useGetOrganizationInformation } from 'hooks/api/kyc/useGetOrganizationInformation';
import { IOwner } from 'hooks/api/kyc/useUpdateOwnerInformation';
import { useQueryInvalidator } from 'hooks/app/useQueryInvalidator';
import { useAccountVerificationStatus } from 'hooks/dashboard/kyc/useAccountVerificationStatus';
import Link from 'next/link';
import { useState } from 'react';

export type OwnerType = 'owner' | 'director';

export const ManageBusinessOwnersAndDirectors = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentOwner, setCurrentOwner] = useState<IOwner | null>(null);

  const { hasProvidedAllRequirements } = useAccountVerificationStatus();

  const [ownerToDelete, setOwnerToDelete] = useState<null | {
    name: string;
    id: string;
  }>(null);

  const { invalidate } = useQueryInvalidator();

  const { isUnderReviewOrApproved } = useAccountVerificationStatus();

  const { isLoading, isError, isFetching, data } =
    useGetOrganizationInformation();

  const { mutate: _delete, isLoading: deleting } = useDeleteOwner({
    onSuccess() {
      invalidate('organization');
    },
  });

  function closeModal() {
    /*
    Calling replace here so that it triggers the unsaved changes prompt if needed
    */
    setCurrentOwner(null);
    setShowModal(false);
  }

  function handleShowModal() {
    setShowModal(true);
  }

  const modalTitleSuffix = 'Business Owner';

  return (
    <>
      <FullScreenLoader show={deleting} />

      {!data?.owners?.length ? (
        <button
          onClick={handleShowModal}
          className={clsx('dashed_card mt-5 w-full bg-primary-50')}
        >
          <span>
            <UserAdd />
          </span>

          <h5 className={clsx('mt-3 text-left text-lg font-medium')}>
            Tell us about the business representative
          </h5>

          <p
            className={
              'mt-2 max-w-[360px] text-left text-sm leading-5 text-neutral-600'
            }
          >
            A business representative is either an owner, director or
            shareholder of your business
          </p>
        </button>
      ) : (
        <>
          <AppErrorBoundary>
            <OwnersList
              {...{
                isLoading,
                isError,
                setCurrentOwner,
                isUnderReview: isUnderReviewOrApproved,
                setOwnerToDelete,
              }}
              handleShowModal={handleShowModal}
              data={data?.owners}
            />
          </AppErrorBoundary>

          {!isUnderReviewOrApproved ? (
            <div className={clsx('mt-4 flex gap-4')}>
              <button
                onClick={handleShowModal}
                className={clsx('text-sm font-medium text-primary-main')}
              >
                Add additional owners, director or shareholder
              </button>

              {isFetching && (
                <div className='my-auto'>
                  <Spinner className='text-primary-main' />
                </div>
              )}
            </div>
          ) : null}

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
        </>
      )}

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
          isUnderReviewOrApproved
            ? 'View Owner'
            : currentOwner
            ? `Edit ${modalTitleSuffix}`
            : `Add ${modalTitleSuffix}`
        }
        show={isUnderReviewOrApproved ? showModal && !!currentOwner : showModal}
        closeOnClickOutside
        childrenClassname='p-4 pt-2 640:p-8 640:pt-4'
        {...{ closeModal }}
      >
        <UpdateOwnerInformationForm
          {...{
            currentOwner,
            closeModal,
          }}
        />
      </RightModalWrapper>
    </>
  );
};
