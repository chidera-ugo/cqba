import { useRouter } from 'next/router';

export const useQueryValidator = () => {
  const { query, replace } = useRouter();

  function getValidQuery(queryKey: string) {
    const _queryValue = query[queryKey];

    return typeof _queryValue === 'string' ? _queryValue : '';
  }

  return {
    getValidQuery,
    replace,
  };
};
