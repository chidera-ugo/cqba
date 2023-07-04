import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getValidQueryParam } from 'utils/getters/getValidQueryParam';

export const useQueryParamManagedState = (
  filters: { name: string; value: string }[],
  url: string
) => {
  const { query, replace } = useRouter();

  const [currentTab, setCurrentTab] = useState<{ name: string; value: string }>(
    getFilterFromQueryParam()
  );

  useEffect(() => {
    if (!query['_t']) return;

    setCurrentTab(getFilterFromQueryParam());
  }, [query['_t']]);

  function getFilterFromQueryParam() {
    const tab = getValidQueryParam(query['_t']);

    if (!tab) return filters[0]!;

    const existingStatus = filters.find(({ value }) => value === tab);

    if (!existingStatus) {
      replace(url);
      return filters[0]!;
    }

    return existingStatus;
  }

  return {
    currentTab,
    setCurrentTab,
  };
};
