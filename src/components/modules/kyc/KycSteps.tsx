import clsx from 'clsx';
import { useKycSteps } from 'hooks/kyc/useKycSteps';
import { useRouter } from 'next/router';
import { SolidCheck } from 'components/svgs/others/Check';
import { useAccountVerificationStatus } from 'hooks/dashboard/kyc/useAccountVerificationStatus';
import { convertToUrlString } from 'utils/converters/convertToUrlString';

export const KycSteps = () => {
  const { currentTab, kycSteps } = useKycSteps();
  const { push } = useRouter();

  const {
    hasProvidedDocuments,
    hasProvidedCompanyInformation,
    hasProvidedOwnerInformationRequirements,
    isUnderReview,
  } = useAccountVerificationStatus();

  function checkIfStepCompleted(query: string) {
    const url = convertToUrlString(query);

    if (url === 'create-account') return true;

    if (url === 'company-information' && hasProvidedCompanyInformation)
      return true;

    if (url === 'owner-information' && hasProvidedOwnerInformationRequirements)
      return true;

    if (url === 'business-documentation' && hasProvidedDocuments) return true;

    return url === 'review-and-submit' && isUnderReview;
  }

  return (
    <div className='mt-5'>
      {kycSteps.map((step, i) => {
        const url = convertToUrlString(step);
        const isActive = currentTab === url;
        const isCompleted = checkIfStepCompleted(step);

        return (
          <button
            onClick={() => {
              push(`/kyc?tab=${url}`);
            }}
            key={step}
            className={clsx(
              'smooth flex py-1.5 text-left font-medium transition-colors',
              isActive
                ? 'text-primary-main'
                : isCompleted
                ? 'text-neutral-1000'
                : 'text-neutral-400 hover:text-neutral-1000'
            )}
          >
            {isCompleted ? (
              <div className='y-center my-auto mr-2 h-5 w-5'>
                <div className='mx-auto text-primary-main'>
                  <SolidCheck className={'h-[20px] w-[20px]'} />
                </div>
              </div>
            ) : (
              <div className='y-center my-auto mr-2 h-5 w-5'>
                <div
                  className={clsx(
                    'y-center my-auto mx-auto h-4 w-4 rounded-full border-[1.5px] text-center text-[10px] font-semibold',
                    isActive ? 'border-primary-main' : 'border-neutral-400'
                  )}
                >
                  {i + 1}
                </div>
              </div>
            )}
            <div className='my-auto'>{step}</div>
          </button>
        );
      })}
    </div>
  );
};
