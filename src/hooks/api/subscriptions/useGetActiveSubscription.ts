import { useAppContext } from 'context/AppContext';
import { SubscriptionPlan } from 'hooks/api/subscriptions/useGetAllSubscriptionPlans';
import { SubscriptionStatus } from 'hooks/api/subscriptions/useGetSubscriptionHistory';
import { useTQuery } from 'hooks/api/useTQuery';

export interface ActiveSubscription {
  _id: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  trial: boolean;
  endingAt: string;
  startedAt: string;
  renewAt: string;
  meta: {
    months: number;
  };
}

export function useGetActiveSubscription() {
  const { user } = useAppContext().state;

  return useTQuery<ActiveSubscription>({
    queryKey: ['current_subscription_plan'],
    url: `/subscription`,
    service: 'billing',
    options: {
      staleTime: Infinity,
      enabled: !!user?.organization,
      meta: {
        silent: true,
      },
    },
  });
}
