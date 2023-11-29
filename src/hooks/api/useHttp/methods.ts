import { Service } from 'hooks/api/useHttp/types';

export function urlModifier(url?: Service) {
  switch (url) {
    case 'overview':
      return '/v1/overview';
    case 'employees':
      return '/v1/employees';
    case 'organizations':
      return '/v1/organizations';
    case 'transactions':
      return '/v1/transactions';
    case 'auth':
      return '/v1/auth';
    case 'budgets':
      return '/v1/budget';
    case 'wallet':
      return '/v1/wallet';
    case 'settings':
      return '/v1/settings';
    case 'category':
      return '/v1/category';
    default:
      return '/';
  }
}
