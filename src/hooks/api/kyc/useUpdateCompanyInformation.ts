import { UseMutationOptions } from '@tanstack/react-query';
import { useAppContext } from 'context/AppContext';
import { useTMutation } from 'hooks/api/useTMutation';

export interface UpdateCompanyInformationDto {
  businessType?: string;
  businessAddress?: string;
  businessName?: string;
  numberOfEmployees?: string;
  averageMonthlyExpenses?: string;
  city?: string;
  state?: string;
}

export function useUpdateCompanyInformation(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  const { user } = useAppContext().state;

  return useTMutation<UpdateCompanyInformationDto, any>({
    method: 'patch',
    url: `/${user?.organizationId}/update-company-info`,
    service: 'organizations',
    options,
  });
}
