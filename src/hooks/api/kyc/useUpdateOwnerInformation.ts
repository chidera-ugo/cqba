import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export interface UpdateOwnersInformationDto {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  dob: string;
  country: string;
  address: string;
  state: string;
  title: string[];
  city: string;
  bvn: string;
  percentOwned: number;
  idNumber: string;
}

export interface IOwner {
  _id: string;
  lastName: string;
  country: string;
  idType: string;
  address: string;
  city: string;
  percentOwned: number;
  postalCode: string;
  title: string;
  idNumber: string;
  firstName: string;
  phone: string;
  dob: string;
  state: string;
  bvn: string;
  email: string;
}

export function useUpdateOwnerInformation(
  options?: UseMutationOptions<IOwner, unknown, void, unknown>
) {
  return useTMutation<UpdateOwnersInformationDto, IOwner>({
    method: 'patch',
    url: `/update-owner-info`,
    service: 'organizations',
    options,
  });
}
