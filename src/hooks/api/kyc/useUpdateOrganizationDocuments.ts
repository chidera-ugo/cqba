import { UseMutationOptions } from '@tanstack/react-query';
import { useAppContext } from 'context/AppContext';
import { useTMutation } from 'hooks/api/useTMutation';

export interface UpdateOrganizationDocumentsDto {
  bnNumber: string;
  taxIdNumber: string;
  utilityBillType: string;
  utilityBillImageUrl: string;
  bnNumberImageUrl: string;
}

export function useUpdateOrganizationDocuments(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  const { user } = useAppContext().state;

  return useTMutation<UpdateOrganizationDocumentsDto, any>({
    method: 'patch',
    url: `/${user?.organizationId}/update-business-documentation`,
    service: 'organizations',
    options,
  });
}
