import { useRouter } from 'next/router';
import { getValidQueryParam } from 'utils/getters/getValidQueryParam';

export const useQueryParamManagedState = (
  filters: { name: string; value: string }[],
  url: string
) => {
  const { query, replace } = useRouter();

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
    currentTab: getFilterFromQueryParam(),
  };
};
