import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useCancelBudget(
  budgetId?: string,
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation({
    method: 'put',
    url: `/${budgetId}/cancel`,
    service: 'budgets',
    options,
  });
}
