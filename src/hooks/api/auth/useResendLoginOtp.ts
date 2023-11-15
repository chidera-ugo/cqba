import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useResendLoginOtp(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<{ email: string }, any>({
    url: '/resend-otp',
    service: 'auth',
    options,
  });
}
