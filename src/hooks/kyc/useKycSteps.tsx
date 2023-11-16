import { useRouter } from 'next/router';
import { convertToUrlString } from 'utils/converters/convertToUrlString';

export const useKycSteps = () => {
  const { query, replace } = useRouter();
  const _t = query['tab'];
  const currentTab = typeof _t === 'string' ? _t : 'company-information';

  const accountSetupSteps: {
    title: string;
    description: string;
    actionText: string;
    hidden?: boolean;
  }[] = [
    {
      title: 'Company Information',
      description: 'Complete your company information',
      actionText: 'Verify Company',
    },
    {
      title: "Owners' Information",
      description: 'Submit business owners information',
      actionText: 'Verify Owners',
    },
    {
      title: 'Business Documentation',
      description: 'Upload business documents for verification',
      actionText: 'Upload Documents',
    },
    {
      title: 'Review and Submit',
      description: "Review all the information you're provided",
      actionText: 'Review and Submit',
      hidden: true,
    },
  ];

  const isValidAccountSetupStep = accountSetupSteps
    .map((step) => convertToUrlString(step.title))
    .includes(currentTab);

  function goToNextAccountSetupStep() {
    const indexOfCurrentStep = accountSetupSteps.indexOf(
      accountSetupSteps.find(
        (step) => convertToUrlString(step.title) === currentTab
      )!
    );

    const nextTab = convertToUrlString(
      accountSetupSteps[indexOfCurrentStep + 1]?.title ?? ''
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
