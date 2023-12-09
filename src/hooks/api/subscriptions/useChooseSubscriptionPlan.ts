import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useChooseSubscriptionPlan(
  options?: UseMutationOptions<{ message: string }, unknown, void, unknown>
) {
  return useTMutation<
    {
      plan?: string;
      months: number;
      paymentMethod: string;
    },
    any
  >({
    url: '/subscription/initiate',
    service: 'billing',
    options,
  });
}
