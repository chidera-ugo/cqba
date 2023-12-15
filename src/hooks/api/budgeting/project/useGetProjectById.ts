import { UseQueryOptions } from '@tanstack/react-query';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { useTQuery } from 'hooks/api/useTQuery';

export interface IProject {
  _id: string;
  balance: number;
  organization: string;
  wallet: string;
  status: string;
  currency: string;
  amount: number;
  name: string;
  threshold: number;
  paused: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  budgets: IBudget[];
  totalSpent: number;
  allocatedAmount: number;
  unallocatedAmount: number;
}

export function useGetProjectById(
  id: string,
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return useTQuery<IProject>({
    queryKey: ['project', id],
    url: `/project/${id}`,
    service: 'budgets',
    options: {
      ...options,
      meta: { silent: true },
    },
  });
}
