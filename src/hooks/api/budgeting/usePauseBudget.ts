import { UseMutationOptions } from '@tanstack/react-query';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgets';
import { useTMutation } from 'hooks/api/useTMutation';

export function usePauseBudget(
  budgetId: string,
  options?: UseMutationOptions<IBudget, unknown, void, unknown>
) {
  return useTMutation<{ pin: string; pause: boolean }, IBudget>({
    url: `/${budgetId}/pause`,
    service: 'budgets',
    options,
  });
}
