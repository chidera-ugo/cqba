import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export interface CreateBudgetDto {
  name: string;
  amount: number;
  threshold: number | null;
  expiry: Date | null;
  currency?: string;
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
