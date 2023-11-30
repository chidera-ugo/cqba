import { UseMutationOptions } from '@tanstack/react-query';
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
}

export interface Beneficiary {
  user: string;
  allocation: number;
}

export function useCreateBudget(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<CreateBudgetDto, any>({
    url: '',
    service: 'budgets',
    options,
  });
}
