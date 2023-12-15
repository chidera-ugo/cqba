import { UseQueryOptions } from '@tanstack/react-query';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { useTQuery } from 'hooks/api/useTQuery';

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
