export interface IOrganization {
  businessName?: string;
  adminId?: string;
  id?: string;
  updatedAt?: number;
  industry?: string;
}

import { UseQueryOptions } from '@tanstack/react-query';
import { useTQuery } from 'hooks/api/useTQuery';
import { useAppContext } from 'context/AppContext';

export function useGetOrganizationInformation(
  options?: UseQueryOptions<any, any, any, string[]>
) {
  const { user } = useAppContext().state;

  return useTQuery<IOrganization>({
    queryKey: ['organization-information'],
    url: `/${user?.organizationId}`,
    service: 'organizations',
    options: {
      ...options,
      enabled: !!user?.organizationId,
      staleTime: Infinity,
    },
  });
}
