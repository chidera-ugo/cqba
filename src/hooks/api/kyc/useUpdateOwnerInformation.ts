import { UseMutationOptions } from '@tanstack/react-query';
import { useAppContext } from 'context/AppContext';
import { useTMutation } from 'hooks/api/useTMutation';

export interface UpdateOwnersInformationDto {
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  dob: string;
  bvn: string;
  formOfId: string;
  idNumber: string;
  idImageUrl: string;
  politicalAffiliation: boolean;
}

export function useUpdateOwnerInformation(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  const { user } = useAppContext().state;

  return useTMutation<UpdateOwnersInformationDto, any>({
    method: 'patch',
    url: `/${user?.organizationId}/update-owner-info`,
    service: 'organizations',
    options,
  });
}
