import { UseQueryOptions } from '@tanstack/react-query';
import { Business_typeEnum } from 'enums/business_type.enum';
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
  businessType: Business_typeEnum;
  updatedAt: number;
  postalCode: string;
  tin: string;
  businessNumber: string;
  rcNumber: string;
  cacItNumber: string;
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
    url: `/get-organization`,
    service: 'organizations',
    options: {
      ...options,
      enabled: !!user?.organization,
      staleTime: Infinity,
    },
  });
}
