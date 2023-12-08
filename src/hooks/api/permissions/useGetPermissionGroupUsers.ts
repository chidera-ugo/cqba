import { useTQuery } from 'hooks/api/useTQuery';

export function useGetPermissionGroupUsers(role: string) {
  return useTQuery<any>({
    queryKey: ['permission_group_users', role],
    url: `/${role}/users`,
    service: 'settings',
    options: {
      staleTime: Infinity,
      meta: {
        silent: true,
      },
    },
  });
}
