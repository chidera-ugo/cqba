import { QueryKey, useQueryClient } from '@tanstack/react-query';
import { useAppContext } from 'context/AppContext';

type DataGroup =
  | 'budgets'
  | 'projects'
  | 'balances'
  | 'organization'
  | 'subscription'
  | 'team';

export const useQueryClientInvalidator = () => {
  const queryClient = useQueryClient();

  const { refetchCurrentUser } = useAppContext();

  function invalidator(type: DataGroup) {
    switch (type) {
      case 'organization':
        defaultInvalidator(['organization-information']);
        return;
      case 'balances':
        defaultInvalidator(['wallets']);
        defaultInvalidator(['wallet_balances']);
        defaultInvalidator(['wallet_transactions']);
        defaultInvalidator(['dashboard_overview']);
        defaultInvalidator(['cash_flow_chart']);
        return;
      case 'budgets':
        defaultInvalidator(['debitable_budgets']);
        defaultInvalidator(['debitable_projects']);
        defaultInvalidator(['budgets']);
        defaultInvalidator(['budgets_requests_count']);
        refetchCurrentUser!(null);
        return;
      case 'projects':
        defaultInvalidator(['project']);
        refetchCurrentUser!(null);
        return;
      case 'subscription':
        defaultInvalidator(['subscription_history']);
        defaultInvalidator(['current_subscription_plan']);
        refetchCurrentUser!(null);
        return;
      case 'team':
        defaultInvalidator(['employee']);
        defaultInvalidator(['employees']);
        defaultInvalidator(['permission_group_users']);
        refetchCurrentUser!(null);
        return;
    }
  }

  function invalidate(...types: DataGroup[]) {
    for (const type of types) {
      invalidator(type);
    }
  }

  function defaultInvalidator(queryKey: QueryKey) {
    queryClient.invalidateQueries(queryKey);
  }

  return {
    defaultInvalidator,
    invalidate,
  };
};
