import { UseMutationOptions } from '@tanstack/react-query';
import { BudgetPriorities } from 'enums/budget';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { useTMutation } from 'hooks/api/useTMutation';

export interface CreateBudgetDto {
  beneficiaries: Beneficiary[];
  pin: string;
  name: string;
  description: string;
  amount: number;
  threshold: number;
  expiry: Date | null;
  currency?: string;
  priority?: BudgetPriorities;
}

export interface Beneficiary {
  user: string;
  allocation: number;
}

export function useCreateBudget(
  id?: string,
  projectId?: string,
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<CreateBudgetDto, IBudget>({
    method: !!id ? 'put' : 'post',
    url: projectId
      ? `/project/${projectId}/sub-budget`
      : `${!!id ? `/${id}` : ''}`,
    service: 'budgets',
    options,
  });
}
