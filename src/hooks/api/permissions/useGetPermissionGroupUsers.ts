import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { useTQuery } from 'hooks/api/useTQuery';

export function useGetPermissionGroupUsers(role: string) {
  return useTQuery<IEmployee[]>({
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
