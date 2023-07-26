import { UseQueryOptions } from '@tanstack/react-query';
import { useTQuery } from 'hooks/api/useTQuery';
import { PaginatedResponse } from 'types/Table';

export interface ICategory {
  organizationId: string;
  userId: string;
  updatedAt: number;
  id: string;
  sKey: string;
  title: string;
}

export function useGetAllCategories(
  showOnlyDefault?: boolean,
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return useTQuery<PaginatedResponse<ICategory>>({
    queryKey: ['categories', showOnlyDefault ? 'default' : 'custom'],
    url: `${showOnlyDefault ? '?default=true' : ''}`,
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
