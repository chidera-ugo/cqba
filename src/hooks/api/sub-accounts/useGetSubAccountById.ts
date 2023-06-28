import { UseQueryOptions } from '@tanstack/react-query';
import { ISubAccount } from 'hooks/api/sub-accounts/useGetAllSubAccounts';
import { useTQuery } from 'hooks/api/useTQuery';

export function useGetSubAccountById(
  accountId: string,
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return useTQuery<ISubAccount>({
    queryKey: ['sub-account', accountId],
    url: `/${accountId}`,
    service: 'sub-accounts',
    options,
  });
}
