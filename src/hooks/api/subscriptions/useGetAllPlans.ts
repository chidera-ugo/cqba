import { useTQuery } from 'hooks/api/useTQuery';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';

export interface Plan {
  _id: string;
  code: string;
  name: string;
  amount: Amount;
  description: string;
  features: Feature[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Amount {
  NGN: number;
}

export interface Feature {
  code: string;
  name: string;
  description: string;
  freeUnits: number;
  available: boolean;
  maxUnits: number;
  costPerUnit: number;
}

export function useGetAllPlans() {
  const { isVerified } = useIsVerified();

  return useTQuery<Plan[]>({
    queryKey: ['all_plans'],
    url: `/plans`,
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
