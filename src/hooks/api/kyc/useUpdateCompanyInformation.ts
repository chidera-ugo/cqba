import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export interface UpdateCompanyInformationDto {
  businessType: string;
  businessIndustry: string;
  companyName: string;
  city: string;
  country: string;
  state: string;
  phone: string;
  postalCode: string;
  address: string;
}

export function useUpdateCompanyInformation(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<UpdateCompanyInformationDto, any>({
    method: 'patch',
    url: `/update-company-info`,
    service: 'organizations',
    options,
  });
}
