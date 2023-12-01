import { UseMutationOptions } from '@tanstack/react-query';
import { BudgetPriorities } from 'enums/budget';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgets';
import { useTMutation } from 'hooks/api/useTMutation';

export interface CreateBudgetDto {
  beneficiaries: Beneficiary[];
  pin: string;
  name: string;
  description: string;
  amount: number;
  threshold: number;
  expiry: Date | null;
  currency: string;
  priority?: string;
}

export interface Beneficiary {
  user: string;
  allocation: number;
}

export function useCreateBudget(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<CreateBudgetDto, IBudget>({
    url: '',
    service: 'budgets',
    options,
  });
}
