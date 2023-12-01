import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useCloseBudget(
  budgetId?: string,
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<{ pin: string; reason: string }, { message: string }>({
    url: `/${budgetId}/close`,
    service: 'budgets',
    options,
  });
}
