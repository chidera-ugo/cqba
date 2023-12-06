import { useTQuery } from 'hooks/api/useTQuery';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';

export function useGetActiveSubscription() {
  const { isVerified } = useIsVerified();

  return useTQuery<any>({
    queryKey: ['current_subscription_plan'],
    url: `/subscription`,
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
