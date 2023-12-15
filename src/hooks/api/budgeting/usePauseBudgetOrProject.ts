import { UseMutationOptions } from '@tanstack/react-query';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { useTMutation } from 'hooks/api/useTMutation';

export function usePauseBudgetOrProject(
  budgetId: string,
  isProject?: boolean,
  options?: UseMutationOptions<IBudget, unknown, void, unknown>
) {
  return useTMutation<{ pin: string; pause: boolean }, IBudget>({
    url: `/${isProject ? 'project/' : ''}${budgetId}/pause`,
    service: 'budgets',
    options,
  });
}
