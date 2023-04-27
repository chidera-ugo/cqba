import { getStartedSteps } from 'components/modules/get-started/GetStartedSteps';
import { useRouter } from 'next/router';
import { convertToUrlString } from 'utils/helpers/convertToUrlString';

export const useGetCurrentTab = () => {
  const { query, replace } = useRouter();
  const currentTab = query['tab'] ?? 'company-information';

  function next() {
    const indexOfCurrentStep = getStartedSteps.indexOf(
      getStartedSteps.find((step) => convertToUrlString(step) === currentTab)!
    );

    const nextTab = convertToUrlString(
      getStartedSteps[indexOfCurrentStep + 1] ?? ''
    );

    console.log(nextTab);

    if (!nextTab) return;
    replace(`/get-started?tab=${nextTab}`);
  }

  return {
    currentTab,
    next,
  };
};
