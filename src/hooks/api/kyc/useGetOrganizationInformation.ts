import { UseQueryOptions } from '@tanstack/react-query';
import { IOwner } from 'hooks/api/kyc/useUpdateOwnerInformation';
import { useTQuery } from 'hooks/api/useTQuery';
import { useAppContext } from 'context/AppContext';

export interface IOrganization {
  lastName: string;
  businessIndustry: string;
  status: string;
  organizations: any;
  idNumber: string;
  country: string;
  owners: IOwner[];
  directors: IOwner[];
  companyName: string;
  businessName: string;
  formOfId: string;
  firstName: string;
  state: string;
  city: string;
  bnNumber: string;
  dob: string;
  numberOfEmployees: string;
  adminId: string;
  utilityBillType: string;
  id: string;
  phone: string;
  averageMonthlyExpenses: string;
  utilityBill: string;
  businessNameCert: string;
  cacBn1: string;
  address: string;
  gender: string;
  businessType: string;
  updatedAt: number;
  postalCode: string;
  documents: {
    cacBn1?: string;
    utilityBill?: string;
    businessNameCert?: string;
  };
  bvn: string;
  regDate: string;
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
