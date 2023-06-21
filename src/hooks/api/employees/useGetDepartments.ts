import { UseQueryOptions } from '@tanstack/react-query';
import { useTQuery } from 'hooks/api/useTQuery';
import { PaginatedResponse } from 'types/Table';

export interface IDepartment {
  organizationId?: string;
  userId?: string;
  updatedAt?: number;
  id?: string;
  sKey?: string;
  title?: string;
}

export function useGetDepartments(
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return useTQuery<PaginatedResponse<IDepartment>>({
    queryKey: ['departments'],
    url: '?page=0&size=20',
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
