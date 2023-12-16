import { UseQueryOptions } from '@tanstack/react-query';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { useTQuery } from 'hooks/api/useTQuery';
import { useTMutation } from 'hooks/api/useTMutation';
import { UseMutationOptions } from '@tanstack/react-query';

export function useGetDebitableBudgets(
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return useTQuery<IBudget[]>({
    queryKey: ['debitable_budgets'],
    url: `/beneficiary`,
    service: 'budgets',
    options: {
      ...options,
      meta: { silent: true },
    },
  });
}

export function useGetDebitableBudgetsByMutation(
  options?: UseMutationOptions<IBudget[], unknown, void, unknown>
) {
  return useTMutation({
    method: 'get',
    url: `/beneficiary`,
    service: 'budgets',
    options,
  });
}
