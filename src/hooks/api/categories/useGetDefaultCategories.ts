import { UseQueryOptions } from '@tanstack/react-query';
import { useTQuery } from 'hooks/api/useTQuery';

export interface DefaultCategory {
  createdAt: number;
  id: string;
  updatedAt: number;
  sKey: string;
  title: string;
}

export function useGetDefaultCategories(
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return useTQuery<DefaultCategory[]>({
    queryKey: ['all-default-categories'],
    url: '/default',
    service: 'category',
    options: {
      ...options,
      meta: {
        silent: true,
      },
      staleTime: Infinity,
    },
  });
}
