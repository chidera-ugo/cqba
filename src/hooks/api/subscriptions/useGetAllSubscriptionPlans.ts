import { useTQuery } from 'hooks/api/useTQuery';

export interface SubscriptionPlan {
  _id: string;
  code: string;
  name: string;
  amount: Amount;
  description: string;
  features: PlanFeature[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Amount {
  NGN: number;
}

export interface PlanFeature {
  code: string;
  name: string;
  description: string;
  freeUnits: number;
  available: boolean;
  maxUnits: number;
  costPerUnit: Amount;
}

export function useGetAllSubscriptionPlans() {
  return useTQuery<SubscriptionPlan[]>({
    queryKey: ['all_plans'],
    url: `/plans`,
    service: 'billing',
    options: {
      staleTime: Infinity,
      meta: {
        silent: true,
      },
    },
  });
}
