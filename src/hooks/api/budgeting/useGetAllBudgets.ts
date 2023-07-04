import { UseQueryOptions } from '@tanstack/react-query';
import { BudgetStatus } from 'enums/Budget';
import { useTQuery } from 'hooks/api/useTQuery';
import { PaginatedResponse } from 'types/Table';
import { generateUrlParamsFromObject } from 'utils/generators/generateUrlParamsFromObject';

interface Creator {
  lastName?: string;
  roles?: string[];
  organizationId?: string;
  createdAt?: number;
  firstName?: string;
  emailVerified?: boolean;
  password?: string;
  GSI1sKey?: string;
  GSI1pKey?: string;
  pinSet?: boolean;
  hashRt?: string;
  phone?: string;
  emailVerifyCode?: string;
  kybStatus?: string;
  sKey?: string;
  id?: string;
  email?: string;
  status?: string;
  updatedAt?: number;
}

export interface IBudget {
  departmentId: string;
  status: BudgetStatus;
  priority: string;
  createdAt: string;
  sKey: string;
  deadline: string;
  organizationId: string;
  userId: string;
  updatedAt: string;
  amount: string;
  creator?: Creator;
  categoryTitle: string;
  departmentTitle: string;
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
