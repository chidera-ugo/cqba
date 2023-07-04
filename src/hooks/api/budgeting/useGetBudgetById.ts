import { UseQueryOptions } from '@tanstack/react-query';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgets';
import { useTQuery } from 'hooks/api/useTQuery';

export function useGetBudgetById(
  id: string,
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return useTQuery<IBudget>({
    queryKey: ['budget', id],
    url: `/${id}`,
    service: 'budgets',
    options: {
      ...options,
      meta: { silent: true },
    },
  });
}
