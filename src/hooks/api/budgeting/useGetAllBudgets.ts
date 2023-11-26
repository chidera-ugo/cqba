import { UseQueryOptions } from '@tanstack/react-query';
import { useTQuery } from 'hooks/api/useTQuery';
import { PaginatedResponse } from 'types/Table';
import { generateUrlParamsFromObject } from 'utils/generators/generateUrlParamsFromObject';

export interface IBudget {
  _id: string;
  description: string;
  status: string;
  currency: string;
  amount: number;
  expiry: string;
  name: string;
  threshold: number;
  paused: boolean;
  beneficiaries: {
    email: string;
  }[];
  spentAmount: number;
  availableAmount: number;
}

export function useGetAllBudgets(
  params: {
    page?: number;
    size?: number;
    search?: string;
    departmentId?: string;
    status?: string;
    paginated?: boolean;
  },
  options?: UseQueryOptions<any, any, any, string[]>
) {
  const _params = generateUrlParamsFromObject({
    data: params,
  });

  return useTQuery<PaginatedResponse<IBudget>>({
    queryKey: ['budgets', _params],
    url: _params,
    service: 'budgets',
    options: {
      ...options,
      meta: { silent: true },
      staleTime: Infinity,
    },
  });
}

export function useGetAllBudgetsUnpaginated(
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return useTQuery<PaginatedResponse<IBudget>>({
    queryKey: ['budgets', 'unpaginated'],
    url: `?paginated=false`,
    service: 'budgets',
    options: {
      ...options,
      meta: { silent: true },
      staleTime: Infinity,
    },
  });
}
