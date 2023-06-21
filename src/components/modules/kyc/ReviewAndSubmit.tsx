import { useQueryClient } from '@tanstack/react-query';
import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { CheckInput } from 'components/form-elements/CheckInput';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { DocumentReview } from 'components/illustrations/DocumentReview';
import { SimpleInformation } from 'components/modules/common/SimpleInformation';
import { useApplyForReview } from 'hooks/api/kyc/useApplyForReview';
import { useAccountVerificationStatus } from 'hooks/dashboard/kyc/useAccountVerificationStatus';
import { useState } from 'react';

export const ReviewAndSubmit = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useApplyForReview({
    onSuccess() {
      queryClient.invalidateQueries(['organization-information']);
    },
  });

  const { isUnderReview } = useAccountVerificationStatus();

  const [fields, setFields] = useState<Record<string, boolean>>({});

  if (isUnderReview) return <ApplicationUnderReview />;

  function handleCheckInputClick(id: string) {
    setFields((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  const isCheckInputChecked = (id: string) => fields[id] ?? false;

  return (
    <>
      <FullScreenLoader show={isLoading} />

      <h5>Review your application</h5>
      <p className='mt-1 font-normal text-neutral-400'>
        Here’s a final look at your application, make sure you have met all our
        registration requirements
      </p>

      <CheckInput
        label='Company Information'
        withBorders
        handleClick={handleCheckInputClick}
        isChecked={isCheckInputChecked}
        className='mt-6'
      />

      <CheckInput
        label='Owner Information'
        withBorders
        handleClick={handleCheckInputClick}
        isChecked={isCheckInputChecked}
        className='mt-3'
      />

      <CheckInput
        label='Business documentation'
        withBorders
        handleClick={handleCheckInputClick}
        isChecked={isCheckInputChecked}
        className='mt-3'
      />

      <CheckInput
        id='isAccurate'
        label={`I/We confirm that the information provided are accurate and truthful.`}
        handleClick={handleCheckInputClick}
        isChecked={isCheckInputChecked}
        className='mt-10'
      />

      <div className='relative mt-10 flex pb-8'>
        <SubmitButton
          submitting={isLoading}
          type='button'
          disabled={!fields['isAccurate']}
          onClick={() => {
            mutate({});
          }}
          className='dark-button min-w-[200px]'
        >
          Submit Application
        </SubmitButton>
      </div>
    </>
  );
};

export const ApplicationUnderReview = () => {
  return (
    <div className='py-10'>
      <SimpleInformation
        title={<div className='text-xl'>Verification Pending</div>}
        description={
          <span className='mt-1 block'>
            {`We're reviewing your application, this may take a while. You will be
            notified once this process has been completed.`}
          </span>
        }
        icon={<DocumentReview />}
      />
    </div>
  );
};
