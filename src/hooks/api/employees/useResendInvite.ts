import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useResendInvite(
  employeeId?: string,
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation({
    method: 'get',
    url: `/${employeeId}/resend-invite`,
    service: 'employees',
    options,
  });
}
