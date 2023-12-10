import { UseQueryOptions } from '@tanstack/react-query';
import { BudgetStatus } from 'enums/budget';
import { UserRole } from 'enums/employee_enum';
import { useTQuery } from 'hooks/api/useTQuery';
import { PaginatedResponse } from 'types/Table';
import { generateUrlParamsFromObject } from 'utils/generators/generateUrlParamsFromObject';

export interface IBudget {
  _id: string;
  description: string;
  status: BudgetStatus;
  currency: string;
  amount: number;
  expiry: string;
  name: string;
  priority: number;
  threshold: number;
  paused: boolean;
  beneficiaries: {
    email: string;
  }[];
  approvedDate?: string;
  approvedBy?: {
    email: string;
    role: UserRole;
  };
  amountUsed: number;
  availableAmount: number;
}

export function useGetAllBudgets(
  params: {
    page?: number;
    limit?: number;
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
    },
  });
}

export function useGetAllBudgetsUnpaginated(
  status?: string,
  options?: UseQueryOptions<any, any, any, string[]>
) {
  const _status = !status ? 'active' : status;

  return useTQuery<PaginatedResponse<IBudget>>({
    queryKey: ['budgets', 'unpaginated', _status],
    url: `?paginated=false&status=${_status}`,
    service: 'budgets',
    options: {
      ...options,
      meta: { silent: true },
      staleTime: Infinity,
    },
  });
}
