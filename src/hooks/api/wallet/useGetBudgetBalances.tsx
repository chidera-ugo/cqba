import { UseQueryOptions } from '@tanstack/react-query';
import { useTQuery } from 'hooks/api/useTQuery';

export function useGetBudgetBalances(
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return useTQuery<{ currency: string; balance: number }[]>({
    queryKey: ['budget_balances'],
    url: `/balances`,
    service: 'budgets',
    options: {
      ...options,
      staleTime: Infinity,
      meta: {
        silent: true,
      },
    },
  });
}
