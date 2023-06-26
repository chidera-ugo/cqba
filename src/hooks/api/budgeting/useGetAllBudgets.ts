import { UseQueryOptions } from '@tanstack/react-query';
import { useTQuery } from 'hooks/api/useTQuery';
import { PaginatedResponse } from 'types/Table';
import { generateUrlParamsFromObject } from 'utils/generators/generateUrlParamsFromObject';

export interface IBudget {
  departmentId: string;
  status: string;
  priority: string;
  createdAt: string;
  sKey: string;
  deadline: string;
  organizationId: string;
  userId: string;
  updatedAt: string;
  amount: string;
  description: string;
  id: string;
  title: string;
}

export function useGetAllBudgets(
  params: {
    page: number;
    size: number;
    search?: string;
    departmentId?: string;
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
      staleTime: Infinity,
    },
  });
}
