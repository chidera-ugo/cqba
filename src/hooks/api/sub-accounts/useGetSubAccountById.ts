import { UseQueryOptions } from '@tanstack/react-query';
import { useTQuery } from 'hooks/api/useTQuery';

export function useGetSubAccountById(
  accountId: string,
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return useTQuery<any>({
    queryKey: ['sub-account', accountId],
    url: `/${accountId}`,
    service: 'sub-accounts',
    options,
  });
}
