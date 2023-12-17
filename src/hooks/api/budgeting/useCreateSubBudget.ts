import { UseMutationOptions } from '@tanstack/react-query';
import { CreateBudgetDto } from 'hooks/api/budgeting/useCreateBudget';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { useTMutation } from 'hooks/api/useTMutation';

export function useCreateSubBudget(
  projectId?: string,
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<
    { pin: string; budgets: Omit<CreateBudgetDto, 'pin'>[] },
    IBudget
  >({
    method: 'post',
    url: `/project/${projectId}/sub-budget`,
    service: 'budgets',
    options,
  });
}
