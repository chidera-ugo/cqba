import clsx from 'clsx';
import { useKycSteps } from 'hooks/kyc/useKycSteps';
import Link from 'next/link';
import { useAccountVerificationStatus } from 'hooks/dashboard/kyc/useAccountVerificationStatus';
import { Fragment } from 'react';
import { convertToUrlString } from 'utils/converters/convertToUrlString';

export const KycSteps = () => {
  const { currentTab, kycSteps } = useKycSteps();

  const {
    hasProvidedDocuments,
    hasProvidedCompanyInformation,
    hasProvidedOwnerInformationRequirements,
    isUnderReview,
  } = useAccountVerificationStatus();

  function checkIfStepCompleted(query: string) {
    const url = convertToUrlString(query);

    if (url === 'company-information' && hasProvidedCompanyInformation)
      return true;

    if (url === 'owners-information' && hasProvidedOwnerInformationRequirements)
      return true;

    if (url === 'business-documentation' && hasProvidedDocuments) return true;

    return url === 'review-and-submit' && isUnderReview;
  }

  return (
    <div>
      {kycSteps.map(({ title, description, actionText, hidden }, i) => {
        const url = convertToUrlString(title);
        const isActive = currentTab === url;
        const isCompleted = checkIfStepCompleted(title);

        if (hidden) return <Fragment key={title}></Fragment>;

        return (
          <Link
            href={`/kyc?tab=${url}`}
            key={title}
            className={clsx(
              'smooth group mt-5 block w-full py-1.5 text-left font-medium transition-colors',
              isActive ? 'text-primary-main' : 'text-neutral-1000'
            )}
          >
            <div className={clsx('my-auto mx-auto text-[10px] font-semibold')}>
              Step {i + 1}
            </div>

            <div className='my-auto mt-1 text-base font-semibold group-hover:underline'>
              {title}
            </div>

            <p className={'text-sm'}>{description}</p>

            <div className='mt-3 flex'>
              <div className={clsx(isCompleted ? 'pill_yellow' : 'pill_gray')}>
                {isCompleted ? 'Pending Verification' : actionText}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
