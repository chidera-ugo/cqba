import clsx from 'clsx';
import { Spinner } from 'components/svgs/dashboard/Spinner';
import {
  CompletedStepCheck,
  NotProvidedUnchecked,
} from 'components/svgs/kyc/StepsCompletion';
import { useKycSteps } from 'hooks/kyc/useKycSteps';
import { useAccountVerificationStatus } from 'hooks/dashboard/kyc/useAccountVerificationStatus';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { convertToUrlString } from 'utils/converters/convertToUrlString';

export const KycSteps = ({ isRecap }: { isRecap?: boolean }) => {
  const { currentTab, kycSteps } = useKycSteps();

  const { push } = useRouter();

  const {
    hasProvidedDocuments,
    hasProvidedCompanyInformation,
    hasProvidedOwnerInformationRequirements,
    isUnderReviewOrApproved,
    refetchingOrganization,
  } = useAccountVerificationStatus();

  function checkIfStepCompleted(query: string) {
    const url = convertToUrlString(query);

    if (url === 'company-information' && hasProvidedCompanyInformation)
      return true;

    if (url === 'owners-information' && hasProvidedOwnerInformationRequirements)
      return true;

    if (url === 'business-documentation' && hasProvidedDocuments) return true;

    return url === 'review-and-submit' && isUnderReviewOrApproved;
  }

  return (
    <div className={'mt-10'}>
      {kycSteps.map(({ label, title, dependency, description, hidden }) => {
        const url = convertToUrlString(title);
        const isActive = currentTab === url;
        const isCompleted = checkIfStepCompleted(title);

        if (hidden) return <Fragment key={title}></Fragment>;

        const isDisabled =
          dependency === 'COMPANY_INFORMATION' &&
          !hasProvidedCompanyInformation;

        return (
          <button
            onClick={() => {
              if (isDisabled || isUnderReviewOrApproved) return;

              push(`/kyc?tab=${url}&showSteps=false`);
            }}
            disabled={isDisabled}
            key={title}
            className={clsx(
              'smooth x-between group mt-4 w-full border border-neutral-140 text-left font-medium transition-colors',
              isActive ? '768:text-primary-main' : 'text-neutral-1000',
              isRecap ? 'rounded-[10px] p-6' : 'rounded-xl px-4 py-3'
            )}
          >
            <div className={'my-auto'}>
              <div
                className={clsx(
                  'my-auto',
                  !isDisabled && 'group-hover:text-primary-main',
                  isRecap ? 'text-base font-medium' : 'text-base font-semibold'
                )}
              >
                {label}
              </div>
              {!isRecap && <p className={'text-[13px]'}>{description}</p>}
            </div>

            {isRecap ? (
              <div className='pill_gray my-auto'>View</div>
            ) : (
              <div className={'my-auto'}>
                {isCompleted ? (
                  <CompletedStepCheck />
                ) : refetchingOrganization ? (
                  <Spinner className={'text-primary-main'} />
                ) : (
                  <NotProvidedUnchecked />
                )}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};
