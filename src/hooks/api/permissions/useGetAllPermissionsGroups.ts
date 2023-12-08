import { useTQuery } from 'hooks/api/useTQuery';

export interface PermissionsGroup {
  _id: string;
  name: string;
  description: string;
  permissions: Record<string, string[]>;
}

export function useGetAllPermissionsGroups() {
  return useTQuery<PermissionsGroup[]>({
    queryKey: ['permission_groups'],
    url: `/permissions`,
    service: 'settings',
    options: {
      staleTime: Infinity,
      meta: {
        silent: true,
      },
    },
  });
}
