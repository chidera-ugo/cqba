import { UseQueryOptions } from '@tanstack/react-query';
import { useTQuery } from 'hooks/api/useTQuery';
import { PaginatedResponse } from 'types/Table';
import { generateUrlParamsFromObject } from 'utils/generators/generateUrlParamsFromObject';

export interface IDepartment {
  organizationId?: string;
  userId?: string;
  updatedAt?: number;
  id?: string;
  sKey?: string;
  title?: string;
}

export function useGetDepartments(
  params?: {
    page: number;
    size: number;
    search?: string;
  },
  options?: UseQueryOptions<any, any, any, string[]>
) {
  const _params = generateUrlParamsFromObject({ data: params });

  return useTQuery<PaginatedResponse<IDepartment>>({
    queryKey: ['departments'],
    url: !params ? `?page=0&size=20` : _params,
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
