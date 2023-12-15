import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useCloseBudgetOrProject(
  budgetId?: string,
  isProject?: boolean,
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<{ pin: string; reason: string }, { message: string }>({
    url: `/${isProject ? 'project/' : ''}${budgetId}/close`,
    service: 'budgets',
    options,
  });
}
