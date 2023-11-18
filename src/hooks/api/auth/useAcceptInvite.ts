import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export interface AcceptInviteDto {
  email: string;
  code: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export function useAcceptInvite(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<AcceptInviteDto, any>({
    url: '/activate',
    service: 'employees',
    options,
  });
}
