import { useTQuery } from 'hooks/api/useTQuery';
import { PaginatedResponse } from 'types/Table';

export enum SubscriptionStatus {
  Active = 'active',
  Expired = 'expired',
  RenewalFailed = 'renewal_failed',
}

export interface SubscriptionHistory {
  _id: string;
  plan: Plan;
  status: SubscriptionStatus;
  trial: boolean;
  endingAt: string;
  startedAt: string;
  renewAt: string;
}

interface Plan {
  _id: string;
  name: string;
}

export function useGetSubscriptionHistory() {
  return useTQuery<PaginatedResponse<SubscriptionHistory>>({
    queryKey: ['subscription_history'],
    url: `/subscription/history`,
    service: 'billing',
    options: {
      staleTime: Infinity,
      meta: {
        silent: true,
      },
    },
  });
}
