import { UseQueryOptions } from '@tanstack/react-query';
import { UserRole } from 'enums/employee_enum';
import { useTQuery } from 'hooks/api/useTQuery';
import { PaginatedResponse } from 'types/Table';
import { generateUrlParamsFromObject } from 'utils/generators/generateUrlParamsFromObject';

export interface IEmployee {
  lastName: string;
  emailVerifyCode: string;
  status: EmployeeStatus;
  createdAt: number;
  email: string;
  firstName: string;
  sKey: string;
  role: UserRole;
  organizationId: string;
  userId: string;
  updatedAt: number;
  _id: string;
  phone: string;
}

export type EmployeeStatus = 'active' | 'invited' | 'deleted';

export function useGetAllEmployees(
  params: {
    page: number;
    size: number;
    status?: EmployeeStatus;
    search?: string;
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
