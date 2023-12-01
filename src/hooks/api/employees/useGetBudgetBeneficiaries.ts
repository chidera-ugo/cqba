import { UseQueryOptions } from '@tanstack/react-query';
import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { useTQuery } from 'hooks/api/useTQuery';

export function useGetBudgetBeneficiaries(
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return useTQuery<IEmployee[]>({
    queryKey: ['employees', 'unpaginated'],
    url: '/all',
    service: 'employees',
    options: {
      ...options,
      staleTime: Infinity,
    },
  });
}
