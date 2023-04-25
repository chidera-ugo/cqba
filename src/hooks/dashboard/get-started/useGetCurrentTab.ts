import { useRouter } from 'next/router';

export const useGetCurrentTab = () => {
  const { query } = useRouter();
  const currentTab = query['tab'] ?? 'company-information';

  return {
    currentTab,
  };
};
