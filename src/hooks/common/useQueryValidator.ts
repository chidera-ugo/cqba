import { useRouter } from 'next/router';

export const useQueryValidator = () => {
  const { query } = useRouter();

  function validateQuery(queryKey: string) {
    const _queryValue = query[queryKey];

    return typeof _queryValue === 'string' ? _queryValue : '';
  }

  return {
    validateQuery,
  };
};
