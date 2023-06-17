import { UseQueryOptions } from '@tanstack/react-query';
import { useTQuery } from 'hooks/api/useTQuery';
import { useAppContext } from 'context/AppContext';

export interface IOrganization {
  lastName?: string;
  industry?: string;
  status?: string;
  idNumber?: string;
  businessName?: string;
  formOfId?: string;
  idImageUrl?: string;
  firstName?: string;
  state?: string;
  city?: string;
  bnNumber?: string;
  bnNumberImageUrl?: string;
  dob?: string;
  numberOfEmployees?: string;
  adminId?: string;
  utilityBillType?: string;
  politicalAffiliation?: string;
  id?: string;
  phone?: string;
  averageMonthlyExpenses?: string;
  utilityBillImageUrl?: string;
  businessAddress?: string;
  gender?: string;
  businessType?: string;
  taxIdNumber?: string;
  updatedAt?: number;
  bvn?: string;
}

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
