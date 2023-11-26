import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export interface CreatePersonalBudgetDto {
  name: string;
  amount: number;
  description: string;
  threshold: number | null;
  expiry: Date | null;
  currency?: string;
}

export function useCreatePersonalBudget(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<CreatePersonalBudgetDto, any>({
    url: '/transfer',
    service: 'budgets',
    options,
  });
}
