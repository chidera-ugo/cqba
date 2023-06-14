import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useResendVerificationEmail(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<{ email: string }, any>({
    url: '/resend-email',
    service: 'auth',
    options,
  });
}
