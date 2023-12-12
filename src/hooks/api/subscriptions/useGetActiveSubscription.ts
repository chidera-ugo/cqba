import { SubscriptionPlan } from 'hooks/api/subscriptions/useGetAllSubscriptionPlans';
import { useTQuery } from 'hooks/api/useTQuery';

export interface ActiveSubscription {
  _id: string;
  plan: SubscriptionPlan;
  status: string;
  trial: boolean;
  endingAt: string;
  startedAt: string;
  renewAt: string;
  meta: {
    months: number;
  };
}

export function useGetActiveSubscription() {
  return useTQuery<ActiveSubscription>({
    queryKey: ['current_subscription_plan'],
    url: `/subscription`,
    service: 'billing',
    options: {
      staleTime: Infinity,
      meta: {
        silent: true,
      },
    },
  });
}
