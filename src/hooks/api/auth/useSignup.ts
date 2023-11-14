import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export interface SignupDto {
  email: string;
  businessName: string;
  password: string;
}

export function useSignup(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<SignupDto, any>({
    url: '/register',
    service: 'auth',
    options,
  });
}
