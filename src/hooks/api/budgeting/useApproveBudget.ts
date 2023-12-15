import { UseMutationOptions } from '@tanstack/react-query';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { useTMutation } from 'hooks/api/useTMutation';

export interface ApproveBudgetDto {
  threshold: number | null;
  expiry: Date | null;
  pin: string;
}

export function useApproveBudget(
  id?: string,
  options?: UseMutationOptions<IBudget, unknown, void, unknown>
) {
  return useTMutation<ApproveBudgetDto, IBudget>({
    url: `/${id}/approve`,
    service: 'budgets',
    options,
  });
}
