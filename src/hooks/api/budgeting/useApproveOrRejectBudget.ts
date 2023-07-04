import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useApproveOrRejectBudget(
  budgetId: string,
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<{ status: 'approved' | 'declined' }, any>({
    method: 'patch',
    url: `/${budgetId}/approve-reject`,
    service: 'budgets',
    options,
  });
}
