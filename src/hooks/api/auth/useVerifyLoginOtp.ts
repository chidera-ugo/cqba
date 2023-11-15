import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useVerifyLoginOtp(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<{ email: string; otp: string }, any>({
    url: '/verify-otp',
    service: 'auth',
    options,
  });
}
