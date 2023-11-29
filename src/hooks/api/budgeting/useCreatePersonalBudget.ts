import { UseMutationOptions } from '@tanstack/react-query';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgets';
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
  options?: UseMutationOptions<IBudget, unknown, void, unknown>
) {
  return useTMutation<CreatePersonalBudgetDto, IBudget>({
    url: '/transfer',
    service: 'budgets',
    options,
  });
}
