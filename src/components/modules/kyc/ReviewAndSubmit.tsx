import { SubmitButton } from 'components/form-elements/SubmitButton';
import { ApplicationUnderReview } from 'components/modules/kyc/ApplicationUnderReview';
import { KycSteps } from 'components/modules/kyc/KycSteps';
import { useApplyForReview } from 'hooks/api/kyc/useApplyForReview';
import { useQueryInvalidator } from 'hooks/app/useQueryInvalidator';
import { useAccountVerificationStatus } from 'hooks/dashboard/kyc/useAccountVerificationStatus';
import Link from 'next/link';
import { useState } from 'react';

export const ReviewAndSubmit = () => {
  const { invalidate } = useQueryInvalidator();

  const [submitted, setSubmitted] = useState(false);

  const { isLoading, mutate } = useApplyForReview({
    onSuccess() {
      setSubmitted(true);
      invalidate('organization');
    },
  });

  const { isUnderReviewOrApproved } = useAccountVerificationStatus();

  if (submitted || isUnderReviewOrApproved) return <ApplicationUnderReview />;

  return (
    <>
      <h5>Application Recap</h5>
      <p className='mt-2 text-neutral-500'>
        Make sure the information you submit here is accurate. Incomplete
        information or documentation can delay the activation of your business.{' '}
      </p>

      <KycSteps isRecap />

      <div className={'mt-7 pb-8'}>
        <div className='relative flex'>
          <SubmitButton
            submitting={isLoading}
            type='button'
            onClick={() => {
              mutate(null);
            }}
            className='primary-button w-full min-w-[170px] 640:w-min'
          >
            Submit Application
          </SubmitButton>
        </div>

        <Link
          href={'/kyc?tab=review-and-submit&showSteps=true'}
          className='x-center mx-auto mt-4 flex w-full py-2 text-center text-sm font-medium 640:hidden'
        >
          Make Changes
        </Link>
      </div>
    </>
  );
};
