import { UseQueryOptions } from '@tanstack/react-query';
import { useTQuery } from 'hooks/api/useTQuery';

export const useGetOrder = (
  id: string,
  options?: UseQueryOptions<any, any, any, string[]>
) => {
  return useTQuery({
    queryKey: ['order', id],
    url: `/order/${id}`,
    options,
  });
};
