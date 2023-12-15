import { UseMutationOptions } from '@tanstack/react-query';
import { CreateBudgetDto } from 'hooks/api/budgeting/useCreateBudget';
import { useTMutation } from 'hooks/api/useTMutation';

export interface CreateProjectDto {
  budgets: Omit<CreateBudgetDto, 'pin'>[];
  pin: string;
  name: string;
  amount: number;
  threshold: number;
  expiry: Date | null;
  currency: string;
}

export function useCreateProject(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<CreateProjectDto, null>({
    url: `/project`,
    service: 'budgets',
    options,
  });
}
