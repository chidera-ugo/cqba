import { UseQueryOptions } from '@tanstack/react-query';
import { useTQuery } from 'hooks/api/useTQuery';
import { PaginatedResponse } from 'types/Table';
import { generateUrlParamsFromObject } from 'utils/generators/generateUrlParamsFromObject';

export interface ISubAccountsDepartment {
  organizationId?: string;
  userId?: string;
  updatedAt?: number;
  createdAt?: number;
  id?: string;
  sKey?: string;
  title?: string;
  employeeCount?: number;
  activeBudgetCount?: number;
}

export function useGetEmployeesByDepartment(
  params?: {
    page: number;
    size: number;
    search?: string;
  },
  options?: UseQueryOptions<any, any, any, string[]>
) {
  const _params = generateUrlParamsFromObject({ data: params });

  return useTQuery<PaginatedResponse<ISubAccountsDepartment>>({
    queryKey: ['employees-by-department'],
    url: `/subAccount/no-balance${_params}`,
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
