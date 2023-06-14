import { kycSteps } from 'components/modules/kyc/KycSteps';
import { useRouter } from 'next/router';
import { convertToUrlString } from 'utils/converters/convertToUrlString';

export const useGetCurrentTab = () => {
  const { query, replace } = useRouter();
  const currentTab = query['tab'] ?? 'company-information';

  function next() {
    const indexOfCurrentStep = kycSteps.indexOf(
      kycSteps.find((step) => convertToUrlString(step) === currentTab)!
    );

    const nextTab = convertToUrlString(kycSteps[indexOfCurrentStep + 1] ?? '');

    if (!nextTab) return;
    replace(`/get-started?tab=${nextTab}`);
  }

  return {
    currentTab,
    next,
  };
};
