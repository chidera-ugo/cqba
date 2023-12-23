import { useGetBudgetApprovalRequests } from 'hooks/api/budgeting/useGetBudgetApprovalRequests';

export const useAppCounts = (): Record<string, number> => {
  const { data } = useGetBudgetApprovalRequests();

  return {
    BUDGET_REQUESTS: data?.docs?.length ?? 0,
  };
};

export type UseAppCounts = ReturnType<typeof useAppCounts>;
