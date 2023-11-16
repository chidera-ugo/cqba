import { useQueryClient } from '@tanstack/react-query';
import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { CheckInput } from 'components/form-elements/CheckInput';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { Clock } from 'components/illustrations/Clock';
import { SimpleInformation } from 'components/modules/common/SimpleInformation';
import { useApplyForReview } from 'hooks/api/kyc/useApplyForReview';
import { useAccountVerificationStatus } from 'hooks/dashboard/kyc/useAccountVerificationStatus';
import { useRouter } from 'next/router';
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

      <p className={'mt-5 text-sm'}>
        I/We confirm that the information provided are accurate and truthful.
      </p>

      <div className='relative mt-7 flex pb-8'>
        <SubmitButton
          submitting={isLoading}
          type='button'
          onClick={() => {
            mutate({});
          }}
          className='primary-button min-w-[170px]'
        >
          Submit Application
        </SubmitButton>
      </div>
    </>
  );
};

export const ApplicationUnderReview = () => {
  const { push } = useRouter();

  return (
    <div className='py-10'>
      <SimpleInformation
        title={`Thank you! We are verifying your business information`}
        description={
          <span className='mt-4 block'>
            {`We can't wait to get you started. If everything is fine, you'll be verified and notified via email within the next 48 hours.`}
          </span>
        }
        actionButton={{
          text: 'Back to Home',
          action: () => push('/'),
        }}
        icon={<Clock />}
      />
    </div>
  );
};
