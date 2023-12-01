import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function usePauseBudget(
  budgetId: string,
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<{ pin: string }, null>({
    url: `/${budgetId}/pause`,
    service: 'budgets',
    options,
  });
}
