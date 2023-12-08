import { SubscriptionPlan } from 'hooks/api/subscriptions/useGetAllSubscriptionPlans';
import { useTQuery } from 'hooks/api/useTQuery';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';

export interface ActiveSubscription {
  _id: string;
  plan: SubscriptionPlan;
  status: string;
  trial: boolean;
  endingAt: string;
  startedAt: string;
  renewAt: string;
}

export function useGetActiveSubscription() {
  const { isVerified } = useIsVerified();

  return useTQuery<ActiveSubscription>({
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
