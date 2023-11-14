import { UseQueryOptions } from '@tanstack/react-query';
import { useTQuery } from 'hooks/api/useTQuery';
import { PaginatedResponse } from 'types/Table';
import { generateUrlParamsFromObject } from 'utils/generators/generateUrlParamsFromObject';

export interface IBudget {
  departmentId: string;
  creator: Creator;
  currentBalance: number;
  status: string;
  categoryTitle: string;
  createdAt: number;
  priority: string;
  sKey: string;
  deadline: string;
  departmentTitle: string;
  initialBalance: number;
  categoryId: string;
  organizationId: string;
  updatedAt: number;
  amount: string;
  description: string;
  id: string;
  title: string;
}

export interface Creator {
  lastName: string;
  roles: string[];
  defaultCategoryIds: string[];
  organizationId: string;
  createdAt: number;
  firstName: string;
  emailVerified: boolean;
  password: string;
  GSI1sKey: string;
  GSI1pKey: string;
  pinSet: boolean;
  hashRt: string;
  phone: string;
  emailVerifyCode: string;
  kybStatus: string;
  sKey: string;
  id: string;
  email: string;
  status: string;
  updatedAt: number;
}

export function useGetAllBudgets(
  params: {
    page: number;
    size: number;
    search?: string;
    departmentId?: string;
    status?: string;
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
