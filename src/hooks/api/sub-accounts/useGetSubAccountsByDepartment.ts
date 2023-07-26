import { UseQueryOptions } from '@tanstack/react-query';
import { useTQuery } from 'hooks/api/useTQuery';
import { PaginatedResponse } from 'types/Table';
import { generateUrlParamsFromObject } from 'utils/generators/generateUrlParamsFromObject';

export interface ISubAccountsDepartment {
  organizationId: string;
  userId: string;
  updatedAt: number;
  createdAt: number;
  id: string;
  sKey: string;
  title: string;
  employeeCount: number;
  activeBudgetCount: number;
  balance?: number;
}

export function useGetSubAccountsByDepartment(
  params?: {
    page: number;
    size: number;
    search?: string;
  },
  options?: UseQueryOptions<any, any, any, string[]>
) {
  const _params = generateUrlParamsFromObject({ data: params });

  return useTQuery<PaginatedResponse<ISubAccountsDepartment>>({
    queryKey: ['sub-accounts-by-department'],
    url: `/subAccount${_params}`,
    service: 'departments',
    options: {
      ...options,
      meta: {
        silent: true,
      },
      staleTime: Infinity,
    },
  });
}
