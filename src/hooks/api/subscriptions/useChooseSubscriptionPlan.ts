import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

interface Res {
  status: 'pending' | 'successful';
  message: string;
  amount: number;
  reference: string;
  intent: string;
}

export function useChooseSubscriptionPlan(
  options?: UseMutationOptions<Res, unknown, void, unknown>
) {
  return useTMutation<
    {
      plan?: string;
      months: number;
      paymentMethod: string;
    },
    Res
  >({
    url: '/subscription/initiate',
    service: 'billing',
    options,
  });
}
