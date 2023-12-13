import { QueryKey, useQueryClient } from '@tanstack/react-query';

type DataGroup =
  | 'budgets'
  | 'balances'
  | 'organization'
  | 'subscription'
  | 'team';

export const useQueryInvalidator = () => {
  const queryClient = useQueryClient();

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
        defaultInvalidator(['budgets']);
        return;
      case 'subscription':
        defaultInvalidator(['subscription_history']);
        defaultInvalidator(['current_subscription_plan']);
        return;
      case 'team':
        defaultInvalidator(['employees']);
        defaultInvalidator(['permission_group_users']);
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
