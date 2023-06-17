import { useRouter } from 'next/router';
import { convertToUrlString } from 'utils/converters/convertToUrlString';

export const useKycSteps = () => {
  const { query, replace } = useRouter();
  const _t = query['tab'];
  const currentTab = typeof _t === 'string' ? _t : 'company-information';

  const accountSetupSteps = [
    'Create account',
    'Company information',
    'Owner information',
    'Business documentation',
    'Review and submit',
  ];

  const isValidAccountSetupStep = accountSetupSteps
    .map((step) => convertToUrlString(step))
    .includes(currentTab);

  function goToNextAccountSetupStep() {
    const indexOfCurrentStep = accountSetupSteps.indexOf(
      accountSetupSteps.find((step) => convertToUrlString(step) === currentTab)!
    );

    const nextTab = convertToUrlString(
      accountSetupSteps[indexOfCurrentStep + 1] ?? ''
    );

    if (!nextTab) return;
    replace(`/kyc?tab=${nextTab}`);
  }

  return {
    currentTab,
    isValidAccountSetupStep,
    goToNextAccountSetupStep,
    kycSteps: accountSetupSteps,
  };
};
