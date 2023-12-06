import { useTQuery } from 'hooks/api/useTQuery';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { PaginatedResponse } from 'types/Table';

export function useGetSubscriptionHistory() {
  const { isVerified } = useIsVerified();

  return useTQuery<PaginatedResponse<any>>({
    queryKey: ['subscription_history'],
    url: `/subscription/history`,
    service: 'billing',
    options: {
      staleTime: Infinity,
      meta: {
        silent: true,
        enabled: isVerified,
      },
    },
  });
}
