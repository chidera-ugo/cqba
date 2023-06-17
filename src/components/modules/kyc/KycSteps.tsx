import clsx from 'clsx';
import { useKycSteps } from 'hooks/kyc/useKycSteps';
import { useRouter } from 'next/router';
import { SolidCheck } from 'components/svgs/others/Check';
import { useAppContext } from 'context/AppContext';
import { AgnosticCustomSelect } from 'components/form-elements/CustomSelect/AgnosticCustomSelect';
import { useAccountVerificationStatus } from 'hooks/dashboard/kyc/useAccountVerificationStatus';
import { convertToUrlString } from 'utils/converters/convertToUrlString';

export const KycSteps = () => {
  const { currentTab, kycSteps } = useKycSteps();
  const { push } = useRouter();

  const { screenSize } = useAppContext().state;

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

    if (url === 'review-and-submit' && isUnderReview) return true;

    return false;
  }

  if (screenSize?.['miniTablet']) {
    return (
      <div className='mt-3 block 768:hidden'>
        <AgnosticCustomSelect
          noSearch
          disableSorting
          entity='get-started-steps'
          minimalist
          dropdownClassname='mt-2 bg-white'
          trueValueKey='id'
          displayValueKey='name'
          convertOptionsToObjectArray
          dropdownInMobileView
          id='get-started-steps'
          options={kycSteps}
          className='w-full'
          onSelect={(option) => {
            push(`/get-started?tab=${option}`);
          }}
          defaultOption={{
            name: kycSteps.find(
              (step) => convertToUrlString(step) === currentTab
            ),
            id: currentTab,
          }}
          renderer={(option: string, i: number, plainStyling?: boolean) => {
            const isActive = currentTab === convertToUrlString(option);
            const isCompleted = checkIfStepCompleted(option);

            return (
              <div
                className={clsx(
                  'smooth my-auto flex text-left font-medium transition-colors',
                  plainStyling
                    ? 'text-neutral-500'
                    : isActive
                    ? 'text-primary-main'
                    : isCompleted
                    ? 'text-neutral-1000'
                    : 'text-neutral-400 hover:text-neutral-500'
                )}
              >
                {!plainStyling && isCompleted ? (
                  <div className='y-center my-auto mr-2 h-5 w-5'>
                    <div className='mx-auto'>
                      <SolidCheck />
                    </div>
                  </div>
                ) : (
                  <div className='y-center my-auto mr-2 h-5 w-5'>
                    <div
                      className={clsx(
                        'y-center my-auto mx-auto h-4 w-4 rounded-full border-[1.5px] text-center text-[10px] font-semibold',
                        plainStyling
                          ? 'border-neutral-500'
                          : isActive
                          ? 'border-primary-main'
                          : 'border-neutral-400'
                      )}
                    >
                      {i + 1}
                    </div>
                  </div>
                )}
                <div className='my-auto'>{option}</div>
              </div>
            );
          }}
        />
      </div>
    );
  }

  return (
    <div className='mt-5 hidden 768:block'>
      {kycSteps.map((step, i) => {
        const url = convertToUrlString(step);
        const isActive = currentTab === url;
        const isCompleted = checkIfStepCompleted(step);

        return (
          <button
            onClick={() => {
              if (url === currentTab) return;
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
                <div className='mx-auto'>
                  <SolidCheck />
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
