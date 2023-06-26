import { UseQueryOptions } from '@tanstack/react-query';
import { useTQuery } from 'hooks/api/useTQuery';
import { PaginatedResponse } from 'types/Table';
import { generateUrlParamsFromObject } from 'utils/generators/generateUrlParamsFromObject';

export interface IEmployee {
  departmentTitle?: string;
  departmentId?: string;
  organizationId?: string;
  lastName?: string;
  userId?: string;
  updatedAt?: string;
  createdAt?: string;
  status?: string;
  email?: string;
  id?: string;
  firstName?: string;
  sKey?: string;
}

export function useGetAllEmployees(
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

  return useTQuery<PaginatedResponse<IEmployee>>({
    queryKey: ['employees', _params],
    url: _params,
    service: 'employees',
    options: {
      ...options,
      staleTime: Infinity,
    },
  });
}
