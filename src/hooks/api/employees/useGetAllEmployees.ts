import { UseQueryOptions } from '@tanstack/react-query';
import { useTQuery } from 'hooks/api/useTQuery';

export function useGetAllEmployees(
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return useTQuery<any>({
    queryKey: ['employees'],
    url: '',
    service: 'employees',
    options: {
      ...options,
      staleTime: Infinity,
    },
  });
}
