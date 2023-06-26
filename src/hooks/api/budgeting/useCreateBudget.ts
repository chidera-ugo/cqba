import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export interface CreateBudgetDto {
  title: string;
  amount: string;
  departmentId: string;
  priority: string;
  deadline: string;
  description: string;
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
