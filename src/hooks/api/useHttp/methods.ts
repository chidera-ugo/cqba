import { Service } from 'hooks/api/useHttp/types';

export function urlModifier(url?: Service) {
  switch (url) {
    case 'dashboard':
      return '/v1/dashboard';
    case 'employees':
      return '/v1/employees';
    case 'organizations':
      return '/v1/organizations';
    case 'transactions':
      return '/v1/transactions';
    case 'auth':
      return '/v1/auth';
    case 'departments':
      return '/v1/departments';
    case 'budgets':
      return '/v1/budgets';
    case 'category':
      return '/v1/category';
    case 'sub-accounts':
      return '/v1/sub-accounts';
    default:
      return '/';
  }
}
